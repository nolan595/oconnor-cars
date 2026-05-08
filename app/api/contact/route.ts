import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";

interface ResendEmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

interface ResendClient {
  emails: {
    send(options: ResendEmailOptions): Promise<unknown>;
  };
}

interface ResendConstructor {
  new (apiKey: string): ResendClient;
}

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", code: "VALIDATION_ERROR" },
      { status: 400 }
    );
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, phone, email, message } = result.data;

  // Always log server-side as audit trail
  console.log("[contact-form]", {
    name,
    phone,
    email,
    messageLength: message.length,
    ts: new Date().toISOString(),
  });

  // Send email if Resend is configured — opt-in enhancement
  if (process.env.RESEND_API_KEY) {
    try {
      // Dynamic import keeps resend out of the bundle when not configured
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resendModule = await import("resend" as any);
      const ResendClass = resendModule.Resend as ResendConstructor;
      const resend = new ResendClass(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "noreply@oconnorcars.ie",
        to: process.env.CONTACT_RECIPIENT_EMAIL ?? "info@oconnorcars.ie",
        subject: `New enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          "",
          `Message:\n${message}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (err) {
      console.error("[contact-form] email send failed", err);
      return NextResponse.json(
        {
          error:
            "Something went wrong. Please try again or call us directly.",
          code: "INTERNAL_ERROR",
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    success: true,
    message: "Thanks, we'll be in touch shortly.",
  });
}

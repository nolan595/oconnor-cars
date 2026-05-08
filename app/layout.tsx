import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O'Connor Cars — VW/Audi Specialist, Finglas, Dublin",
  description:
    "Expert car repairs and servicing in Finglas, Dublin. VW and Audi specialists. NCT prep, timing belts, engine repairs, diagnostics and more.",
  keywords:
    "car repairs Dublin, VW specialist Dublin, Audi specialist Finglas, NCT repairs, garage Finglas",
  openGraph: {
    title: "O'Connor Cars — VW/Audi Specialist, Finglas, Dublin",
    description:
      "Expert car repairs and servicing in Finglas, Dublin. VW and Audi specialists.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

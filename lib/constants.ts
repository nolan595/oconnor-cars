export interface BusinessInfo {
  name: string;
  tagline: string;
  address: {
    street: string;
    area: string;
    city: string;
    eircode: string;
    googleMapsUrl: string;
    googleMapsEmbedUrl: string;
  };
  phone: {
    landline: string;
    mobile: string;
  };
  email: string;
  social: {
    facebook?: string;
    instagram?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface DayHours {
  open: string | null;
  close: string | null;
  lunch?: {
    start: string;
    end: string;
  };
}

export type OpeningHoursData = Record<DayKey, DayHours>;

export interface NctChecklistItem {
  id: string;
  label: string;
  detail: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: "O'Connor Cars",
  tagline: "VW / Audi Specialist · Finglas, Dublin",
  address: {
    street: "Jamestown Rd",
    area: "Finglas North",
    city: "Dublin",
    eircode: "D11 K2FK",
    googleMapsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Jamestown+Rd,+Finglas+North,+Dublin+D11+K2FK",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=Jamestown+Rd,+Finglas+North,+Dublin+D11+K2FK&output=embed",
  },
  phone: {
    landline: "01 834 0938",
    mobile: "086 232 3335",
  },
  email: "info@oconnorcars.ie",
  social: {
    facebook: "https://www.facebook.com/oconnorcarsfinglas/",
    instagram: "https://instagram.com/oconnor_cars/",
  },
};

export const SERVICES: Service[] = [
  {
    id: "servicing",
    name: "Servicing",
    description:
      "Full and interim services to manufacturer standards. Keep your car running at its best.",
    icon: "Wrench",
  },
  {
    id: "engine-repairs",
    name: "Engine Repairs",
    description:
      "From minor fixes to full rebuilds — diagnosed and resolved by VW/Audi specialists.",
    icon: "Cog",
  },
  {
    id: "clutches-gearboxes",
    name: "Clutches & Gearboxes",
    description:
      "Clutch replacements and gearbox repairs carried out to exacting standards.",
    icon: "Settings2",
  },
  {
    id: "timing-belts",
    name: "Timing Belts",
    description:
      "Critical preventative maintenance done right. Don't risk a snapped belt.",
    icon: "Timer",
  },
  {
    id: "auto-diagnostics",
    name: "Auto-Diagnostics",
    description:
      "Latest diagnostic equipment reads fault codes and guides precision repairs.",
    icon: "ScanLine",
  },
  {
    id: "air-conditioning",
    name: "Air Conditioning",
    description:
      "Regas, leak detection, and full A/C system repairs to keep you comfortable year-round.",
    icon: "Wind",
  },
  {
    id: "emission-testing",
    name: "Emission Testing",
    description:
      "Ensure your car meets current emissions standards and passes the NCT first time.",
    icon: "Gauge",
  },
  {
    id: "tyres",
    name: "Tyres",
    description:
      "Supply and fitting of quality tyres. We'll check your tread depth free of charge.",
    icon: "Circle",
  },
  {
    id: "nct-repairs",
    name: "NCT Repairs",
    description:
      "Failed your NCT? We carry out all required remedial repairs to get you back on the road.",
    icon: "ClipboardCheck",
  },
];

export const OPENING_HOURS: OpeningHoursData = {
  monday: { open: "07:00", close: "17:30", lunch: { start: "12:45", end: "13:30" } },
  tuesday: { open: "07:00", close: "17:30", lunch: { start: "12:45", end: "13:30" } },
  wednesday: { open: "07:00", close: "17:30", lunch: { start: "12:45", end: "13:30" } },
  thursday: { open: "07:00", close: "17:30", lunch: { start: "12:45", end: "13:30" } },
  friday: { open: null, close: null },
  saturday: { open: null, close: null },
  sunday: { open: null, close: null },
};

export const DAY_LABELS: Record<DayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const NCT_CHECKLIST: NctChecklistItem[] = [
  {
    id: "lights",
    label: "Headlights & Indicators",
    detail:
      "Check all lights function: headlights, sidelights, rear, hazard, and indicators.",
  },
  {
    id: "brake-lights",
    label: "Brake Lights",
    detail:
      "Press the brake pedal and verify rear lights activate, including the strip light.",
  },
  {
    id: "number-plate",
    label: "Number Plate",
    detail: "Ensure it is clean, legible, and has the correct font and spacing.",
  },
  {
    id: "tyres",
    label: "Wheels & Tyres",
    detail: "Minimum 1.6mm tread depth required. We can check it for you.",
  },
  {
    id: "seatbelts",
    label: "Seats & Seatbelts",
    detail:
      "Seat must adjust forward/back; seatbelts undamaged and lock under a sharp tug.",
  },
  {
    id: "windscreen",
    label: "Windscreen",
    detail:
      "No damage greater than 40mm, or greater than 10mm in the driver's swept area.",
  },
  {
    id: "wipers",
    label: "Windscreen Wipers",
    detail: "No tears or holes in the wiper rubber.",
  },
  {
    id: "screenwash",
    label: "Screenwash",
    detail: "Top up the washer bottle before your test.",
  },
  {
    id: "horn",
    label: "Horn",
    detail: "Must work. Replace or repair if not.",
  },
  {
    id: "fluids",
    label: "Fuel & Engine Oil",
    detail: "Sufficient levels of both are required by the NCT inspector.",
  },
];

import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "iid.sh - Contact",
  description: "Contact iid.sh for product, partnership, or ecosystem conversations.",
};

export default function ContactPage() {
  return <ContactSection />;
}

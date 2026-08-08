import type { Metadata } from "next";

import PageMasthead from "@/components/sections/PageMasthead";
import ContactForm from "@/components/ContactForm";
import SectionIndex from "@/components/ui/SectionIndex";
import { ArrowUpRight, Mail, Phone } from "@/components/ui/Icons";
import { contact, offices } from "@/content/site";
import { breadcrumbSchema, contactPageSchema, jsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Contact Triple S Group in Dhaka, Bangladesh. Call +88 09613828181, email info@triplesbd.com, or send an enquiry to reach any of the group's four businesses.",
  path: "/contact",
});

const channels = [
  { label: "Email", value: contact.email, href: contact.emailHref, Icon: Mail, external: false },
  { label: "Telephone", value: contact.phone, href: contact.phoneHref, Icon: Phone, external: false },
  {
    label: "WhatsApp",
    value: "Message us",
    href: contact.whatsapp,
    Icon: ArrowUpRight,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(contactPageSchema())}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ])
        )}
      />

      <PageMasthead
        index="00"
        label="Contact"
        title="One enquiry reaches all four businesses."
        lede="Tell us what you need moved, made or sourced. We will route it to the team that handles it and reply directly."
        trail={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        aside={
          <ul className="grid gap-px border-t border-white/15 pt-8 sm:grid-cols-3 sm:gap-8">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group block py-2"
                >
                  <span className="eyebrow block text-mist-dim">{label}</span>
                  <span className="mt-3 flex items-center gap-2.5 text-lg tracking-tight text-paper">
                    <Icon className="h-4 w-4 shrink-0 text-brand-400" />
                    <span className="link-underline">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        }
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <SectionIndex index="01" label="Enquiry" />

            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="display-md reveal max-w-[16ch]">Send us the details.</h2>
                <ContactForm />
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <h2 className="eyebrow border-t border-line-strong pt-4 text-ink-faint">
                  Offices
                </h2>
                <ol className="mt-2">
                  {offices.map((office) => (
                    <li key={office.id} className="reveal border-b border-line py-6">
                      <p className="eyebrow text-brand-600">{office.role}</p>
                      <p className="display-sm mt-3">
                        {office.city}
                        <span className="ml-2 font-mono text-[0.625rem] tracking-[0.14em] text-ink-faint uppercase">
                          {office.country}
                        </span>
                      </p>
                      <address className="mt-3 text-sm not-italic leading-relaxed text-ink-muted">
                        {office.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

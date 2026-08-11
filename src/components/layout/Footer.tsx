import Link from "next/link";

import Logo from "@/components/ui/Logo";
import { ArrowUpRight } from "@/components/ui/Icons";
import { divisions } from "@/content/divisions";
import { company, contact, footerNav, legalNav, offices, socials } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-mist">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              A Bangladeshi business group working across freight forwarding, electrical
              manufacturing, international sourcing and logistics technology.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm transition-colors duration-300 hover:text-paper"
                  >
                    <span className="link-underline">{social.label}</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-businesses" className="lg:col-span-3">
            <h2 id="footer-businesses" className="eyebrow text-mist-dim">
              Businesses
            </h2>
            <ul className="mt-5 space-y-3">
              {divisions.map((division) => (
                <li key={division.slug}>
                  <Link
                    href={`/${division.slug}`}
                    className="text-sm transition-colors duration-300 hover:text-paper"
                  >
                    <span className="link-underline">{division.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company" className="lg:col-span-2">
            <h2 id="footer-company" className="eyebrow text-mist-dim">
              Company
            </h2>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-300 hover:text-paper"
                  >
                    <span className="link-underline">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-mist-dim">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={contact.emailHref}
                  className="transition-colors duration-300 hover:text-paper"
                >
                  <span className="link-underline">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.phoneHref}
                  className="font-mono text-xs transition-colors duration-300 hover:text-paper"
                >
                  {contact.phone}
                </a>
              </li>
            </ul>
            <address className="mt-5 text-sm not-italic leading-relaxed">
              {offices[0].lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <div key={office.id}>
              <p className="eyebrow text-mist-dim">{office.role}</p>
              <p className="mt-2 text-sm text-paper">
                {office.city}
                <span className="text-mist-dim"> · {office.country}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-mist-dim">
            © {year} {company.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs transition-colors duration-300 hover:text-paper"
                >
                  <span className="link-underline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

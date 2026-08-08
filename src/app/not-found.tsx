import Link from "next/link";

import { ArrowRight } from "@/components/ui/Icons";
import { divisions } from "@/content/divisions";
import { primaryNav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col justify-center bg-navy-950 py-32 text-paper">
      <div className="shell">
        <div className="rail">
          <p className="eyebrow flex items-baseline gap-3 border-t border-white/15 pt-4 text-mist">
            <span className="text-brand-400">404</span>
            <span>Not found</span>
          </p>

          <div>
            <h1 className="display-lg max-w-[16ch]">This page is not here.</h1>
            <p className="lede mt-8 max-w-xl text-mist">
              The address may have changed, or the link that brought you here may be out of date.
            </p>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="btn btn-light">
                Back to home
                <ArrowRight />
              </Link>
              <Link href="/contact" className="btn btn-ghost-light">
                Contact us
              </Link>
            </div>

            <nav aria-label="Site sections" className="mt-16">
              <p className="eyebrow text-mist-dim">Try one of these</p>
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                {[...primaryNav, ...divisions.map((d) => ({ label: d.name, href: `/${d.slug}` }))].map(
                  (item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-mist transition-colors duration-300 hover:text-paper"
                      >
                        <span className="link-underline">{item.label}</span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

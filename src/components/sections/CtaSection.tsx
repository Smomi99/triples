import Link from "next/link";

import { ArrowRight } from "@/components/ui/Icons";
import RouteLine from "@/components/ui/RouteLine";
import { contact } from "@/content/site";

export default function CtaSection({
  eyebrow = "Get in touch",
  title = "Tell us what you need moved, made or sourced.",
  body = "One enquiry reaches all Five businesses. We will route it to the team that handles it and come back to you directly.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    /* The page's final destination, so it carries the route arriving. */
    <section className="brand-glow relative isolate overflow-hidden bg-navy-950 text-paper">
      <div className="shell relative py-16 lg:py-24">
        <div className="rail">
          <p className="eyebrow flex items-baseline gap-3 border-t border-white/15 pt-4 text-mist">
            <span className="text-orange">→</span>
            <span>{eyebrow}</span>
          </p>

          <div>
            <h2 className="display-lg reveal max-w-3xl">{title}</h2>
            <p className="reveal mt-8 max-w-xl text-lg leading-relaxed text-mist">{body}</p>

            <div className="reveal mt-12 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">
                Start a conversation
                <ArrowRight />
              </Link>
              <a href={contact.emailHref} className="btn btn-ghost-light">
                {contact.email}
              </a>
            </div>

            <p className="mt-10 font-mono text-xs text-mist-dim">
              Or call{" "}
              <a href={contact.phoneHref} className="text-mist transition-colors hover:text-paper">
                {contact.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
      <RouteLine className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 opacity-70 lg:h-40" />
    </section>
  );
}

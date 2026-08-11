import type { Metadata } from "next";

import PageMasthead from "@/components/sections/PageMasthead";
import { SITE_URL, company, contact } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service",
  description: `Terms governing the use of the ${company.name} website.`,
  path: "/terms",
});

/*
  Written fresh.

  The terms page on the previous site was template text belonging to a
  different company — it referred to "EFL" throughout and listed that
  company's service lines. Reproducing it would have carried another
  organisation's legal language onto this site, so none of it is retained.

  What follows are ordinary terms of use for a corporate information site. They
  make no commitment the company has not already made elsewhere, and they must
  be reviewed by the company's legal adviser before launch.
*/
export default function TermsPage() {
  return (
    <>
      <PageMasthead
        index="00"
        label="Legal"
        title="Terms of Service"
        lede={`The terms on which ${company.name} makes this website available.`}
        trail={[
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ]}
      />

      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <div className="rail">
            <p className="eyebrow border-t border-line-strong pt-4 text-ink-faint">
              Terms of use
            </p>

            <div className="prose">
              <p>
                Access to and use of {SITE_URL.replace("https://", "")} (the &ldquo;site&rdquo;) is
                subject to these terms. Using the site means you accept them in full. If you do not
                accept them, please do not use the site.
              </p>

              <h2>About this site</h2>
              <p>
                This site is published by {company.legalName} (&ldquo;{company.name}&rdquo;) and
                describes the activities of the group and its businesses. It is provided for
                general information.
              </p>

              <h2>No offer or contract</h2>
              <p>
                Nothing on this site is an offer to sell, a quotation, or a commitment to provide
                any service. Descriptions of services, products and past work are indicative.
                Rates, capabilities, availability and terms are agreed in writing on a
                case-by-case basis and are governed by the contract entered into for that
                engagement, not by this site.
              </p>

              <h2>Accuracy</h2>
              <p>
                We take care to keep the information on this site correct and current, but we do
                not warrant that it is complete, accurate or up to date at any given moment.
                Information may be changed or removed without notice.
              </p>

              <h2>Intellectual property</h2>
              <p>
                The content of this site — including text, layout, design, graphics, photographs
                and the {company.name} name and logo — belongs to {company.name} or its affiliated
                entities, unless otherwise stated. You may view and print pages for your own
                reference. You may not otherwise reproduce, republish or distribute any part of the
                site without our written permission.
              </p>

              <h2>Third-party links</h2>
              <p>
                Where this site links to a website operated by someone else, that link is provided
                for convenience. We do not control those sites and are not responsible for their
                content or their handling of your information.
              </p>

              <h2>Liability</h2>
              <p>
                To the extent permitted by law, {company.name} is not liable for any loss arising
                from use of, or reliance on, this site or its content. Nothing in these terms
                limits liability that cannot be limited under applicable law.
              </p>

              <h2>Privacy</h2>
              <p>
                Personal information provided through this site is handled in accordance with our{" "}
                <a href="/privacy">Privacy Policy</a>.
              </p>

              <h2>Governing law</h2>
              <p>
                These terms are governed by the laws of Bangladesh, and the courts of Bangladesh
                have jurisdiction over any dispute arising from them.
              </p>

              <h2>Contact</h2>
              <p>
                Questions about these terms can be sent to{" "}
                <a href={contact.emailHref}>{contact.email}</a> or raised by telephone on{" "}
                <a href={contact.phoneHref}>{contact.phone}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

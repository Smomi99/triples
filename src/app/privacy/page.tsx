import type { Metadata } from "next";

import PageMasthead from "@/components/sections/PageMasthead";
import { company, contact } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses and protects personal information provided through this website.`,
  path: "/privacy",
});

/*
  Rewritten from the policy published on the previous site for clarity and
  grammar. The substance is unchanged: the same categories of data, the same
  uses and the same disclosure conditions. Nothing has been added — in
  particular, no retention periods, no named processors and no rights framework
  the company had not already committed to.

  This should be reviewed by the company's legal adviser before launch.
*/
export default function PrivacyPage() {
  return (
    <>
      <PageMasthead
        index="00"
        label="Legal"
        title="Privacy Policy"
        lede={`How ${company.legalName} handles personal information provided through this website.`}
        trail={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          <div className="rail">
            <p className="eyebrow border-t border-line-strong pt-4 text-ink-faint">
              Privacy statement
            </p>

            <div className="prose">
              <p>
                {company.legalName} (&ldquo;{company.name}&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo; or &ldquo;our&rdquo;), together with its subsidiary and affiliated
                entities, has created this policy to set out our commitment to protecting the
                personal information of the people who use this site, and to explain our data
                practices.
              </p>
              <p>
                By using this website you consent to the collection and use of information as
                described here. If you do not agree with this policy, please do not use the site.
              </p>

              <h2>Information we collect</h2>
              <p>We collect two kinds of information.</p>
              <p>
                <strong>Information you give us.</strong> This includes personal identifiers such
                as your name, date of birth, email address, postal or residential address and
                telephone number — for example when you send an enquiry or respond to a survey.
              </p>
              <p>
                <strong>Information collected automatically.</strong> When you visit the site we
                may record technical details of the visit, including pages viewed, the frequency of
                visits, the software used to browse and IP address information.
              </p>
              <p>
                Where you provide us with another person&rsquo;s contact details, we ask that you
                do so only with that person&rsquo;s consent.
              </p>

              <h2>Sensitive information</h2>
              <p>
                We do not currently collect &ldquo;sensitive&rdquo; or &ldquo;special
                category&rdquo; data as those terms are defined under applicable data protection
                law.
              </p>

              <h2>How we use your information</h2>
              <p>
                We use personal information for our business purposes and for the purpose for which
                you provided it — including, without limitation, responding to your requests or
                correspondence. We may also contact you about our services or ask for feedback on
                them.
              </p>

              <h2>When we disclose information</h2>
              <p>We may disclose personal information:</p>
              <ul>
                <li>
                  to legal or government regulatory authorities in response to a request from them;
                </li>
                <li>to third parties where we are required to do so by law;</li>
                <li>in connection with a legal dispute; and</li>
                <li>where disclosure is necessary to protect health and safety.</li>
              </ul>

              <h2>Contacting us about this policy</h2>
              <p>
                If you have a question about this policy or about the personal information we hold,
                write to us at <a href={contact.emailHref}>{contact.email}</a> or call{" "}
                <a href={contact.phoneHref}>{contact.phone}</a>.
              </p>

              <h2>Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The version published on this page is
                the one that applies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

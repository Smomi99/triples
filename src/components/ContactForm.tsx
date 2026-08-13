"use client";

import { useId, useRef, useState } from "react";

import { ArrowRight } from "@/components/ui/Icons";
import { contact } from "@/content/site";
import { divisions } from "@/content/divisions";

/**
 * The site is static and the group runs no form backend, so by default this
 * composes a pre-filled message and hands it to the visitor's mail client —
 * which always works, and never silently swallows an enquiry the way a form
 * posting to nowhere would.
 *
 * Set NEXT_PUBLIC_CONTACT_ENDPOINT to a URL accepting a JSON POST and the form
 * submits there instead. No other change is needed.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "handoff" | "error";

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ink transition-colors duration-300 placeholder:text-ink-faint focus:border-ink focus:outline-none focus:ring-0";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const id = (name: string) => `${uid}-${name}`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error(String(response.status));
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = [
      `Name: ${data.name}`,
      `Company: ${data.company || "—"}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
      `Enquiry about: ${data.interest}`,
      "",
      data.message,
    ].join("\n");

    window.location.href = `${contact.emailHref}?subject=${encodeURIComponent(
      `Enquiry — ${data.interest}`
    )}&body=${encodeURIComponent(body)}`;

    setStatus("handoff");
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-10">
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="eyebrow block text-ink-faint">
            Your name <span aria-hidden>*</span>
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={field}
          />
        </div>

        <div>
          <label htmlFor={id("company")} className="eyebrow block text-ink-faint">
            Company
          </label>
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            className={field}
          />
        </div>

        <div>
          <label htmlFor={id("email")} className="eyebrow block text-ink-faint">
            Email <span aria-hidden>*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>

        <div>
          <label htmlFor={id("phone")} className="eyebrow block text-ink-faint">
            Phone
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("interest")} className="eyebrow block text-ink-faint">
            What is this about? <span aria-hidden>*</span>
          </label>
          <select id={id("interest")} name="interest" required defaultValue="" className={field}>
            <option value="" disabled>
              Select a business
            </option>
            {divisions.map((division) => (
              <option key={division.slug} value={division.name}>
                {division.name} — {division.discipline}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="eyebrow block text-ink-faint">
            Details <span aria-hidden>*</span>
          </label>
          <textarea
            id={id("message")}
            name="message"
            required
            rows={5}
            placeholder="Cargo, product, volumes, destinations, timelines — whatever is relevant."
            className={`${field} resize-y`}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <ArrowRight />
        </button>

        <p aria-live="polite" className="text-sm text-ink-muted">
          {status === "handoff" &&
            "Your email application should have opened with the message ready to send."}
          {status === "sent" && "Thank you — your enquiry has been sent."}
          {status === "error" && (
            <span className="text-brand-600">
              Something went wrong. Please email{" "}
              <a href={contact.emailHref} className="link-underline">
                {contact.email}
              </a>{" "}
              directly.
            </span>
          )}
        </p>
      </div>

      {/* {!ENDPOINT && (
        <p className="mt-6 font-mono text-[0.6875rem] leading-relaxed tracking-[0.06em] text-ink-faint uppercase">
          This form opens your email client — nothing is stored on this website.
        </p>
      )} */}
    </form>
  );
}

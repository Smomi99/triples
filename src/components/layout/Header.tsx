"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import Logo from "@/components/ui/Logo";
import { ArrowRight, ArrowUpRight, ChevronDown } from "@/components/ui/Icons";
import { divisions } from "@/content/divisions";
import { contact, primaryNav } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const megaId = useId();
  const mobileId = useId();
  const megaTrigger = useRef<HTMLButtonElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Solidify the bar once the page has moved off the top of the masthead. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Any navigation dismisses whatever is open. */
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  /* The mobile panel covers the page, so the document beneath must not scroll. */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (megaOpen) {
        setMegaOpen(false);
        megaTrigger.current?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        mobileTrigger.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, mobileOpen]);

  /* Keep focus inside the mobile overlay while it is open. */
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanel.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  /*
    Pointer-driven opening is limited to devices that actually hover; on touch
    the same control works as a plain toggle.
  */
  const hoverCapable = useCallback(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches,
    []
  );

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (hoverCapable()) setMegaOpen(true);
  };

  const scheduleClose = () => {
    if (!hoverCapable()) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      /*
        The mega panel is positioned against this value rather than against the
        header box, which lets it live inside the nav list — so keyboard focus
        moves from the trigger straight into the panel instead of detouring
        through the rest of the bar.
      */
      style={{ "--header-h": scrolled ? "5.5rem" : "9.5rem" } as React.CSSProperties}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        megaOpen
          ? "border-b border-line bg-paper"
          : scrolled
            ? "border-b border-line bg-paper/95 backdrop-blur-md"
            : "border-b border-line bg-paper"
      }`}
    >
      <div className="shell">
        <div
          className={`flex items-center justify-between gap-6 transition-[height] duration-500 ${
            scrolled ? "h-[5.5rem]" : "h-28 lg:h-[9.5rem]"
          }`}
        >
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) =>
                item.href === "/businesses" ? (
                  <li
                    key={item.href}
                    onPointerEnter={openMega}
                    onPointerLeave={scheduleClose}
                    onBlur={(event) => {
                      // Close once focus leaves the trigger and the panel entirely.
                      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                        setMegaOpen(false);
                      }
                    }}
                  >
                    <button
                      ref={megaTrigger}
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls={megaId}
                      onClick={(event) => {
                        /*
                          `detail === 0` marks a keyboard activation. Keyboard and
                          touch both toggle; with a mouse, hover already governs
                          the panel, so a click must not immediately undo the open
                          that entering the trigger just caused.
                        */
                        const viaKeyboard = event.detail === 0;
                        if (viaKeyboard || !hoverCapable()) setMegaOpen((open) => !open);
                        else setMegaOpen(true);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 text-[1.0625rem] tracking-tight transition-colors duration-300 ${
                        isActive(item.href) || megaOpen
                          ? "text-ink"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`transition-transform duration-400 ${
                          megaOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      id={megaId}
                      /* Opaque, not translucent: a bright masthead headline sits
                         directly behind this panel and reads straight through
                         even a 95% wash. */
                      className={`fixed inset-x-0 top-[var(--header-h)] overflow-hidden border-b border-line bg-paper shadow-[0_24px_48px_-32px_rgb(11_16_32/0.35)] transition-[max-height,opacity] duration-500 ${
                        megaOpen ? "max-h-[32rem] opacity-100" : "pointer-events-none max-h-0 opacity-0"
                      }`}
                    >
                      <div className="shell py-10">
                        <div className="rail">
                          <div>
                            <p className="eyebrow text-ink-faint">The group</p>
                            <p className="mt-4 max-w-[13rem] text-sm leading-relaxed text-ink-muted">
                              Five businesses, one operating standard.
                            </p>
                            <Link
                              href="/businesses"
                              tabIndex={megaOpen ? undefined : -1}
                              className="mt-6 inline-flex items-center gap-2 text-sm text-brand-600 transition-colors hover:text-ink"
                            >
                              <span className="link-underline">All businesses</span>
                              <ArrowUpRight />
                            </Link>
                          </div>

                          <ul className="grid grid-cols-2 gap-x-10">
                            {divisions.map((division) => (
                              <li key={division.slug}>
                                <Link
                                  href={`/${division.slug}`}
                                  tabIndex={megaOpen ? undefined : -1}
                                  className="group flex items-start gap-5 border-t border-line py-5 transition-colors duration-300 hover:border-ink"
                                >
                                  <span className="eyebrow mt-1.5 text-ink-faint transition-colors group-hover:text-brand-600">
                                    {division.index}
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-lg tracking-tight text-ink">
                                      {division.name}
                                    </span>
                                    <span className="mt-1.5 block text-sm leading-relaxed text-ink-muted">
                                      {division.discipline}
                                    </span>
                                  </span>
                                  <ArrowUpRight className="ml-auto mt-1.5 shrink-0 text-ink-faint transition-all duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-[1.0625rem] tracking-tight transition-colors duration-300 ${
                        isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={contact.phoneHref}
              className="hidden font-mono text-sm tracking-tight text-ink-muted transition-colors duration-300 hover:text-ink xl:block"
            >
              {contact.phone}
            </a>
            <Link href="/contact" className="btn btn-solid hidden py-3 text-[0.8125rem] sm:inline-flex">
              Start a conversation
              <ArrowRight />
            </Link>

            <button
              ref={mobileTrigger}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/5 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    {/*
      Rendered OUTSIDE <header> on purpose.

      The header gets `backdrop-blur` once scrolled, and an element with a
      backdrop-filter becomes the containing block for its position:fixed
      descendants. Nested inside, this panel's `inset-0` resolved against the
      5.5rem header box instead of the viewport, so the menu opened as a sliver
      behind the bar — but only after scrolling, which is why it looked fine at
      the top of the page.
    */}
    {/* Mobile overlay */}
    <div
      id={mobileId}
      ref={mobilePanel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!mobileOpen}
      className="fixed inset-0 z-50 flex flex-col bg-navy-950 lg:hidden"
    >
      <div className="shell flex h-20 shrink-0 items-center justify-between">
        <Logo tone="light" />
        <button
          type="button"
          onClick={() => {
            setMobileOpen(false);
            mobileTrigger.current?.focus();
          }}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-paper"
        >
          <span className="sr-only">Close menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden focusable="false">
            <path d="M2 2l14 14M16 2 2 16" stroke="currentColor" strokeWidth="1.25" />
          </svg>
        </button>
      </div>

      <div className="shell flex-1 overflow-y-auto overscroll-contain pb-12">
        <nav aria-label="Mobile">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between border-b border-white/10 py-5 text-2xl tracking-tight text-paper"
                >
                  {item.label}
                  <ArrowUpRight className="text-mist-dim" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="eyebrow mt-10 text-mist-dim">Businesses</p>
        <ul className="mt-4">
          {divisions.map((division) => (
            <li key={division.slug}>
              <Link
                href={`/${division.slug}`}
                className="flex items-baseline gap-4 border-b border-white/10 py-4"
              >
                <span className="eyebrow text-brand-400">{division.index}</span>
                <span>
                  <span className="block text-paper">{division.name}</span>
                  <span className="mt-1 block text-sm text-mist">{division.discipline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3">
          <Link href="/contact" className="btn btn-light justify-center">
            Start a conversation
            <ArrowRight />
          </Link>
          <a href={contact.phoneHref} className="btn btn-ghost-light justify-center">
            {contact.phone}
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

import Link from "next/link";

/**
 * Every page opens on the same deep navy ground. It gives the site a
 * recognisable rhythm, and it means the fixed header only ever has to be
 * legible against one background — so it can stay transparent on load without
 * a per-page contrast check.
 */
export default function PageMasthead({
  index,
  label,
  title,
  lede,
  trail,
  aside,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
  trail?: { name: string; path: string }[];
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative bg-navy-950 pt-32 pb-16 text-paper lg:pt-44 lg:pb-24">
      <div className="shell">
        {trail && trail.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] text-mist-dim uppercase">
              {trail.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i === trail.length - 1 ? (
                    <span className="text-mist" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-paper">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="rail">
          <p className="eyebrow flex items-baseline gap-3 border-t border-white/15 pt-4 text-mist">
            <span className="text-brand-400">{index}</span>
            <span>{label}</span>
          </p>

          <div>
            {/* Not reveal-gated: this is the page's LCP element on every inner route. */}
            <h1 className="display-lg max-w-4xl">{title}</h1>
            {lede && (
              <p
                className="lede rise mt-8 max-w-2xl text-mist"
                style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
              >
                {lede}
              </p>
            )}
            {aside && (
              <div className="rise mt-12" style={{ "--reveal-delay": "240ms" } as React.CSSProperties}>
                {aside}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

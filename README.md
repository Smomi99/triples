# Triple S Group

A rebuild of triplesbd.com as a statically generated Next.js site.

The previous site ran on a purchased ASP.NET logistics template. This is a new
design and a new information architecture; the company's factual content is
carried over, the template's visual language is not.

---

## Running it

```bash
npm install
npm run assets     # regenerate images from assets/original (only needed if sources change)
npm run dev        # http://localhost:3000
npm run build && npm start
```

`npm run typecheck` runs TypeScript with no emit.

Every route is prerendered at build time. There is no database, no API and no
server-side rendering at request time, so the output can be deployed to any
static host as well as to a Node host.

---

## Structure

```
src/
  app/                 routes (App Router), sitemap.ts, robots.ts, icons
    logistics/         each business is its own page with its own composition —
    electronics/       there is deliberately no shared division template
    business-hub/
    tech-park/
  components/
    layout/            Header (client), Footer
    home/              the eight homepage sections
    sections/          PageMasthead, CtaSection — shared across pages
    division/          CrossLinks, DeliveredWork — the two blocks the business
                       pages genuinely share
    ui/                Logo, DivisionVisual, ProjectFigure, SectionIndex, Icons
  content/             all copy and company facts — the single source of truth
    division-detail.ts per-business data the bespoke layouts need
  lib/                 seo.ts (metadata), jsonld.ts (structured data),
                       globe.ts (orthographic projection)
scripts/
  prepare-assets.mjs   image pipeline, brand marks, OG card, legacy redirect stubs
  prepare-globe.mjs    coastline geometry for the globe (npm run globe)
assets/original/       untouched source images pulled from the previous site
```

**Content lives in `src/content`, not in components.** Changing a service
description, an office address or a project caption means editing one object in
one file. `site.ts` holds company facts, `divisions.ts` the four businesses,
`projects.ts` delivered work, `industries.ts` and `capabilities.ts` the
supporting indexes.

### Four businesses, four page designs

There is no `[division]` template. Each business page is written separately,
because each one is a different kind of business and the composition should
say so before the copy does:

| Page | Built as | Signature section |
| --- | --- | --- |
| `/logistics` | A route | Seven transit modes strung along one continuous spine |
| `/electronics` | A datasheet | Specification table — group code, item, rating |
| `/business-hub` | A flow | Imports and exports opposed across a centre rule |
| `/tech-park` | A blueprint | Four numbered layers on a drafting grid, read bottom-up |

They share only `PageMasthead`, `CtaSection`, `CrossLinks` and `DeliveredWork`
— the parts where consistency helps the visitor rather than flattening the
businesses into one another. Section counts, backgrounds and rhythm differ per
page.

---

## Design system

Tokens are defined in `src/app/globals.css` under `@theme`.

**Colour** is taken from the logo itself — three ascending strokes in bright
blue, indigo and deep navy. The orange used across the previous site came from
the purchased template, not from the brand mark, so it is not carried over. If
orange is in fact part of the brand, `--color-brand-600` is the one token to
change.

Two tones are set slightly off their "natural" values to clear WCAG AA at the
11px mono label size: `--color-brand-600` sits a shade below the logo's blue,
and `--color-ink-faint` / `--color-mist-dim` are pinned to the darkest and
lightest points that still pass on every ground they appear on.

**Type** is Archivo for everything and IBM Plex Mono for indices, labels and
data. Both are self-hosted by `next/font` at build time. Archivo ships with the
weight axis only — the optional width axis added 88 KB for a variation the
design never uses.

**Layout** recurs as a narrow left rail carrying a mono section index beside an
offset content column (`.rail`). Borders are hairlines rather than shadows and
radii are square; the intent is editorial and industrial rather than the soft
rounded-card idiom.

**Motion** is CSS-only. `.rise` animates above-the-fold content on load without
waiting for hydration. `.reveal` is driven by a single `IntersectionObserver`
mounted once in the layout (`ScrollReveal`), so sections stay server components
and only carry a class. The hidden start state is scoped to `.js`, which an
inline head script sets — without JavaScript nothing is ever stuck invisible.
`prefers-reduced-motion` disables durations *and* delays, so a staggered
sequence arrives at once rather than merely arriving slowly without animation.

### The ecosystem orbit

Homepage section 02 is a genuine 3D scene, built with CSS transforms and no
library. The businesses ride an orbital plane tilted back in space; the plane
turns, and each card counter-rotates by exactly the same amount so it always
faces the viewer and stays readable while its position travels. Depth is real —
cards on the far side are further from the camera and perspective shrinks them,
and the mark at the centre occludes them as they pass behind it.

The transform chain, for the record. The plane applies `Rx(tilt)·Rz(spin)`, so a
card at slot angle `a` appends the inverse of everything above it:

```
rotateZ(a) translateX(r) rotateZ(-(spin + a)) rotateX(-tilt) translate(-50%,-50%)
```

Plane and cards run the same duration on a `linear` curve, which is what keeps
`spin` identical in both places. Slot angles are `i · 72° + 90°`, so five
businesses sit evenly around the ring with the first nearest the camera.

It rotates only once scrolled into view, and pauses on `:hover` and
`:focus-within` so it is never moving while being read or tabbed through. Under
`prefers-reduced-motion` the animation resolves instantly to its base transform,
leaving a clean static pentagon rather than a frozen mid-frame.

One DOM, two layouts: below `md` the whole scene collapses to a stacked list on
a spine, so there are no duplicate links for screen readers.

Two things that will bite anyone editing it:

- **Position must not come from a Tailwind utility here.** Utilities sit in a
  later layer than `@layer components`, so a `relative` in the markup silently
  beats the absolute positioning and every card lands in normal flow with its
  orbit transform applied as an offset.
- **No `backdrop-filter` on the cards.** Inside a `preserve-3d` subtree it forces
  a flattening context and the depth collapses.

### The globe

Homepage section 03 is an orthographic globe carrying the four real office
locations, with great-circle routes drawn from the Dhaka head office to each of
them. Nothing on it is invented — there are no coverage claims, no lanes and no
markers the company has not published.

Orthographic projection is what you actually see looking at a sphere from far
away, so this is a real 3D view rather than a picture of one: rotating it
recomputes the projection, and a marker on the far hemisphere is genuinely
behind the globe rather than masked. Turn it 180° and only California is left.

No 3D library, no canvas, no WebGL — `lib/globe.ts` is pure trigonometry over a
coordinate table, rendered as SVG. A WebGL globe would have cost more than every
other script on this site put together.

**Coastline data.** `scripts/prepare-globe.mjs` (`npm run globe`) fetches Natural
Earth 110m land via world-atlas, decodes the TopoJSON and writes
`content/globe-land.ts`. Two things keep it small enough to ship: polygons are
never assembled — the globe strokes coastlines, and a TopoJSON arc already *is*
a coastline segment, so there is no ring stitching or spherical clipping — and
coordinates are stored as tenths of a degree in flat integer arrays, which is
sub-pixel at this size. 5,129 source points thin to 1,436, or 13.2 KB.

`MIN_STEP` is set at 2°, which puts coastline vertices about 7px apart at the
rendered size — finer than a stylised wireframe can show. Going finer costs
bytes twice over, because the server-rendered globe also carries the resulting
path data in the HTML, where it competes with the hero image for the first
megabyte on a mobile connection.

**How it loads.** The section sits well below the fold, so paying for it during
first load costs LCP for something nobody has scrolled to. It ships as
`GlobeStatic`, a *server* component — the coastline table it imports never
reaches the client bundle at all. `GlobePanel` swaps in the interactive version
via `import()` once the section is within 400px of the viewport. Shipping it
eagerly measured 93/3.2s LCP on mobile; split, it is 96/2.8s — better than
before the globe existed.

The static globe renders the first frame of the first leg, so the interactive
one picks up from exactly there rather than jumping when it takes over.

**The rotation is a camera, not idle spin.** One flight runs at a time and the
globe turns to hold it in frame, so the motion is going somewhere and finishes
somewhere. A leg flies for 9s, holds 1.9s at arrival so you can read where it
landed, then the next leg begins and the globe travels back. The caption names
the leg in the air.

Tracking *lags* the aircraft by about a second rather than pinning it. Centre it
exactly and the plane sits motionless while the earth slides underneath, which
reads as a turntable; behind by a second, the plane visibly crosses the disc and
the globe follows it.

Latitude is damped to 0.6× rather than followed exactly — the Dhaka–California
great circle runs over the Arctic, and centring on it literally would swing the
globe pole-on.

Aircraft trail a lit section of their route and bank with the projection.
Positions are interpolated between great-circle samples — at 128 steps over a 9s
traverse, snapping to samples is visibly steppy — and longitude is unwrapped
across the antimeridian first, or the Dhaka–California lane lurches the wrong way
round the globe as it crosses the Pacific. Heading is sampled either side of the
aircraft so it stays defined at both ends of the lane.

Dhaka–Rajshahi draws but is not flown. It spans about 2°: a 200km domestic link
to the plant, not an international route. `MIN_FLOWN_SPAN` filters it out, which
also keeps a plane off two markers that already overlap.

**Motion control.** Drag, or arrow keys when focused. One loop advances the
schedule and eases the camera toward it, throttled to ~30fps and stopped
entirely by an `IntersectionObserver` when off-screen. The flight clock keeps
running while you drag or read; only the camera stands down, because that is the
part that fights for control. It holds your view for 3s after a drag, then eases
back rather than snapping.

`GlobeArt` — the ~150-path sphere, graticule and coastlines — is `memo`ised and
takes arrays keyed on the camera alone, so when only the aircraft has moved the
shallow compare holds and the whole subtree is skipped.

Under `prefers-reduced-motion` nothing animates, but the aircraft still renders
at its departure point and the globe stays fully steerable: the motion goes, the
information and the function stay.

### The fifth business

`upcomingBusiness` in `content/divisions.ts` is a placeholder, deliberately kept
out of the `divisions` array — that array drives navigation, the footer, the
sitemap, cross-links and the Organization structured data, and an unannounced
business with no page must not appear in any of them. It renders in the orbit
only, as an openly unfilled fifth slot with a dashed border and no link.

To promote it: set `name` and `discipline`, move the object into `divisions`
with a slug, summary, statement and body, then add its page under `src/app/`.

---

## Images

Photography is treated with `.photo-treat`: saturation pulled well down at
rest, colour returning on hover. The source images are a mix of dusk phone
photos, a lit factory floor, two 3D renders and one piece of template stock;
untreated they read as a folder of files rather than a body of work.

Two of the supplied project images are **architectural renders, not
photographs of completed buildings**. They carry a visible "Render" label —
`ProjectFigure` renders it from `image.kind` in `projects.ts`. Presenting a
render as a photograph of delivered work would overstate what has been built.

Three of the four template "scene" images were discarded: they are visibly
synthetic (a bow that could not float, an aircraft composited over a container
stack). Only the aerial berth shot survives, used once as hero texture at 45%
opacity under two gradients and a grain film.

---

## SEO

- Unique title, meta description and canonical URL per page, via `lib/seo.ts`.
  Titles are kept under ~60 characters; division pages use absolute titles
  because their names already contain the brand.
- JSON-LD: `Organization` (with the four businesses as `subOrganization`),
  `WebSite`, `BreadcrumbList` per page, `ContactPage`, and per-division
  `Organization` with `makesOffer`. No `aggregateRating`, no review markup and
  no fabricated figures.
- `sitemap.xml` and `robots.txt` are generated from the route list.
- `og.jpg` is generated at asset time rather than per request.

### Legacy URLs

The previous site's URLs redirect permanently:

| Old | New |
| --- | --- |
| `/Home/Logistics` | `/logistics` |
| `/Home/Electronics` | `/electronics` |
| `/Home/BusinessHub` | `/business-hub` |
| `/Home/Privacy` | `/privacy` |
| `/Home/Terms` | `/terms` |

These are real 308s from `next.config.ts` on a Node host. For a pure static
export, `scripts/prepare-assets.mjs` also writes meta-refresh stubs under
`public/Home/*`, and `robots.txt` disallows `/Home/` so the stubs are not
indexed in place of the canonical pages.

---

## Measured

Lighthouse against the production build:

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home, desktop | 100 | 100 | 100 | 100 |
| Home, mobile | 96 | 100 | 100 | 100 |
| `/electronics` | 100 | 100 | 100 | 100 |
| `/tech-park` | 100 | 100 | 100 | 100 |

Desktop LCP 0.6 s, CLS 0. Mobile LCP 2.7 s, CLS 0. No horizontal overflow at
320, 375, 390, 414, 768, 1024, 1280, 1440 or 1920px.

The only client-side JavaScript is the header (menus, scroll state) and the
scroll-reveal observer.

---

## Needs a decision before launch

1. **Photography.** Triple S Logistics and The Tech Park have no authentic
   images. The hero currently uses template stock, marked
   `imageIsPlaceholder: true` in `divisions.ts`; The Tech Park uses a drawn
   tile rather than a stand-in photo. Real photography would lift the site more
   than any further design work.
2. **Legal pages.** The previous Terms of Service was template text belonging
   to another company — it referred to "EFL" throughout and listed that
   company's service lines. None of it was carried over; the page has been
   rewritten from scratch. Both Privacy and Terms need review by the company's
   legal adviser.
3. **Contact form.** With no backend, the form composes a pre-filled message
   and hands it to the visitor's mail client. Set
   `NEXT_PUBLIC_CONTACT_ENDPOINT` to a URL accepting a JSON POST and it submits
   there instead — no other change needed.
4. **The "six continents" claim.** Published by Triple S Logistics on the old
   site. It is presented here as the company's own description of its network
   rather than as independent fact. Confirm it still holds.
5. **Brand colour.** See above — the palette follows the logo, not the
   template's orange.
6. **WhatsApp number.** The old site's WhatsApp link used +8801313368332, which
   differs from the published +88 09613828181. Both are carried through as
   found; confirm which is correct.

No clients, revenue, headcount, certifications, awards or statistics have been
invented anywhere on the site. Where a corporate template would normally show a
number, this one shows a verifiable fact or nothing.

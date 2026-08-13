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
    green-mart/        the group's ecommerce business (greenmart-bd.com)
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
one file. `site.ts` holds company facts, `divisions.ts` the five businesses,
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
| `/green-mart` | A shopfront | Colour-blocked aisle grid on a full green ground |

Each opens with `DivisionHero` — a full-bleed landing header in that business's
own colour. The photograph under it is **duotoned**: desaturated first, then the
accent multiplied in. Desaturating first is the whole trick; multiplying a
colour into a colour photograph muddies to brown. It also means the company's
only photography — 380–1200px wide — reads as treatment rather than as a soft
crop when it fills a 2000px header.

Tech Park and Green Mart have no relevant photography, so they get the colour
field and linework alone. Inventing a stock "tech" image would say less than the
colour does, and say it dishonestly. Drop a file in `public/images/scenes/` and
pass `image` to `DivisionHero` when real photography exists.

They share only `PageMasthead`, `CtaSection`, `CrossLinks`, `DeliveredWork` and
`ProcessSteps` — the parts where consistency helps the visitor rather than
flattening the businesses into one another. Section counts, backgrounds and
rhythm differ per page.

### Colour

The palette is drawn from the Triple S mark — three ascending strokes in bright
blue, indigo and deep navy — and extended so the site is not only navy and
off-white.

**Each business owns an accent**, and it is the same colour wherever that
business appears: the hero rail, the ecosystem orbit, its card, its own page.
The colour is doing identification work, not decoration. Three come from the
logo's own strokes; copper is the fourth, a warm complement that also picks up
the accent the previous site used, so the group still reads as itself to anyone
who knew the old one. All four are set at tones clearing 4.5:1 on both paper
grounds, because they land on 11px mono labels where the large-text allowance
does not apply.

**`--color-tint`** gives the light half of the site a third register. The rhythm
previously alternated between off-white and full navy, which is what made the
whole site read as dark. The homepage now runs

```
hero DARK · intro paper · globe DARK · capabilities paper
· businesses paper-alt · proof paper · trust tint · CTA DARK
```

— three dark sections out of eight, down from five, with no two adjacent.

### The hero backdrop, and adding a video

**To add a video:** drop the file at `public/video/hero.mp4` and set `video` in
`heroMedia` (`content/site.ts`) to `"/video/hero.mp4"`. Add a WebM at the same
path and set `videoWebm` too — it is typically 30–40% smaller and supporting
browsers will prefer it. Keep it under ~6MB, around 1920×1080, and strip the
audio track: it plays muted, so audio is dead weight.

`image` is not a fallback afterthought. It is the poster, it paints first, and
it is what remains under `prefers-reduced-motion`, on Data Saver, on a 2G
connection, and if the video fails to load. **Export the still from the video**
so the crossfade between them is invisible.

The video element is only created once those checks pass, and mounts on
`requestIdleCallback`, so it never competes with the headline for first paint.
With no video configured, no video element exists at all.

The scrim over it is deliberately light — weighted to the bottom-left where the
headline and buttons sit, and kept off the top-right so the picture is visible.
An earlier version buried the photograph under two near-opaque gradients at 45%
opacity: legible, but there was no point having a photograph at all.

### How it works — the process sections

Every business page carries an expandable "how an engagement runs" section.
The reference material on these pages said what each business *sells*; none of
it said what happens after you get in touch, which is the question a first-time
visitor is actually holding.

They are built on native `<details>` — interactive with **zero JavaScript**.
The browser owns keyboard operation, focus order and the open state, so there
is nothing to hydrate and nothing to re-implement less well than the element
already does it. Steps are independent rather than an exclusive accordion, the
first is open on load so the pattern is discoverable, and collapsed copy stays
in the DOM where search engines still read it.

`::details-content` animates the open/close where supported and simply snaps
where it is not, which is the correct thing to degrade to. `interpolate-size:
allow-keywords` on `html` is what lets it transition to `auto` height. The
transition is wrapped in `prefers-reduced-motion: no-preference`.

The step copy deliberately carries no timescales, service levels, guarantees or
warranties — the company publishes none, and those are exactly the claims that
would be invented.

---

## Design system

Tokens are defined in `src/app/globals.css` under `@theme`.

**Colour** starts at the logo — three ascending strokes in bright blue, indigo
and deep navy — and extends into the four division accents and the tinted
ground. See [Colour](#colour) above for how those are used.

Several tones are set slightly off their "natural" values to clear WCAG AA at
the 11px mono label size: `--color-brand-600` sits a shade below the logo's
blue, the four `--color-acc-*` accents are pitched to pass on both paper
grounds, and `--color-ink-faint` / `--color-mist-dim` are pinned to the darkest
and lightest points that still pass on every ground they appear on.

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

`EcosystemOrbit`, which runs inside the Introduction (section 01) beside the
copy describing the same five businesses, is a genuine 3D scene built with CSS
transforms and no library. It had its own section once, at 02; the orbit was
that section's only content, so when the orbit moved the section went with it
and everything below shifted up one.

The businesses ride an orbital plane tilted back in space; the plane
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

Sizing is all derived from `--r`, so the `compact` prop — which the Introduction
uses — is a single class, `.orbit3d-stage--compact`, that changes the radius,
the card width and the box around them. Two things do not scale linearly with
it. `perspective` has to stay long relative to `--r` (dropping it in proportion
blew the near card up to 1.7× its own width), and the discipline line under each
name is dropped, because five cards 72° apart on a small ring sit about 150px
from each other and a card tall enough to hold "Electrical apparatus
manufacturing" overlaps its neighbours and buries the mark.

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

Homepage section 02, Coverage, is an orthographic globe carrying the four real
office locations, with great-circle legs flying out from the Dhaka head office
to each region the group says it ships into. The offices and their coordinates
are published facts; the five regions are the group's own coverage claim, and
they live in one place — `coverage` in `content/site.ts` — so the section copy
and the marks on the globe cannot drift apart.

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

**The legs are coverage, not scheduled services.** One arc runs from Dhaka to
each region in `coverage` (`content/site.ts`) — Asia, the Middle East, Africa,
Europe, the USA — anchored at a point inside the region rather than at a city,
far enough from the office pins that the two sets of labels do not collide.

As a leg lands, that region is marked and named, and it stays marked: `arrived()`
counts up with the schedule and holds at the full set instead of resetting on
each loop, so a full run builds the coverage map rather than replaying one leg at
a time. Regions show as hollow dots until reached — which is also the frame
`GlobeStatic` renders, so the handover to the interactive globe does not pop.
Orange rings are regions; the blue dots remain offices, and the two never merge.
Under `prefers-reduced-motion` the clock never advances, so the globe resolves
straight to the finished set rather than sitting on an empty map forever.

The office links still draw underneath as a dim layer, so Dhaka–Chattogram is
visible as geography without an aircraft being flown down a 2° domestic hop.

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
| `/logistics`, desktop | 100 | 100 | 100 | 100 |
| `/business-hub`, mobile | 94 | 100 | 100 | 100 |

`/business-hub` is the longest page and measures 94 on throttled mobile,
repeatably. The only opportunity Lighthouse reports is unused framework
JavaScript — the page itself ships no client components beyond the header.

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

# Handoff: HYDRIX — Full Dark-Mode DTC Site

## Overview
HYDRIX is a premium, clinical, "Apple-meets-laboratory" hydration brand. This bundle is the complete
site design: a **prelaunch landing page** (email + Founder's Club capture), an **affiliates/partner page**,
and a full **post-launch ecommerce store** (home, shop, product page, science, subscribe, about, blog,
account, contact). Brand line: **"hydration. reimagined."**

## About the Design Files
The files in this bundle are **design references created in HTML** — streaming "Design Component"
prototypes (`*.dc.html`) that show the intended look, layout, copy, and interactions. **They are not
production code to copy directly.**

Your task is to **recreate these designs in the target codebase's environment** using its established
patterns and libraries (e.g. React + Tailwind, Next.js, Shopify/Liquid for the storefront, etc.). If no
environment exists yet, pick the most appropriate stack — for a DTC store, **Shopify (Liquid/Hydrogen)**
or **Next.js + a headless commerce backend** are both natural fits — and implement there.

> Note on the `.dc.html` format: each file has its markup inline and a `class Component extends DCLogic`
> block holding state/handlers. Treat `renderVals()` as the component's view-model. Ignore `support.js`
> (it's the prototype runtime, not part of the design).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are specified. Recreate the
UI faithfully. Imagery is intentionally placeholder in spots (see Assets) — wire those to real CMS/product
media. The FOCUS/ACTIVE/RECOVER products use CSS "tub" placeholders because only the DAILY render exists.

---

## Design Tokens

### Color (exact — do not deviate)
| Token | Hex | Use |
|---|---|---|
| Midnight Black | `#0A0B0F` | Page bg, nav, primary buttons |
| Near Black | `#070809` | Image-stage / inset wells |
| Pure White | `#FFFFFF` | Headlines, body on dark |
| Soft White | `#F5F7FA` | Light cards (supplement facts, data tables) |
| Graphite | `#20242A` | Borders, dividers, card surfaces, chips |
| Cool Gray | `#6C7685` | Secondary/body copy, placeholders |
| Slate Gray | `#9AA5B3` | Tertiary copy / trust labels |
| Light Gray | `#E6EAF0` | Emphasis body on dark |
| Primary Blue | `#2D6BFF` | LEAD accent, buttons, links, active states |
| Hover Blue | `#3B7EFF` | Button hover |
| Deep Blue | `#1F4FD1` / Navy `#143A99` | Gradient stops |
| Glow Blue | `#8FD9FF` | Beam core, counter numbers, glows |
| Crystal/Ice | `#BDE8FF` / `#A8E9FF` / `#DFF5FF` | Science accents, beam top |
| Product · FOCUS | `#22D37D` (grad `#7DFFC2→#22D37D`) | green |
| Product · ACTIVE | `#FF6B1A` (grad `#FFBC66→#FF6B1A`) | orange |
| Product · RECOVER | `#4B5BFF` (grad `#CFA4FF→#4B5BFF`, label text `#8E9BFF`) | berry |
| Success | `#21C36F` | confirmations, savings |
| Warning | `#F5B400` | "limited spots" notes |
| Metallic Silver | `#D8DCE3` / Gunmetal `#4D5665` | founder badge, premium edge |

**Composition rule (mandatory): 70% black · 20% white · 5% gray · 5% color.** Blue is a scalpel.
Blue gradient (5-stop): `#8FD9FF → #6CB9FF → #4F98FF → #3B7EFF → #2D6BFF`.

### Typography
- **Display / headlines:** `Saira` (Google Fonts), weights 500–800. Used for H1–H3, prices, counters,
  step numbers. Often tracked/uppercase for eyebrows.
- **Body / UI:** `Inter`, weights 400–700.
- **Tagline:** "hydration. reimagined." is **always lowercase, color `#2D6BFF`**.
- Fluid sizes use `clamp()`: e.g. hero H1 `clamp(40px, 7.2vw, 82px)`, section H2 `clamp(28px,4vw,46px)`,
  body `15–17px`, eyebrow `12–13px` letter-spacing `.32em` uppercase.
- Headlines `#FFFFFF`; body `#6C7685`; line-height ~1.5–1.7 body, ~1.04 headlines.

### Spacing / Radius / Shadow
- Content max-width `1180–1240px`, gutters `24–28px`.
- Section vertical padding: `clamp(56px, 7vw, 92px)` (heroes larger).
- Radius: buttons `9–11px`, cards `14–18px`, panels `18–20px`, pills/chips `100px`.
- Card border: `1px solid #20242A`, hover → `#2D6BFF` (often + glow `0 0 40px rgba(45,107,255,.16)`).
- Button glow: `box-shadow: 0 0 24px rgba(143,217,255,.18)`, intensifies on hover.
- Inputs: fill `#0A0B0F`, `1px #20242A` border, focus border `#2D6BFF`, placeholder `#6C7685`.

### Signature motif — "The Beam & The Arc"
- **Beam:** 2px vertical line from top-center, `linear-gradient(180deg,#BDE8FF,#8FD9FF 18%,#2D6BFF 52%,transparent)`,
  ~48% viewport tall, soft radial glow behind it, gentle opacity pulse (`beamPulse` 4.5s).
- **Arc:** a large (~1700px) circle pushed far below the fold (`bottom:-1340px`) with a thin
  `rgba(143,217,255,.45)` border and `box-shadow: 0 0 90px 8px rgba(45,107,255,.32)` so only a glowing
  horizon crescent shows (Frame.io-style). Plus a radial bloom. Used on every hero and final CTA.

---

## Screens / Views

### 1. Prelaunch Landing (`Prelaunch.dc.html`) — priority page
- **Announcement bar:** slim, `#0A0B0F`, 1px bottom border, centered white line, diamond + key phrase in
  blue, subtle left→right light shimmer.
- **Nav (transparent over hero):** wordmark left; right = "Affiliates" text link (`#6C7685`→white) + solid
  blue "Join the Waitlist" pill. Hamburger < 820px → fullscreen overlay menu.
- **Hero (Beam & Arc):** centered eyebrow (lowercase tagline) · H1 "The waitlist for better hydration." ·
  one-line subcopy · **inline email capture** (input + blue button) that swaps to a green success card on
  submit · **live waitlist counter** (number in `#8FD9FF`) · trust microcopy row.
- **Counter band:** oversized gradient number (`#BDE8FF→#2D6BFF`), 3 chips (Early access / Founder pricing /
  Limited founding spots), faint deep-water radial behind.
- **Problem:** left editorial (H2 with "mildly dehydrated" in blue, 3 inline stats) + right droplet-macro
  placeholder (blue radial art).
- **Product teaser:** floating DAILY tub (real render) with 4 spec pills, headline, ghost "See what's inside".
- **Benefits grid (2×3):** black cards, 1px border→blue on hover, thin-line blue SVG icon, white title, gray
  desc. Six: Daily Hydration, Energy Support, Mental Clarity, Electrolyte Replenishment, Cellular Hydration,
  Zero Sugar.
- **Founder's Club panel:** elevated `#16181f` card, blue border + glow + silver inner edge; H2, sub, 4-item
  blue checklist, big `$5`, blue CTA, amber "limited / credited" note.
- **Two-tier choice:** Free Waitlist card (gray) vs Founder's Club card (blue border + glow + "MOST POPULAR"
  ribbon).
- **Brand story:** centered; giant faint HX monogram watermark (~5% opacity); tagline large lowercase blue +
  2 sentences.
- **Product line preview:** 4 CSS "tub" silhouettes, identical lighting, only rim-glow color changes per
  product, "Coming at launch" tags.
- **FAQ:** centered accordion, white question, blue +/− toggle, gray answer, 1px dividers.
- **Final CTA:** mirror of hero (beam + arc), "Be first. Be founding.", email capture, counter restated.
- **Footer:** wordmark + blue tagline, 4 link columns, copyright. Sticky mobile CTA bar < 820px.

### 2. Affiliates (`Affiliates.dc.html`)
Beam&arc hero with floating live "commission earned $4,820 / up to 25%" card · Why-Partner 4-card grid ·
Commission tiers (15/20/25%, top tier glowing) + cookie window/payout line · How it works (01–02–03) ·
"Who it's for" chip row · Application form (Name, Email, Platform, Audience, Channel select, textarea) →
green success state · Partner FAQ · final CTA · footer.

### 3. Homepage (`Home.dc.html`)
Announcement bar · **sticky blurred nav** (Shop, Science, About, Subscribe, cart icon w/ count badge) ·
hero (left copy + Shop DAILY / Explore; right DAILY tub) · trust bar (4 ◆ items) · product range (4 cards,
per-product hover accent, DAILY links to PDP) · how-it-works (Scoop/Mix/Hydrate circles) · science teaser
(split card, crystal-blue art placeholder) · subscribe & save band (blue-bordered, 15% off) · reviews (3
cards, blue stars, avatar slots) · press logo strip · beam newsletter capture · footer.
**Cart drawer:** right slide-in (`drawerIn` 0.28s), free-shipping progress bar (blue), line item, "frequently
added RECOVER" upsell, subtotal, blue Checkout, secure note. Opened by nav cart button; dark scrim closes.

### 4. Shop / Collection (`Shop.dc.html`)
Breadcrumb + title + intro · filter chips (active = blue fill) + sort label · 4 product cards (DAILY real
image links to PDP; FOCUS/ACTIVE/RECOVER CSS tubs with "New" tag + Quick add; per-product hover accent) ·
subscription upsell strip · footer.

### 5. Product page / PDP (`Product-DAILY.dc.html`) — conversion page
- **Sticky gallery:** square stage with blue radial glow + main image; 4 thumbnails (front/back/benefits/lid),
  active thumb border `#2D6BFF`.
- **Buy box:** H1 "DAILY" · blue tagline · ★ rating row · price (changes with plan) · flavor pills
  (selected = blue border) · **plan selector** (Subscribe & Save `$41.65` w/ "SAVE 15%" badge vs One-time
  `$49.00`) as radio cards · qty stepper (1–9) · "Add to Cart — $total" (opens cart drawer, sets count) ·
  trust row.
- Benefit icon row (5) · **Supplement Facts** card on Soft White `#F5F7FA` (full nutrition table, exact
  values below) · "Why DAILY" story + 12.5g/10/0g stats · How-to-use 01-02-03 · Reviews (3) · RECOVER bundle
  strip (blue border) · Product FAQ · footer · **sticky mobile add-to-cart** bar < 860px.

**Supplement Facts (exact):** Serving 1 scoop (12.5 g), 30 servings. Calories 10 · Total Carb 2 g (1%) ·
Total Sugars 0 g · Sodium 500 mg (22%) · Potassium 400 mg (9%) · Chloride 700 mg (30%) · Magnesium 100 mg
(24%) · Calcium 60 mg (5%) · Zinc 2 mg (18%) · Selenium 10 mcg (18%) · Proprietary Hydration Blend 4.5 g
(Coconut Water Powder, Taurine, Inositol, AquaMin® Sea Minerals, Ioniplex®).

### 6. Science (`Science.dc.html`)
Beam hero "The science of full-spectrum hydration" · 7-electrolyte card grid (name, amount, role — data in
README token table / file) · absorption explainer (left copy + cell-diagram placeholder) · testing/clean-
label/sourcing 3-card row · science FAQ · footer. Accent leans crystal/ice blue.

### 7. Subscribe & Bundle (`Subscribe.dc.html`)
Beam hero "Never run dry — save 15%" · how-subscription-works 01-02-03 · **interactive bundle builder**:
4 selectable product tiles (selected = blue border + check) with a sticky summary panel showing live Items /
Subtotal ($49 ea) / Subscription savings (green, 15%) / **Total per cycle** ($41.65 ea) · flexibility row
(skip/swap/cancel) · subscription FAQ · footer.

### 8. About (`About.dc.html`)
Beam hero with giant lowercase blue tagline · founder story prose · 3 value cards (01–03) · manifesto block
with faint HX monogram watermark · press strip · CTA · footer.

### 9. Blog (`Blog.dc.html`)
Featured article split card (image slot + Science tag + title) · category filter chips · 6-card article grid
(image slot, tag, title, meta) · beam newsletter capture · footer.

### 10. Account (`Account.dc.html`)
Header w/ silver+blue "Founding Member" badge · next-delivery card (blue, manage/skip buttons) · member-
savings card (green figure) · **order history table** on Soft White (Order/Date/Items/Total/Status, green
"Delivered" pills) · shipping/payment cards · footer.

### 11. Contact (`Contact.dc.html`)
Beam hero · contact form (Name, Email, Topic select, Message) → green success state · 3 support category
cards (Orders, Product/Science, Partnerships) with links · footer.

### Directory (`index.dc.html`)
Card index linking all pages — useful as a review entry point, not part of the production site.

---

## Interactions & Behavior
- **Nav:** sticky blurred header on store pages (`backdrop-filter: blur(14px)`, bg `rgba(10,11,15,.82)`);
  transparent on prelaunch/affiliates heroes. Mobile (<820–860px) hamburger → fullscreen overlay.
- **Waitlist counter:** animates up to **3,842** on load (~55ms ramp), then increments +1 every ~5.4s. Format
  with thousands separator. Restated in final CTA.
- **Email / application / contact forms:** prevent default, swap form → success card (green ✓). No backend in
  the prototype — wire to your ESP / affiliate platform / commerce API.
- **FAQ accordions:** single-open; +/− toggle in blue; answer reveals below.
- **PDP:** thumbnail click swaps main image; plan toggle changes price + button total; qty stepper clamps 1–9;
  Add to Cart opens drawer and sets cart count.
- **Cart drawer:** slide-in animation, scrim click closes.
- **Bundle builder:** toggling tiles recomputes count/subtotal/savings/total live.
- **Hover:** card borders → blue (or product accent); buttons → `#3B7EFF` with stronger glow; nav links →
  blue/white.
- **Animations/keyframes:** `beamPulse` (opacity 0.85↔1, 4.5s), `floaty` (±10–12px, 7–8s) on product/hero
  cards, `sweep` (announcement shimmer, 6s), `drawerIn` (cart, 0.28s ease).
- **Responsive:** layout via fluid `clamp()` type + `grid auto-fit minmax(...)` + `flex-wrap`; explicit media
  queries only toggle nav/sticky-CTA visibility and collapse the bundle-builder grid.

## State Management
Per-page view-model (`renderVals()` in each file):
- Prelaunch: `count` (3742→3842 + ticks), `menuOpen`, `joined`, `openFaq`.
- Affiliates: `menuOpen`, `applied`, `openFaq`.
- Home: `menuOpen`, `cartOpen`, `newsDone`, `cartCount`.
- PDP: `activeIdx` (gallery), `plan` ('sub'|'one'), `qty`, `flavor`, `cartOpen`, `openFaq`, `added`.
- Shop: `menuOpen`, `filter`. Blog: `menuOpen`, `cat`, `newsDone`. Subscribe: `menuOpen`, `openFaq`,
  `sel{DAILY,FOCUS,ACTIVE,RECOVER}`. Contact: `menuOpen`, `sent`. About/Account: `menuOpen`.
Data fetching to add in production: waitlist/email signup, affiliate application, products & inventory,
reviews, subscription management, order history, cart/checkout.

## Assets (in `assets/`)
- `hydrix-logo-white.png` — full white lockup (monogram + wordmark + blue tagline), transparent bg. Derived
  from the supplied black wordmark.
- `hydrix-wordmark-white.png` — white "HYDRIX" wordmark for nav/footer.
- `hydrix-monogram-white.png` — white HX monogram for watermarks / mobile / favicon.
- `hydrix-logo-silver.png` — supplied silver metallic logo on black.
- `daily-front.png`, `daily-back.png`, `daily-facts.png`, `daily-lid.png`, `daily-benefits.png` — crops of
  the supplied DAILY render sheet (`daily-sheet.png`).
- **Placeholders to replace with real media:** lifestyle/droplet macro (Problem), molecule/cell diagram
  (Science & Home science teaser), review avatars (Home), blog article images (Blog). These use a drag-and-
  drop slot in the prototype — map them to product/CMS images.
- Icons are inline thin-line SVGs (1.6 stroke, blue or white) — reuse or swap for your icon set.
- Fonts: Saira + Inter via Google Fonts.

## Files
- `index.dc.html` (directory), `Prelaunch.dc.html`, `Affiliates.dc.html`, `Home.dc.html`, `Shop.dc.html`,
  `Product-DAILY.dc.html`, `Science.dc.html`, `Subscribe.dc.html`, `About.dc.html`, `Blog.dc.html`,
  `Account.dc.html`, `Contact.dc.html`
- `assets/` — logos + product crops + `image-slot.js` (prototype-only).
- Ignore `support.js` (prototype runtime).

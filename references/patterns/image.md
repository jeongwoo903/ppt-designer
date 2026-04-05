# Image Layout Patterns

Image-centric slides organized by image type/shape. Source: `image-patterns/`, `split-patterns/`

Shared layout tokens: see `_layout-tokens.md`

---

## A1 — Top Image Band + Bottom Text

**Composition:** Upper 55% full-width image + lower 45% text area
**Source:** `image-patterns/img-a-wide-band.html` A1

**Key CSS:**
- `.slide { background: #fff; display: flex; flex-direction: column; }`
- `.img-band { width: 100%; height: 55%; overflow: hidden; }`
- `.img-band img { width: 100%; height: 100%; object-fit: cover; }`
- Text area: `flex: 1; padding: 3cqw 5cqw; justify-content: center;`
- Label: 0.85cqw, uppercase, primary color
- Title: 2.5cqw, weight 800
- Desc: 1.1cqw, muted

**Mood:** Office/space showcase, facility introduction

---

## A2 — Top Text + Bottom Image Band

**Composition:** Upper 40% text + lower 60% full-width image
**Source:** `image-patterns/img-a-wide-band.html` A2

**Key CSS:**
- `.slide { background: #F8FAFC; display: flex; flex-direction: column; }`
- Text area: `padding: 4cqw 5cqw 2cqw;`
- `.img-band { flex: 1; }` — image fills remaining space

**Mood:** Team, culture, event showcase

---

## A3 — Center Image Strip (Dark)

**Composition:** Dark bg + title top + full-width image strip center + desc bottom
**Source:** `image-patterns/img-a-wide-band.html` A3

**Key CSS:**
- `.slide { background: #0F172A; flex-direction: column; align-items: center; justify-content: center; padding: 3.5cqw 0; }`
- `.img-strip { width: 100%; height: 26cqw; overflow: hidden; margin: 1.5cqw 0; }`
- Title: 2.5cqw white, desc: 1.1cqw white 50%

**Mood:** Factory, facility, panoramic showcase

---

## B1 — Left Text + Right Portrait Image

**Composition:** Left 55% text + right 45% rounded portrait image
**Source:** `image-patterns/img-b-portrait.html` B1

**Key CSS:**
- `.slide { background: #fff; display: flex; flex-direction: row; align-items: stretch; }`
- Text: `width: 55%; padding: 6cqw 4cqw 6cqw 6cqw; justify-content: center;`
- Image: `width: 45%; padding: 4cqw 5cqw 4cqw 2cqw;`
- `img { width: 100%; height: 100%; object-fit: cover; border-radius: 1.2cqw; }`

**Mood:** Interview, profile, personal story

---

## B2 — Text + Portrait (Dark)

**Composition:** Dark bg + left text + right portrait image (rounded)
**Source:** `image-patterns/img-b-portrait.html` B2

**Key CSS:**
- `.slide { background: #0F172A; flex-direction: row; align-items: center; padding: 5cqw 6cqw; gap: 4cqw; }`
- Image area: `width: 28cqw; height: 38cqw; border-radius: 1.2cqw; overflow: hidden;`

**Mood:** CEO message, leadership profile

---

## B3 — Two Portraits + Center Text

**Composition:** Left portrait + center text + right portrait
**Source:** `image-patterns/img-b-portrait.html` B3

**Key CSS:**
- `.slide { background: #F8FAFC; flex-direction: row; align-items: center; padding: 4cqw 5cqw; gap: 3cqw; }`
- `.img-col { width: 24cqw; height: 42cqw; border-radius: 1cqw; overflow: hidden; }`
- Center text: `flex: 1; text-align: center;`

**Mood:** Team intro, co-founders, dual profile

---

## C1 — Center Product Hero

**Composition:** Solid bg + centered large product image + title + desc
**Source:** `image-patterns/img-c-cutout.html` C1

**Key CSS:**
- `.slide { background: #F5F0EB; flex-direction: column; align-items: center; justify-content: center; }`
- `.product-img { width: 30cqw; height: 30cqw; object-fit: contain; filter: drop-shadow(0 1cqw 2cqw rgba(0,0,0,.12)); }`
- Title: 2.5cqw, desc: 1.1cqw muted

**Mood:** Product hero, single product spotlight

---

## C2 — Split Text + Cutout Product

**Composition:** Dark bg + left 50% text (with price) + right 50% product with circle glow
**Source:** `image-patterns/img-c-cutout.html` C2

**Key CSS:**
- `.slide { background: #1A1A2E; flex-direction: row; align-items: center; }`
- Circle glow: `::before { width: 32cqw; height: 32cqw; border-radius: 50%; background: rgba(245,158,11,.08); }`
- `.product-img { width: 28cqw; height: 28cqw; object-fit: contain; filter: drop-shadow(...); z-index: 1; }`
- Price: 1.8cqw, weight 800, amber

**Mood:** Product launch, new arrival, pricing

---

## C3 — Product Lineup (3 Items)

**Composition:** Title block + 3 product cards with image + name + description + price
**Source:** `image-patterns/img-c-cutout.html` C3

**Key CSS:**
- `.slide { background: #fff; flex-direction: column; justify-content: center; padding: 4cqw 5cqw; }`
- `.products { display: flex; gap: 2cqw; }` — NO flex: 1
- Card: `background: #F8FAFC; border-radius: 1cqw; padding: 2.5cqw 2cqw; text-align: center;`
- Card image: `width: 14cqw; height: 14cqw; object-fit: contain; drop-shadow;`
- Card desc: 0.85cqw, muted, 2 lines
- Card price: 0.95cqw, weight 700, primary color

**Mood:** Product lineup, catalog, comparison

---

## D1 — Menu Grid (2x2)

**Composition:** Left title area (28%) + right 2x2 menu card grid
**Source:** `image-patterns/img-d-catalog.html` D1

**Key CSS:**
- `.slide { background: #FDFBF7; flex-direction: row; align-items: center; padding: 4cqw 5cqw; gap: 3cqw; }`
- `.menu-grid { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5cqw; }`
- Menu card: `background: #fff; border-radius: 0.8cqw; box-shadow;`
- Card image: `width: 100%; height: 16cqw; object-fit: cover;`
- Info row: flex space-between, name 1cqw + price 0.95cqw

**Mood:** Cafe menu, restaurant, food catalog

---

## D2 — Horizontal Menu Cards (Dark)

**Composition:** Dark bg + centered title + 4 menu cards horizontal
**Source:** `image-patterns/img-d-catalog.html` D2

**Key CSS:**
- `.slide { background: #1A1A2E; flex-direction: column; align-items: center; justify-content: center; padding: 4cqw 5cqw; }`
- `.menu-row { display: flex; gap: 1.5cqw; }` — NO flex: 1
- Card image: `width: 100%; height: 20cqw; object-fit: cover;`
- Info: `background: rgba(255,255,255,.06); padding: 1.2cqw;`

**Mood:** Seasonal menu, dark premium catalog

---

## D3 — Feature Image + Menu List

**Composition:** Left 45% full-bleed image + right 55% scrollable menu list
**Source:** `image-patterns/img-d-catalog.html` D3

**Key CSS:**
- `.slide { background: #fff; flex-direction: row; align-items: stretch; }`
- Left image: `width: 45%; img { width: 100%; height: 100%; object-fit: cover; }`
- List area: `width: 55%; padding: 3.5cqw 5cqw;`
- Menu row: flex row, `img { width: 5.5cqw; height: 5.5cqw; border-radius: 0.6cqw; }` + text + price
- Divider: `border-bottom: 1px solid #F1F5F9;`

**Mood:** Best sellers, ranked menu, top picks

---

## E1 — Center Phone Mockup + Emoji Strip

**Composition:** Light bg + horizontal emoji strip behind + title + centered phone mockup
**Source:** `image-patterns/img-e-mockup.html` E1

**Key CSS:**
- `.slide { background: #F8FAFC; flex-direction: column; align-items: center; padding: 4cqw 6cqw 3cqw; }`
- Emoji strip: `position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); display: flex; gap: 3cqw; justify-content: center;`
- Emoji: `width: 10cqw; height: 10cqw; opacity: .15;`
- Phone frame: `width: 18cqw; height: 36cqw; background: #1E293B; border-radius: 2.5cqw; padding: 1cqw;`
- Notch: `width: 8cqw; height: 1.2cqw; centered top`
- Screen: `border-radius: 1.8cqw; overflow: hidden;`
- Title and phone: `z-index: 1` above emoji strip

**Mood:** Mobile app intro, app showcase

---

## E1b — Center Laptop Mockup

**Composition:** Light bg + title + centered laptop mockup (lid + hinge + base)
**Source:** `image-patterns/img-e-mockup.html` E1b

**Key CSS:**
- `.slide { background: #F8FAFC; flex-direction: column; align-items: center; padding: 4cqw 6cqw 3cqw; }`
- Lid: `width: 55cqw; height: 34cqw; background: #1E293B; border-radius: 1.2cqw 1.2cqw 0 0; padding: 1.2cqw 1.2cqw 0;`
- Screen inner: `border-radius: 0.4cqw 0.4cqw 0 0; overflow: hidden;`
- Hinge: `width: 57cqw; height: 0.4cqw; background: #94A3B8;`
- Base: `width: 62cqw; height: 1.5cqw; gradient #D1D5DB→#9CA3AF; border-radius: 0 0 0.6cqw 0.6cqw;`

**Mood:** Web platform, dashboard, SaaS intro

---

## E2 — Text + Dual Phone Mockup (Dark)

**Composition:** Dark bg + left text with feature list + right 2 phones at different heights
**Source:** `image-patterns/img-e-mockup.html` E2

**Key CSS:**
- `.slide { background: #0F172A; flex-direction: row; align-items: center; padding: 5cqw 6cqw; gap: 5cqw; }`
- `.phones { display: flex; gap: 2cqw; align-items: center; }`
- Phone: `width: 15cqw; height: 30cqw; border-radius: 2.2cqw; padding: 0.7cqw;`
- `.phone--left { transform: translateY(2cqw); }`
- `.phone--right { transform: translateY(-2cqw); }`
- Feature list: dot (0.5cqw emerald) + text, gap 0.8cqw

**Mood:** App features, multi-screen showcase, before/after screens

---

## SP-03 — Dark Quote + Full Image (Split)

**Composition:** Left 55% quote text (dark) + right 45% full-bleed image with gradient overlay
**Source:** `split-patterns/split-patterns.html` SP-03

**Key CSS:**
- `.slide { background: #111; display: flex; flex-direction: row; align-items: stretch; }`
- `.left { width: 55%; padding: 7cqw 5cqw 7cqw 6.5cqw; gap: 2.5cqw; }`
- `.quote-mark { font-size: 5cqw; color: accent; font-family: Georgia, serif; }`
- `.quote-text { font-size: 2.2cqw; font-weight: 600; color: #fff; line-height: 1.55; }`
- Author: bar(3cqw, accent) + name + role
- `.right img { width: 100%; height: 100%; object-fit: cover; }`
- `.img-overlay { background: linear-gradient(to right, #111 0%, transparent 30%); }`

**Mood:** Editorial quote, brand story, testimonial

---

## C08 — Image Left + Text Right (Split)

**Composition:** Left 45% full-bleed image + right 55% text + info items
**Source:** `center-patterns/center-07-09.html` C08

**Key CSS:**
- `.slide { display: flex; flex-direction: row; align-items: stretch; }`
- Left: `width: 45%; img { width: 100%; height: 100%; object-fit: cover; }` — no border-radius
- Right: `width: 55%; padding: 5cqw; flex-direction: column; justify-content: center;`
- Section label: 0.85cqw, accent color
- Title: 2.5cqw, bold 800, `white-space: pre-line`
- Bottom info items: 3 horizontal, emoji(2.5cqw) + number + label, divider

**Mood:** Editorial, brand story, product introduction

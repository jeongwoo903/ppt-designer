# Column (3-4 Column) Slide Pattern Library

16 verified column layout patterns. All passed Playwright screenshot QA.
Source files: `workspace/column-patterns/columns-v3.html`, `columns.html`, `columns-v2.html`, `columns-batch1~3.html`

## Shared Rules

- Slide: `justify-content: center` (vertical center default)
- Content must fill **60-80%** of slide height — if insufficient, increase font/padding
- Column gap: 2cqw between columns
- **NO flex:1** on grid/card containers
- Title↔content: min 2.5cqw gap
- Always run **Playwright screenshot QA** after generation

---

## P01 — 3-Column Icon Feature (center title)

**Layout:** Centered title + 3 columns with emoji + title + description, separated by 1px dividers
**Background:** Light (#F5F6FA)
**Use:** Feature introduction, service highlights

---

## P02 — 3-Column Accent Bar (left title)

**Layout:** Left-aligned title + 3 columns, each with colored accent bar (3px) at top
**Background:** Light (#FAFAFA)
**Use:** Channel strategy, categorized listings

---

## P03 — 4-Column KPI Cards (center title)

**Layout:** Centered title + 4 KPI cards (emoji + big number + label + change indicator)
**Background:** White
**Use:** Key metrics, quarterly performance

---

## C05 — 3-Column Team Cards

**Layout:** Centered title + 3 person cards (emoji avatar + name + role + description)
**Background:** White
**Use:** Team introduction, key members

---

## C08 — 3-Column Product + Images

**Layout:** Centered title + 3 columns with Unsplash image + product name + price + description
**Background:** Light (#FAFAFA)
**Use:** Product lineup, menu items, portfolio
**Note:** Images must share the same aspect ratio. Use `object-fit: cover` with rounded corners on light bg.

---

## C09 — 4-Column Pricing Comparison

**Layout:** Centered title + 4 thin cards, recommended column highlighted (primary bg, white text)
**Background:** Light (#F3F4F6)
**Use:** Pricing plans, service tiers, feature comparison

---

## C11 — Solid Color BG + 3 Cards + Emoji Scatter

**Layout:** Bold green bg + decorative circle + 3 white cards + scattered 3D emoji at edges
**Background:** Bold green (#059669) with lighter circle (30% opacity)
**Use:** Growth metrics, key results, impact numbers

---

## C12 — Dark Pain→Solution 3×2 Grid

**Layout:** Dark bg + 3 pain cards (glass, ✕ red) → connector → 3 solution cards (glass, ✓ green)
**Background:** Dark (#1E1E2E)
**Use:** Problem/solution mapping, pain point → solution

---

## C13 — Staggered 3-Column Cards

**Layout:** Centered title + 3 cards at different heights (center card elevated via translateY)
**Background:** Light (#EDF2F7)
**Key CSS:** Center card `transform: translateY(-2cqw)`, each card with colored accent bar top
**Use:** Value propositions, differentiation points

---

## C14 — Color Block Split + Feature List

**Layout:** Left 45% dark panel (title + description + bright pill chips) + Right 55% coral panel (feature items)
**Background:** Dark (#1A1F2E) + Coral (#F43F5E) split
**Key:** 3D emoji overlapping at the boundary between panels
**Use:** Feature introduction, product showcase

---

## C15 — 4-Column As-Is → To-Be Cards

**Layout:** Left title + 4 vertically-split cards (top: gray AS-IS, bottom: colored TO-BE)
**Background:** Light (#F3F4F6)
**Key:** Numbered badges (01-04), center-aligned text, unified TO-BE color
**Use:** UX improvement, before/after, renovation proposals

---

## C16 — News/Article Citation Grid (Asymmetric)

**Layout:** Left title + asymmetric grid (left 55% large card + right 45% two small cards stacked)
**Background:** White + blue tint (#F8FAFF)
**Key:** Source dot + date + headline + body + category chips per card
**Use:** Market analysis, news citation, trend reports

---

## C17 — Dark Card + Hashtag Chips (Target Analysis)

**Layout:** Light top (title) + dark card bottom 65% with 3 segments
**Background:** Light top + Dark (#1E293B) card
**Key:** Emoji avatar left + name/hashtags right per segment. Segment chips (MAIN/SUB/B2B), colored hashtag pills on dark bg
**Use:** Target audience, segmentation, personas

---

## C18 — Full Color BG + Overlapping Cards (Pricing)

**Layout:** Purple bg + 3 overlapping cards, center Pro card elevated
**Background:** Bold purple (#7C3AED) with decorative circle
**Key:** Card overlap (margin -1cqw), Pro card `translateY(-1.5cqw) scale(1.02)`, "추천" badge with box-shadow, emoji decoration at edges. Right card needs extra left padding.
**Use:** Pricing comparison, subscription plans

---

## C19 — Image Overlay + Need→Solution Flow

**Layout:** Unsplash photo bg + dark overlay + 3 glass need cards → connectors → 3 white solution cards
**Background:** Image + rgba(10,10,30,.78) overlay
**Key:** Glass-morphism need cards (rgba bg + border), white solution cards with ✓ icons
**Use:** Customer needs → solution, value proposition
**Caution:** Content tends to cluster at top — ensure sufficient text to balance

---

## C20 — CSS Bar Chart + KPI Grid Split

**Layout:** Left 48% CSS bar chart + right 48% 2×2 KPI card grid
**Background:** Light (#F3F4F6)
**Key:** Pure CSS vertical bars (proportional heights), one KPI card highlighted with primary bg
**Use:** Performance dashboard, quarterly report

---

## Anti-Patterns (from QA failures)

| Issue | Description |
|-------|-------------|
| Content clusters at top | Use `justify-content: center`. If still top-heavy, add more content |
| Slide only 40% filled | Increase font sizes, padding, or description text to reach 60%+ |
| Card overflow | Calculate: total card widths + gaps + padding must fit within 960px |
| Components overlap inside cards | Check badge/icon `position:absolute` doesn't collide with other elements |
| Dividers invisible | Add `align-self: stretch` for dividers inside flex containers |
| Dark slide z-index | Content must have `z-index` above `::before` overlay |
| Image aspect ratio mismatch | All images on same slide must share same aspect ratio container |

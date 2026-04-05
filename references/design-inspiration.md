# Design Inspiration

Reference patterns for when users request "diverse," "creative," or "not boring" designs.
Unlike ADR (prohibition rules), this is **"here's what you CAN do"** — possibility expansion.

Analyze designs through 4 axes: **Background · Content · Layout · Purpose**.

---

## 1. Background

### Image + Color Overlay
- **Background:** Real photo with solid color overlay (70-80% opacity)
- **Content:** White cards or light text on the overlay
- **Layout:** Top needs cards → bottom solution cards, dotted line connection
- **Purpose:** Problem/Solution, Needs & Solution, service introduction

### Solid Color + Decorative Shapes
- **Background:** Full-slide color (green, yellow, purple etc.) + large circle/blob shapes in same-hue lighter/darker tones
- **Content:** 3D emoji assets in corners to fill whitespace, data cards in center
- **Layout:** Centered title + 2-3 cards + decorative assets
- **Purpose:** Background context, data emphasis, market overview

### Color Block Split
- **Background:** Slide divided into 2-3 color blocks (dark + color + white)
- **Content:** Different content types in each block (feature list / app mockup / text)
- **Layout:** Asymmetric blocks — top-left dark card + bottom-left text + right-side full color+image
- **Purpose:** Feature introduction, product showcase, service comparison

### Full Color Background + App Mockup
- **Background:** Bold solid color (yellow, purple, blue)
- **Content:** 2-3 app screenshots overlapping for depth + label chips pointing at specific features
- **Layout:** Left-right split — left text + right mockup images
- **Purpose:** App/service introduction, home screen walkthrough, UX flow

---

## 2. Content

### Fill Whitespace with Assets
- Place 3D emoji with rotation as decorative elements in empty space
- Cards peeking beyond borders (overflow visible)
- Size: 5-8cqw, opacity 100%
- Solves the "empty slide" problem

### Pill Chips Actively
- Hashtags: `#camping #homeparty #outdoor`
- Category tags: pill groups to visualize classification
- Feature lists: emoji + text pill (bright pills on dark cards)
- Dark backgrounds → bright pills, light backgrounds → outlined pills

### Grouping via Background Cards
- Use rounded card backgrounds instead of divider lines to express group boundaries
- Sub-segments listed inside the card — logical structure readable at a glance
- Group labels as small text above the card

---

## 3. Layout

### Needs → Solution Vertical Flow
- **Background:** Image + overlay
- **Content:** Top: need cards with semi-transparent borders → dotted line → bottom: solution cards (white, check icon)
- **Layout:** Vertical 2-tier + dotted connection
- **Purpose:** Problem/Solution, value proposition

### 2-Point Side-by-Side
- **Background:** Light gray or white
- **Content:** Left/right each with title + description + bottom card (tag/category chip group)
- **Layout:** 2-column, section title + horizontal line at top
- **Purpose:** Service advantages, comparison, point summary

### Segment Grouping
- **Background:** Light gray + large rounded card at bottom
- **Content:** 3-column segments inside card + hashtag chips + descriptions
- **Layout:** Card boundary = group boundary (main group / sub group separation)
- **Purpose:** Target analysis, market segmentation, personas

### Asymmetric Block Combination
- **Background:** Dark block + color block + white
- **Content:** Dark card with feature pill list + color area with overlapping app mockups
- **Layout:** Unbalanced ratio (top-left + bottom-left / right full)
- **Purpose:** Feature introduction, product comparison, service explanation

---

## 4. Purpose → Recommended Combinations

| Purpose | Background | Content | Layout |
|---------|-----------|---------|--------|
| Problem/Solution | Image + overlay | Need → Solution cards | Vertical 2-tier flow |
| Service introduction | Color block split | App mockup + pill chips | Asymmetric blocks |
| Market background | Color + decorative shapes | Data cards + 3D assets | Center title + cards |
| Target analysis | Light gray | Segment cards + hashtags | Grouping cards |
| Feature listing | Dark + color block | Pill chip lists + emoji | Asymmetric blocks |
| App UX explanation | Full color bg | Overlapping mockups + labels | Left-right split |
| Point summary | White / light gray | Point cards + chip groups | 2-Point side-by-side |
| As-is / To-be comparison | Light gray | Numbered badge + split cards (gray top / color bottom) | 4-column cards |
| News/article citation | White / light blue | Article cards + category tag chips | Left 1 + right 2 asymmetric grid |
| Chart + KPI | Light gray | Radar/bar chart + KPI card grid | Left chart + right 2x2 cards |
| Research findings | Dark | Donut chart + speech bubble cards | Left chart + right bubble stack |
| A/B test results | Dark | Bar chart cards + delta numbers + explanation | 2-column cards |
| Decision flow | Light | Circle shapes + arrow flow | Horizontal circle flow |
| Pain → Solution | Dark | 3x2 grid (top problem / bottom solution) + connecting dots | 3-col × 2-row |
| UX strategy | Dark | Grouped cards + group labels + separator | ESSENCE + CORE wrapping |

---

## 5. Additional Patterns (Round 2)

### Staggered 3-Column Cards
- **Background:** Light blue/gray (#EDF2F7)
- **Content:** 3 cards at different vertical heights (staircase effect), each with colored title + description + abstract graphic/icon at bottom
- **Layout:** 3-column, cards offset vertically (center elevated or staircase)
- **Purpose:** Service keywords, feature categories, value propositions

### News/Article Citation Grid
- **Background:** White / light blue tint
- **Content:** Article excerpt cards (source + date + headline + body) with category tag chips at card corners
- **Layout:** Left large card (60%) + right 2 smaller cards stacked (40%) — asymmetric grid
- **Purpose:** Problem awareness, market background, press coverage, user pain points

### Dual-Persona Feature Layout
- **Background:** White with colored block sections (dark card + colored card side by side)
- **Content:** Two persona blocks — each with title + emoji pill chips listing features, plus app mockup screenshots overlapping on the colored side
- **Layout:** 2x2 grid (top-left: dark feature card, top-right: logo+label, bottom-left: text+pills, bottom-right: colored bg + overlapping mockups)
- **Purpose:** Two-sided service explanation (employer/employee, buyer/seller, etc.)

### As-Is → To-Be Comparison Cards
- **Background:** Light gray
- **Content:** N cards (3-4), each split vertically — top half gray (As-is problem) + bottom half colored (To-be solution), numbered badge at top, arrow ↓ between halves
- **Layout:** 4-column equal cards, title left-aligned above
- **Purpose:** UX improvement summary, feature comparison, before/after analysis

### Title + Staggered Feature Cards
- **Background:** Light gray
- **Content:** Left: title block + description text. Right: 3 cards at ascending heights (staircase), each with icon + subtitle + description. Cards vary in bg color (white, accent, white)
- **Layout:** Left 35% text + Right 65% staggered cards
- **Purpose:** Service introduction, feature highlights, value proposition

### Chart + KPI Card Combo
- **Background:** Light gray
- **Content:** Left: radar/spider chart or bar chart (Chart.js or pure CSS). Right: 2x2 KPI card grid — each with icon + big number + label. Some cards with colored bg (accent), others white
- **Layout:** Left 50% chart + Right 50% KPI grid
- **Purpose:** Performance dashboard, competitive analysis, survey results
- **Note:** For charts, consider Chart.js CDN (`https://cdn.jsdelivr.net/npm/chart.js`)

---

## 6. Additional Patterns (Round 3)

### Donut Chart + Speech Bubbles (Dark)
- **Background:** Dark (#1a1a2e)
- **Content:** Left: title + description + donut/ring chart (CSS `conic-gradient`) with percentage in center + source note. Right: 2 dark speech bubble cards stacked, each with category tag chip (accent color) + numbered point + description
- **Layout:** Left 45% (text + chart) + Right 55% (speech bubbles)
- **Purpose:** Survey results, user research findings, pain point analysis with data backing

### Result Data — Bar Chart Cards (Dark)
- **Background:** Dark gray (#2a2a3a)
- **Content:** 2 side-by-side dark cards, each containing: big delta number at top (+10.5%p), bar chart (2-3 bars, before/after comparison), title + highlighted metric + explanation paragraph
- **Layout:** 2-column equal cards, section label + title at top-left
- **Purpose:** A/B test results, before/after metrics, performance comparison

### Circle Flow — Decision Process
- **Background:** Light gray
- **Content:** Large circles (dark/light alternating) connected by arrows in horizontal flow. Center circles form a group wrapped by a label. Text inside each circle describes a step
- **Layout:** Horizontal flow, circles sized to content importance (outer = large, inner = medium)
- **Purpose:** Service direction, decision framework, value chain, brand positioning
- **Note:** Circle sizing and spacing are critical — equal-sized circles look mechanical

### Pain Point → Solution (Dark Grid)
- **Background:** Dark (#1e1e2e)
- **Content:** Top row: 3 pain point cards (dark glass bg, light text). Bottom row: 3 solution cards (slightly lighter glass bg, bold title + description). Small decorative accent dots between rows connecting pain → solution
- **Layout:** 3-column × 2-row grid with section labels
- **Purpose:** Problem/solution mapping, service direction, feature justification

### Narrative Journey (Dark + Accent Wave)
- **Background:** Dark with gradient wave/curve at bottom (accent color, e.g. orange/coral)
- **Content:** Top-left: section label + large title. Center-right: accent-colored callout badge + speech bubble with quote. Hashtag chips scattered. Bottom: subtle wave gradient
- **Layout:** Asymmetric — title top-left, callout center-right, wave bottom
- **Purpose:** Brand story, user journey moment, case study highlight
- **Note:** Wave implemented via `border-radius` or `clip-path` on a colored div

### Strategy + Core Wrapping
- **Background:** Dark (#1a1a2e)
- **Content:** Top: centered title + bilingual description. Bottom: grouped cards — left group ("ESSENCE") has 3 cards with emoji/icon + title + subtitle + description. Right group ("CORE") has 1 card, separated by a `+` symbol. All cards have subtle dark glass bg
- **Layout:** Center title + bottom card group with visible grouping labels
- **Purpose:** UX strategy, core value proposition, strategic framework
- **Note:** Group labels above card groups with + separator create clear logical structure

---

## 7. Data Visualization Patterns (Round 4)

CSS-only charts and graphs for data-driven slides. No external chart libraries needed.

### Gauge / Semi-circle Chart
- **Background:** Light or dark
- **Content:** Semi-circle arc (CSS `conic-gradient` + `border-radius` clipping or SVG arc), filled portion in accent color, unfilled in muted gray. Center: big number + unit + optional emoji icon. Below: subtitle/rank text
- **Layout:** Centered gauge + bottom text, or left text + right gauge
- **Purpose:** Score, rating, completion %, health index, credit score
- **CSS:** `conic-gradient` with `clip-path` or rotated half-circle technique. Track: ~6cqw thick arc stroke

### Multi-ring Chart (Nested Circles)
- **Background:** Dark preferred
- **Content:** 2-3 concentric circle arcs, each a different color and fill percentage. Center: total value. Each ring represents a different metric (e.g., protein/carbs/fat)
- **Layout:** Centered rings + side legend, or centered with labels inline
- **Purpose:** Multi-metric dashboard, nutrient breakdown, multi-KPI at a glance
- **CSS:** Multiple `conic-gradient` circles layered with decreasing sizes, transparent centers

### Growth Curve / Line Chart
- **Background:** Dark
- **Content:** Two curves — baseline (dashed, muted) vs. result (solid, accent color with glow). Key point annotated with dot + tooltip label. Below chart: KPI summary cards in a row
- **Layout:** Top title + center chart area + bottom KPI strip
- **Purpose:** Before/after performance, ad effectiveness, growth trajectory
- **CSS:** SVG `<path>` for curves, CSS for labels/tooltips. Use `fill: none; stroke` for lines

### Vertical Bar Comparison Cards
- **Background:** Dark
- **Content:** 2 side-by-side dark cards, each containing: title + subtitle + big number + single vertical bar (rounded-top). Bars at different heights for visual comparison. Optional: dotted line connecting the two bar tops
- **Layout:** 2-column cards, equal width
- **Purpose:** Revenue comparison, before/after metric, plan tier comparison
- **CSS:** Bars are simple `div` with fixed width, variable height, `border-radius` top

### Simple Pie Chart (2-segment)
- **Background:** Dark
- **Content:** Full circle, 2 segments only (dominant + remainder). Dominant segment labeled directly on the chart with large % text. No separate legend needed
- **Layout:** Centered pie + top title + optional bottom source
- **Purpose:** Survey results, yes/no ratio, market share (dominant player)
- **CSS:** `conic-gradient(accent 0% N%, muted N% 100%); border-radius: 50%`

---

## Color Principles

- **Be bold with solid backgrounds** — green, yellow, purple, coral
- **Dark background + bright cards** — contrast makes content pop
- **Same-hue value variation** — bg green + shape dark-green + text white
- **Don't stick to gray** — #F5F6FA is safe but boring. Use color when user wants diversity

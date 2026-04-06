# Visual Element Patterns

Pictogram, diagram, and chart patterns for data-driven slides. Source: `visual-patterns/`

Shared layout tokens: see `_layout-tokens.md`

---

## F1 — Icon + Description Row (3 col)

**Composition:** Centered title + 3 columns, each with icon box + name + description
**Source:** `visual-patterns/vis-f-pictogram.html` F1

**Key CSS:**
- `.slide { background: #fff; background-image: radial-gradient(circle, #E2E8F0 0.8px, transparent 0.8px); background-size: 2.5cqw 2.5cqw; flex-direction: column; align-items: center; justify-content: center; padding: 4cqw 10cqw; }`
- Title block: center aligned, margin-bottom 4.5cqw
- Columns: `display: flex; gap: 4cqw;`
- Each col: `max-width: 19cqw; text-align: center;`
- Icon box: 7cqw × 7cqw, #EEF2FF bg, rounded 1.5cqw, emoji 4.5cqw inside
- Name: 1.2cqw bold, desc: 0.95cqw muted
- Dot grid background fills whitespace

**Mood:** Service features, core values, key benefits

---

## F2 — Large Icon + Text Stack (Dark)

**Composition:** Left large icon box + right text area with title, desc, KPI highlights
**Source:** `visual-patterns/vis-f-pictogram.html` F2

**Key CSS:**
- `.slide { background: #0F172A; flex-direction: row; align-items: center; padding: 5cqw 6cqw 5cqw 11cqw; gap: 5cqw; }`
- Icon area: 22cqw × 22cqw, `rgba(99,102,241,.1)` bg, rounded 3cqw, emoji 12cqw
- Title: 2.5cqw white, desc: 1.1cqw white 50%
- Highlights row: flex, gap 3cqw, each with big number (2cqw, accent) + label (0.85cqw, muted)

**Mood:** Single feature deep-dive, core technology, key differentiator

---

## F4 — Before/After Icon Comparison

**Composition:** Centered title + two side cards (Before/After) with emoji + value + label, arrow between
**Source:** `visual-patterns/vis-f4-g1g2.html` F4

**Key CSS:**
- `.slide { background: #F8FAFC; flex-direction: column; align-items: center; justify-content: center; padding: 4cqw 5cqw; }`
- Title block: center aligned
- Compare: `display: flex; gap: 2cqw;`
- Side cards: `flex: 1; border-radius: 1cqw; padding: 3cqw 10cqw 3cqw 4cqw;`
- Before: bg #F1F5F9, label/val color #64748B/#475569
- After: bg #EEF2FF, label/val color #6366F1/#4F46E5
- Each item: emoji (3.5cqw) + value (1.3cqw bold) + label (0.85cqw)
- Arrow column: 4cqw wide, SVG arrow (stroke #6366F1)

**Mood:** Impact comparison, before/after metrics, improvement showcase

---

## G1 — Venn Diagram (2 circles)

**Composition:** Centered title + two overlapping circles with labels + intersection label
**Source:** `visual-patterns/vis-f4-g1g2.html` G1

**Key CSS:**
- `.slide { background: #fff; flex-direction: column; align-items: center; justify-content: center; padding: 3cqw 5cqw; }`
- Venn container: `position: relative; width: 60cqw; height: 32cqw;`
- Circle: 28cqw × 28cqw, rounded 50%, semi-transparent fill + border
- Circle A: `left: 6cqw;` indigo tones
- Circle B: `right: 6cqw;` emerald tones
- Intersection label: absolute centered, bold title + muted desc

**Mood:** Positioning, synergy, overlap analysis, value intersection

---

## G3 — Concentric Circles (Target)

**Composition:** Left text area + right concentric circles + bottom insight card strip
**Source:** `visual-patterns/vis-g3g4-h1.html` G3, `yumi-cells/chart-dense-test.html` V1

**Key CSS:**
- `.slide { flex-direction: column; }`
- `.main-area { flex: 1; flex-direction: row; align-items: center; justify-content: center; padding: 3cqw 10cqw 1cqw; gap: 4cqw; }`
- Text area: `width: 32%;`
- Target area: `flex: 0.8; position: relative; height: 32cqw;`
- Ring 3 (outer): 30cqw, Ring 2 (mid): 20cqw, Ring 1 (core): 11cqw
- Labels positioned between rings: `top: calc(50% - Ncqw)`
- **Insight strip** (bottom): `display: flex; gap: 1.5cqw; padding: 0 10cqw 5cqw;`
- Insight card: card-bg, rounded 0.8cqw, emoji (3cqw) + title (0.95cqw bold) + desc (0.8cqw muted)
- Main area and insight strip share same left/right padding (10cqw) for visual alignment

**Mood:** Target audience, expansion strategy, core → growth → potential

---

## H1 — Donut Chart + Side Legend

**Composition:** Left title + center (donut + legend as one wrapper) + bottom KPI strip
**Source:** `visual-patterns/vis-g3g4-h1.html` H1, `yumi-cells/chart-dense-test.html` V3

**Key CSS:**
- `.slide { background: #111827; flex-direction: column; }`
- `.main-area { flex: 1; flex-direction: row; align-items: center; justify-content: center; padding: 3cqw 10cqw 0 3cqw; gap: 5cqw; }`
- Left side: `width: 28%;` — label + title (white) + desc (muted)
- `.chart-wrap { display: flex; align-items: center; gap: 3cqw; }` — donut + legend as single unit
- Donut: SVG `viewBox="0 0 200 200"`, `r="80"`, `stroke-width="18"`, no linecap round
- Segments drawn as separate circles with `stroke-dasharray` + `transform: rotate()`
- Center: absolute positioned value + label
- Legend: color bar (0.35cqw × 3cqw) + label (0.85cqw muted) + value (1.3cqw bold white)
- **KPI strip** (bottom): `display: flex; gap: 1.5cqw; padding: 0 14cqw 7cqw;`
- KPI card: glass bg `rgba(255,255,255,.05)`, emoji (2.5cqw) + value (1.3cqw bold) + label (0.75cqw)

**Mood:** Market share, budget allocation, campaign performance

---

## H2 — Horizontal Bar Chart

**Composition:** Top title block (with desc) + bottom [bar chart | insight panel]
**Source:** `visual-patterns/vis-h2h3h4.html` H2, `yumi-cells/chart-dense-test.html` V2

**Key CSS:**
- `.slide { background: #fff; flex-direction: column; justify-content: center; padding: 5cqw 10cqw; }`
- Title block: `margin-bottom: 5cqw;` — label + title + desc (1cqw, margin-top 1cqw)
- `.body-area { display: flex; gap: 3cqw; align-items: center; }`
- Bar rows: label (10cqw **left-aligned**) + track (#F1F5F9, 2.2cqw height, rounded) + value
- Bar fill: inline `width` + `background` color via style attribute
- **Insight panel** (right): `width: 24cqw; padding-left: 2.5cqw; border-left: 1px solid #E2E8F0;`
- Insight items: dot (0.5cqw primary) + text (0.85cqw) with `<strong>` highlights
- Bar labels left-aligned to visually align with title above

**Mood:** Channel strategy, benchmark, performance comparison

---

## H3 — Progress Bars (Dark, Multi-color)

**Composition:** Title block + multiple progress rows, each with different color
**Source:** `visual-patterns/vis-h2h3h4.html` H3

**Key CSS:**
- `.slide { background: #0F172A; flex-direction: column; justify-content: center; padding: 4cqw 6cqw; }`
- Progress row: name (1.05cqw white) + pct (1.05cqw, colored via inline style)
- Track: `height: 1.2cqw; background: rgba(255,255,255,.08); border-radius: 0.6cqw;`
- Fill: `border-radius: 0.6cqw;` — color set via inline style
- Each bar a different color: emerald, indigo, amber, pink, sky

**Mood:** Project progress, milestone tracking, skill assessment

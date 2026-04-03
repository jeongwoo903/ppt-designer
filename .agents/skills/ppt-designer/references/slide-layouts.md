# Slide Layout Patterns

Layout patterns for 16:9 slides (10" x 5.625"). All coordinates in inches.
These patterns are derived from high-quality human-designed Korean presentation references.

## Shared Constants

```
MARGIN_X = 0.55          // left & right — use the width
MARGIN_TOP = 0.5         // top
MARGIN_BOT = 0.5         // bottom
CONTENT_W = 8.9          // 10 - 0.55*2
CONTENT_TOP = 1.4        // below title block
CONTENT_BOT = 5.125      // 5.625 - 0.5
CONTENT_H = 3.725        // CONTENT_BOT - CONTENT_TOP
TITLE_X = 0.55           // title text left edge = same as margin
PAGE_NUM_Y = 5.15        // page number baseline
COL_GAP = 0.3            // gap between columns
```

## Title Block (shared across most layouts)

Every content slide has a consistent title block. NO vertical accent bar before titles.

```
// Section label (optional — small colored text above title)
{ text: "01. 마케팅 전략", x: 0.55, y: 0.4, w: 4.0, h: 0.25,
  fontSize: 9, bold: true, color: primary }

// Slide title (NO accent bar)
{ text: "Title", x: 0.55, y: 0.6, w: 8.0, h: 0.45,
  fontSize: 24, bold: true, color: text-primary }

// Subtitle / description (optional)
{ text: "Subtitle", x: 0.55, y: 1.05, w: 8.0, h: 0.25,
  fontSize: 11, color: text-muted }

// Page number
{ text: "05 / 14", x: 8.5, y: 5.15, w: 1.0, h: 0.3,
  fontSize: 9, color: text-muted, align: "right" }
```

---

## Layout A: Full-Width Content

Full-width content area. Use for tables, timelines, or single-topic detail.
Prefer flat layout (text + dividers) over a card wrapper.

```
┌──────────────────────────────────────┐
│  Title                          5/14 │
│  Subtitle                            │
│                                      │
│  ─────────────────────────────────── │
│  Content area (table, list, etc.)    │
│                                      │
│  ─────────────────────────────────── │
└──────────────────────────────────────┘

Content area: { x: 0.55, y: 1.4, w: 8.9, h: 3.725 }
Use thin divider lines (0.5pt, text-muted color) to separate rows/sections
```

---

## Layout B: Two-Column (Text + Visual)

Left side text, right side image/screenshot/diagram.
Left column gets 35-40% width, right column 55-60%.

```
┌──────────────────────────────────────┐
│  Section label                  7/14 │
│  Title                               │
│  Subtitle                            │
│                                      │
│  Big statement        ┌────────────┐ │
│  headline             │            │ │
│                       │   Visual   │ │
│  Body text            │  (image,   │ │
│  explaining the       │   mockup)  │ │
│  concept...           │            │ │
│                       └────────────┘ │
└──────────────────────────────────────┘

Left text block:
  Section: { x: 0.55, y: 1.4, w: 3.8, h: 0.2, fontSize: 9, color: primary }
  Headline: { x: 0.55, y: 1.7, w: 3.8, h: 0.8, fontSize: 20, bold }
  Body:  { x: 0.55, y: 2.6, w: 3.8, h: 2.0, fontSize: 12 }

Right visual:
  Image: { x: 4.85, y: 1.4, w: 4.6, h: 3.725 }
```

---

## Layout C: Three-Column Content

Three equal-width columns. Good for comparisons, channel breakdowns, feature lists.
Use thin vertical dividers or spacing to separate — NOT card wrappers.

```
┌──────────────────────────────────────┐
│  Title                         13/14 │
│  Subtitle                            │
│                                      │
│  Header 1     │ Header 2    │ Header │
│  Body text    │ Body text   │ Body   │
│  · item       │ · item      │ · item │
│  · item       │ · item      │ · item │
│  · item       │ · item      │ · item │
│               │             │        │
└──────────────────────────────────────┘

Column width: (8.9 - 0.3*2) / 3 = 2.767"
Col 1: x = 0.55
Col 2: x = 3.617
Col 3: x = 6.684

Divider lines (optional):
  { shape: LINE, x: 3.317, y: 1.6, w: 0, h: 3.2,
    line: { color: divider, width: 0.5 } }

Each column structure:
  Header: { x: col.x, fontSize: 16, bold }
  Subtext: { x: col.x, fontSize: 10, color: text-muted }
  Items: { x: col.x, fontSize: 11 }
  Item spacing: 0.35" per item
```

---

## Layout D: Two-Column Cards

Two equal cards side by side. Good for Problem/Solution, Before/After, comparisons.

```
┌──────────────────────────────────────┐
│ ▎ Title                         5/14 │
│   Subtitle                           │
│ ┌────────────────┐ ┌────────────────┐│
│ │  ① Card Left   │ │  ② Card Right  ││
│ │                │ │                ││
│ │  Content       │ │  Content       ││
│ │                │ │                ││
│ └────────────────┘ └────────────────┘│
└──────────────────────────────────────┘

Card width: (8.6 - 0.3) / 2 = 4.15"
Card 1: { x: 0.70, y: 1.55, w: 4.15, h: 3.525 }
Card 2: { x: 5.15, y: 1.55, w: 4.15, h: 3.525 }
```

---

## Layout E: KPI / Metrics Grid

2x3 or 3x2 grid. Each cell: label + number + annotation.
Use subtle background fills or thin borders to define cells — not heavy card shadows.

```
┌──────────────────────────────────────┐
│  Title                         12/14 │
│  Subtitle                            │
│                                      │
│  Label       Label       Label       │
│  48,200명    3.8%        ₩42,000     │
│  +12.4%      +0.5%p     -8.3%       │
│  ─────────── ─────────── ─────────── │
│  Label       Label       Label       │
│  ₩580,000   ₩2.4억      72점        │
│  +15.2%      +8.1%      +4          │
│                                      │
└──────────────────────────────────────┘

Grid: 3 cols x 2 rows
Cell w: 2.767"
Row gap: 0.3"

Row 1 cells y: 1.4
Row 2 cells y: 3.3

Each cell internal:
  Label:  { fontSize: 10, color: text-muted, y: cell.y + 0.1 }
  Number: { fontSize: 26, bold, color: text-primary, y: cell.y + 0.35 }
  Change: { fontSize: 10, color: accent (green/red), y: cell.y + 0.9 }
  Divider line: { y: cell.y + 1.1, w: cell.w - 0.3,
            line: { color: divider, width: 0.5 } }
```

---

## Layout F: Cover Slide (Dark)

Full-bleed dark background. Title centered or left-aligned with key metrics.

```
┌──────────────────────────────────────┐
│ CATEGORY / CONTEXT           ┌─────┐│
│                              │     ││
│ ┌─Tag──┐                    │Chart││
│ Big Title                    │  or ││
│ in 2-3 lines                 │Image││
│                              │     ││
│ Supporting description       └─────┘│
│                                      │
│ ┌─────┐ ┌─────┐ ┌─────┐            │
│ │Stat1│ │Stat2│ │Stat3│            │
│ └─────┘ └─────┘ └─────┘            │
│ Footer text                     01  │
└──────────────────────────────────────┘

Background: dark color (e.g., "1A1A2E" or from palette)

Top label: { x: 0.7, y: 0.45, fontSize: 10, color: on-overlay-muted }
Tag pill:  { x: 0.7, y: 1.1, w: auto, h: 0.32, fill: accent }
Title:     { x: 0.7, y: 1.55, w: 5.0, h: 1.2, fontSize: 32,
             bold, color: "FFFFFF" }
Desc:      { x: 0.7, y: 2.9, w: 5.0, fontSize: 13, color: on-overlay }

Right visual: { x: 5.8, y: 0.8, w: 3.8, h: 3.5 }

Stat cards (bottom):
  Card w: 1.6", h: 0.7"
  y: 4.0
  x: 0.7, 2.5, 4.3 (with 0.2" gap)
  Label: fontSize 9, color: on-overlay-muted
  Value: fontSize 20, bold, color: accent
  Note:  fontSize 9, color: on-overlay-muted
```

---

## Layout G: Section Divider

Minimal slide that marks a new section. Dark or colored background.

```
┌──────────────────────────────────────┐
│                                      │
│                                      │
│          Section Number              │
│          Section Title               │
│          Brief description           │
│                                      │
│                                      │
└──────────────────────────────────────┘

Background: primary color or dark
Section num: { x: 0.7, y: 1.8, fontSize: 14, color: accent or muted }
Title:       { x: 0.7, y: 2.2, w: 8.6, fontSize: 32, bold, color: "FFFFFF" }
Desc:        { x: 0.7, y: 3.0, w: 6.0, fontSize: 14, color: on-overlay }
```

---

## Layout H: Problem → Solution Flow (Vertical)

Dark background. Stacked blocks showing flow with a connecting element.

```
┌──────────────────────────────────────┐
│  Category tag                        │
│  Title                               │
│                                      │
│  ┌──────────────────────────────┐    │
│  │ Problem  (darker card)       │    │
│  └──────────────┬───────────────┘    │
│                 │                    │
│  ┌──────────────┴───────────────┐    │
│  │ Solution (accent-colored)    │    │
│  └──────────────┬───────────────┘    │
│                 │                    │
│  ┌──────────────┴───────────────┐    │
│  │ Goal     (darker card)       │    │
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘

Background: dark
Block width: 7.6" (centered: x = 1.2)
Block height: 0.7" each
Gap between blocks: 0.3" (including connector)

Labels ("Problem", "Solution", "Goal"):
  x: 0.7, colored in accent/secondary
  fontSize: 13, bold

Block content: centered text, fontSize: 14
Problem fill: slightly lighter than bg (e.g., neutral-800)
Solution fill: accent/primary color
Goal fill: same as problem
```

---

## Usage Notes

1. **Never use all layouts in one deck.** Pick 3-4 that match your content.
2. **Cover (F) and Section Divider (G) should use dark backgrounds** when the rest of the deck is light. This creates the "sandwich" rhythm.
3. **Three-Column (C) is easy to mess up.** If content per column exceeds 5-6 items, switch to Layout A with a table or Layout D with two columns.
4. **Always recalculate** when content volume changes. If you have 4 items instead of 3, don't squeeze — switch to a 2x2 grid or 2-column layout.
5. **The coordinates above are starting points.** Adjust y-positions based on actual content height, but never violate the margin constants.

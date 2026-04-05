---
name: ppt-designer
description: >-
  PPT/발표자료/슬라이드/제안서 제작 스킬. Use this skill for any request to create, build,
  design, or remake a slide deck, presentation, pitch deck, or proposal — in any language.
  Trigger on: PPT 만들어줘, 발표자료 구성해줘, 다시 만들어줘 (for presentations),
  슬라이드 만들어줘, 제안서 제작, pitch deck, converting PDF/text/notes into slides,
  or redesigning an existing deck from scratch. Produces HTML slides + PDF as primary output,
  with optional PPTX. Professional moodboard-driven design. Do NOT use for editing one slide in an
  existing file, text extraction from PPT, font swaps, standalone charts/infographics, or OCR.
---

# PPT Designer

A presentation design skill that produces human-designer-level slides by building a design system from the user's moodboard before generating anything.

The core insight: AI-generated slides fail because they skip the design system step. They jump straight to layout with generic tokens, producing slides that "look AI." This skill forces the right order: **moodboard → design tokens → layout patterns → slides.**

## Workflow

### Phase 1: Moodboard Collection

Before writing any code, collect the user's design direction. Ask for:

1. **Reference images** — Screenshots of slides, websites, or designs they like. Even 1-2 images drastically improve output quality.
2. **Mood keywords** — e.g., "minimal," "corporate," "warm," "bold," "premium"
3. **Color direction** — Preferred palette, brand colors, or "like this reference"
4. **Content type** — Strategy proposal, investor pitch, internal report, lecture, etc.

If the user provides no references at all, ask once: "Do you have any slide designs or websites you like as reference? Even a screenshot helps a lot." If they say no, proceed with a curated default palette matched to the content type.

Do NOT proceed to slide creation until you have at least mood keywords or a color direction.

### Phase 2: Design Token Extraction

From the moodboard, define these tokens before writing any slide code:

```
DESIGN TOKENS
─────────────────────────────
Palette
  primary:     (main accent — buttons, titles, highlights)
  secondary:   (supporting — subtitles, tags)
  bg-main:     (slide background — usually near-white or dark)
  bg-card:     (card/component background)
  text-primary: (headings)
  text-body:    (body copy)
  text-muted:   (captions, labels)
  accent:       (sparingly — callouts, badges)

Typography
  heading-font:  (e.g., "Pretendard" for KR, "Arial" for EN)
  body-font:     (same family or complementary)
  → See references/korean-typography.md for size/spacing rules

Spacing (inches, based on 10" × 5.625" canvas)
  slide-margin-x:  0.55
  slide-margin-top: 0.5
  slide-margin-bot: 0.5
  section-gap:      0.35
  component-gap:    0.2
  column-gap:       0.3

Shape
  card-radius:  0.08
  tag-radius:   0.5

Shadow (for cards — use sparingly)
  type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.06
```

Present these tokens to the user for confirmation before proceeding. This is the single most important step.

### Phase 3: Slide Structure Planning

Plan the slide deck structure before coding. For each slide, decide:
- **Layout pattern** (see references/slide-layouts.md)
- **Content hierarchy** — what's the ONE thing the audience should take away?
- **Visual elements** — what supports the message? (chart, image, icon, comparison)

Vary layouts across the deck. Never repeat the same layout pattern more than twice consecutively.

Apply the "sandwich" structure for deck-level rhythm:
- Dark or bold slides for: cover, section dividers, conclusion
- Light slides for: content, data, details

### Phase 3.5: User Review (Required)

Present the slide structure to the user in table format (slide number, layout, content) and ask:

- Any slides to modify?
- Any content to add?
- Any slides to remove?

Proceed to Phase 4 only after user confirms. Never generate without confirmation.

### Phase 4: Slide Generation (HTML)

Primary output is a single HTML file containing only slide content. Interactivity is handled by external scripts — **do NOT inline presenter or editor code into the HTML.**

**HTML Structure:**
```html
<body>
  <div class="frames">
    <div class="page-header">Title · 1 / N</div>
    <div class="frame" data-slide="0">
      <div class="viewport">
        <div class="slide s1">
          ...content (all cqw units)...
        </div>
      </div>
    </div>
    ...repeat per slide...
  </div>
  <script src="https://static.kid-o.cloud/ppt-designer/scripts/presenter.js"></script>
  <script src="https://static.kid-o.cloud/ppt-designer/scripts/editor.js"></script>
</body>
```

**Critical CSS Rules:**
- `.viewport`: `container-type: inline-size; width: 960px; height: 540px;` — explicit height, NOT aspect-ratio (ADR-018)
- `.slide`: `position: absolute; inset: 0; width: 100%; height: 100%;`
- ALL sizing in `cqw` units (1px ≈ 0.104cqw at 960px basis)
- Title: 2.3-2.5cqw / Body: 1.3-1.4cqw / Caption: 1.0cqw / Emoji: 2.5-5cqw
- No `flex: 1` on grid/card containers — cards stretch to fill the entire slide (ADR-019)
- No `flex: 1` on images — use `max-height` instead
- Slides with sparse content: `justify-content: center` on the slide itself
- Title block ↔ first content: minimum `2cqw` gap (ADR-020)
- Code blocks: `white-space: pre` required (ADR-021)
- Status labels (Before/After, Phase 01 etc.): chip/pill shape allowed (ADR-022)

**Mixed-Style Text — Span Separation Rule:**

For editor.js to select and modify individual parts, **always separate text into `<span>` when styles may differ:**

| Pattern | Correct | Wrong |
|---------|---------|-------|
| Number + unit | `<span>48,200</span><span>명</span>` | `48,200명` |
| Currency | `<span>₩4.2</span><span>억</span>` | `₩4.2억` |
| Percentage | `<span>142</span><span>%</span>` | `142%` |

Applies to: KPI numbers, prices, statistics, cover stats. Pure text without number/unit mix does not need separation.

**External Scripts (CDN — always use absolute paths, never regenerate):**
- `https://static.kid-o.cloud/ppt-designer/scripts/presenter.js`
- `https://static.kid-o.cloud/ppt-designer/scripts/editor.js`

**3D Emoji (CDN):**
```
https://static.kid-o.cloud/ppt-designer/emoji/{category}--{name}.png
```
See `references/emoji-cdn.md` for category list and frequently used emoji.
Do NOT download emoji locally — use CDN URLs directly in `<img>` tags.

**Emoji URL Verification (Required — ADR-023):**
After HTML generation, verify all emoji URLs with curl:
```bash
grep -o 'static.kid-o.cloud/ppt-designer/emoji/[^"]*' output.html | sort -u | while read url; do
  code=$(curl -so /dev/null -w "%{http_code}" "https://$url")
  [ "$code" != "200" ] && echo "BROKEN: $url"
done
```
If 404, find the correct filename in `references/emoji-index.json`.

**Common Wrong Category Names:**
| Wrong | Correct |
|:---:|:---:|
| `smileys-emotion` | `smilies` |
| `symbols--sparkles` | `activities--sparkles` |
| `travel-places` | `travel-and-places` |
| `smilies--brain` | `hand-gestures--brain` |
| `symbols--chart-decreasing` | `objects--chart-decreasing` |
| `symbols--muted-speaker` | `objects--muted-speaker` |

**Unsplash Images:**
Use URLs directly: `https://images.unsplash.com/photo-xxx?w=800`
Do NOT download locally.

**Watermark:** presenter.js automatically injects `<meta name="author" content="Jeongwoo">` and `<!-- Made by Jeongwoo -->`.

For every slide, enforce the spacing rules from Phase 2. These are non-negotiable minimums — content must fit within these margins, not the other way around.

Read references/korean-typography.md for Korean text rules.
Read references/slide-layouts.md for layout pattern coordinates.

#### PptxGenJS Micro-Rules

Specific code-level rules for PPTX output (secondary):

- Bullet indent: `{ indent: 10 }`, not default (~20pt)
- Card padding: minimum 0.25" all sides (0.3" preferred)
- Section gaps: title→content 0.3", description→table 0.35", quote→attribution 0.15"
- Flow steps: wrap in ROUNDED_RECTANGLE, connect with arrows
- Image validation: check file exists and size > 1KB before embedding
- Image sizing: always `{ type: 'cover', w: W, h: H }`
- Multiple images: same aspect ratio container
- Light bg: rounded images OK, no border. Dark bg: sharp rectangles only
- NEVER: decorative images on data slides, borders on images, image shadows on dark bg

### Phase 4.5: PDF Export (Required)

After HTML generation, always export PDF:

```bash
python3 scripts/export-pdf.py <input.html> <output.pdf>
```
Requires: playwright, Pillow (Python 3.12+). Captures at 2x resolution → 300 DPI PDF.

### Phase 5: Playwright Screenshot QA (Required)

After generating HTML slides, **always** capture each slide as a screenshot using Playwright and visually verify the result. This step catches layout breakage, overflow, and spacing imbalance before delivery — **significantly improving output quality**.

```python
# Capture each .viewport individually
from playwright.async_api import async_playwright
page = await browser.new_page(viewport={'width': 960, 'height': 540}, device_scale_factor=2)
viewports = await page.query_selector_all('.viewport')
for i, vp in enumerate(viewports):
    await vp.screenshot(path=f'qa-slide-{i+1}.png', type='png')
```

**QA Checklist (verify each captured image):**
1. Content fills 60-80% of the slide with balanced top/bottom margins? (fail if 40%+ is empty)
2. No overflow? (all elements stay within the 960×540 viewport)
3. No overlapping components inside cards?
4. Sufficient text contrast on dark slides?
5. All emoji loaded correctly? (no broken images)

Fix any failing slides and re-capture. Repeat until all pass.

---

## Anti-Patterns — Things That Make Slides "Look AI"

### 1. Vertical Accent Bar Before Titles
DO NOT put a vertical `|` line to the left of slide titles. This is the #1 hallmark of AI-generated slides. Use a small colored section label above the title instead.

### 2. No Bottom Margin
Always maintain at least 0.55" from the bottom. If content doesn't fit, reduce content — don't sacrifice margins.

### 3. Korean Text Too Large
- Title: 22-26pt (NOT 28-36pt) — Korean characters are visually denser
- Body: 11-13pt
- font-weight: 800 (NOT 900 — 900 causes Korean glyphs to blob) (ADR-024)
- letter-spacing: -0.02em (default 0 makes Korean look too spread) (ADR-024)

### 4. Mechanical Grid Distribution
Leave intentional empty space. Not every inch needs content. Asymmetry > symmetry.

### 5. Sections Crammed Together
Minimum 0.3" gap between columns. Use subtle dividers OR generous spacing — not both.

### 6. Inconsistent Component Padding
Top padding must match bottom padding. Top-heavy or bottom-heavy components look broken.

### 7. Meaninglessly Large Numbers
KPI numbers: 24-28pt is sufficient. Size should reflect hierarchy, not fill space.

### 8. Accent Lines Under Titles
No horizontal lines under slide titles.

### 9. Overusing Cards and Chips
Cards only when each contains **different types of content**. Prefer flat layouts with text hierarchy.

Chip/pill & emoji placement guidelines:
- Chip rotate: -8° to +8° — subtle tilt, never extreme
- Chip position: near card edges, "peeking out" effect
- Distribute evenly across all sides — no clustering
- Emoji at card boundaries: `bottom: -1cqw; right: -1.5cqw` offset
- Container: `overflow: visible` or emoji with `position: absolute`

### 10. Generic Color Application
Don't default to blue. Use the moodboard palette consistently.
- Avoid desaturated/muddy colors as primary — slides look depressing (ADR-026)
- On dark backgrounds, accent colors must be bright and vivid

### 11. UI Element Overlap
No overlapping elements. Check text bounds, shape clearance, icon spacing.

### 12. Poor Alignment Consistency
All left-aligned elements on a slide share the same x-position.

### 13. Ignoring Content Density
Heavy-content slides: scale down font sizes and increase line spacing proportionally.

---

## Section Labels

Small colored text labels above titles — NOT pill-shaped tags:
- "Problem" / "Solution" / "Hypothesis" etc.
- 9-10pt, primary or accent color, no background shape
- Left-aligned above the title. Max 1 per slide.

---

## Icons and Visual Elements

### Microsoft Fluent Emoji 3D (Recommended)
CDN: `https://static.kid-o.cloud/ppt-designer/emoji/{category}--{name}.png`
Sizes: 0.4-0.6" inline, 0.8-1.2" feature highlights.

### react-icons (Alternative)
For minimalist/corporate mood. Render to PNG via sharp.

### Guidelines
- 1-3 icons per slide max, consistent size
- Icons support text, not replace it
- Inside cards: center icon as visual anchor

---

## Design Philosophy

- **Flat layouts over cards** — text hierarchy creates structure
- **Generous whitespace** — 30-40% of slide empty
- **Text + thin divider lines** — most common Korean slide pattern
- **Images when relevant** — a well-placed photo beats any card layout
- **Consistent left alignment** — everything shares the same left margin

### Content-First Layout Selection

Choose layout based on content, never trim content to fit layout.

| Content Volume | Layout |
|---------------|--------|
| 1 key message | Full-width quote or single big number (see center-content.md) |
| 2-3 items | 2-column, Before/After |
| 4-6 items | Grid, 3-column |
| 7+ items | Table, or split across 2 slides |
| Long text | Text + Visual (left text / right image) |
| Code | 2-column (left explanation / right code block) |
| Process | Horizontal flow (max 4 steps) |

### Layout Variety Through Content Variation

Varying content composition within proven layouts is more effective and safer than inventing complex new layouts.

For creative/diverse design requests, see `references/design-inspiration.md` (background, content, layout, purpose — 4-axis analysis).

---

## Reference Files

**Design Rules:**
- `references/adr.md` — Architecture Decision Records (25+ decisions with rationale)
- `references/korean-typography.md` — Korean text sizing, spacing, font selection
- `references/slide-layouts.md` — Layout coordinate patterns

**Pattern Library:**
- `references/patterns/cover.md` — Cover slides (8 patterns)
- `references/patterns/table.md` — Table slides (3 patterns + base tokens)
- `references/patterns/split.md` — Split layouts: cards, code (6 patterns)
- `references/patterns/timeline.md` — Timeline / process flow (6 patterns)
- `references/patterns/column.md` — Column, grid & list layouts (20+ patterns)
- `references/patterns/center-content.md` — Center content: dividers, big numbers, quotes, CTA (13 patterns)
- `references/patterns/image.md` — Image layouts: wide band, portrait, cutout/product, menu/catalog, device mockup (15 patterns)
- `references/patterns/visual.md` — Visual elements: pictogram, diagram, chart (8 patterns)
- `references/patterns/_layout-tokens.md` — Shared layout tokens

**Inspiration:**
- `references/design-inspiration.md` — Creative design ideas (background, content, layout, purpose)

**Assets:**
- `references/emoji-cdn.md` — 3D emoji CDN reference + frequently used emoji mapping
- `references/emoji-index.json` — Full index of 3,054 emojis

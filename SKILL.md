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
  slide-margin-x:  0.55   (left/right — use more of the page width)
  slide-margin-top: 0.5   (top breathing room)
  slide-margin-bot: 0.5   (bottom breathing room)
  section-gap:      0.35  (between major content blocks)
  component-gap:    0.2   (within a component)
  column-gap:       0.3   (between columns in multi-col layout)

Shape (use sparingly — prefer flat layouts over cards)
  card-radius:  0.08  (subtle rounding, only when cards are needed)
  tag-radius:   0.5   (pill shape for tags/badges — max 1-2 per slide)

Shadow (for cards — use sparingly)
  type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.06
```

Present these tokens to the user for confirmation before proceeding. This is the single most important step.

### Phase 3: Slide Structure Planning

Plan the slide deck structure before coding. For each slide, decide:
- **Layout pattern** (see references/slide-layouts.md, references/patterns/cover-patterns.md, references/patterns/table-patterns.md)
- **Content hierarchy** — what's the ONE thing the audience should take away?
- **Visual elements** — what supports the message? (chart, image, icon, comparison)

Vary layouts across the deck. Never repeat the same layout pattern more than twice consecutively.

Apply the "sandwich" structure for deck-level rhythm:
- Dark or bold slides for: cover, section dividers, conclusion
- Light slides for: content, data, details

### Phase 3.5: User Review (Required)

Present the slide structure to the user and **always** get confirmation before proceeding. Show a table with slide number, layout, and content summary. Ask:

- Any slides to revise?
- Any content to add?
- Any slides to remove?

Proceed to Phase 4 only after the user confirms (e.g., "좋아", "진행해", "looks good"). Never start generating without confirmation.

### Phase 4: Slide Generation (HTML)

Primary output is a single HTML file containing only slide content. Interactivity (presentation mode, style editor) is handled by external scripts — **do NOT inline presenter or editor code into the HTML.**

**HTML Structure:**
```html
<body>
  <div class="frames">
    <div class="page-header">Title · 1 / N</div>
    <div class="frame" data-slide="0">
      <div class="viewport">  <!-- container-type: inline-size; width:960px; height:540px -->
        <div class="slide s1"> <!-- position:absolute; inset:0; width:100%; height:100% -->
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

**Critical CSS rules:**
- `.viewport`: `container-type: inline-size; width: 960px; height: 540px;` (explicit height, NOT aspect-ratio — ADR-018)
- `.slide`: `position: absolute; inset: 0; width: 100%; height: 100%;`
- ALL sizing in `cqw` units (1px ≈ 0.104cqw at 960px basis)
- Title: 2.3-2.5cqw / Body: 1.3-1.4cqw / Caption: 1.0cqw / Emoji: 2.5-5cqw
- Never use `flex: 1` on grid/card containers — cards will fill the entire slide (ADR-019)
- Never use `flex: 1` on images — use `max-height` instead
- For slides with sparse content: use `justify-content: center` on the slide itself
- Title block to first content: minimum `2cqw` gap (ADR-020)
- Code blocks: `white-space: pre` required (ADR-021)
- State labels like Before/After are allowed as chip-style elements (ADR-022)

**Mixed-style text — span separation rules:**

To allow editor.js to select individual spans and modify font size/color independently,
**any part of text where styles differ or may need to differ must be wrapped in separate `<span>` tags.**

This is a mandatory rule for all slide generation.

Patterns that require separation:
| Pattern | Correct | Wrong |
|---------|---------|-------|
| Number + unit | `<span>48,200</span><span>명</span>` | `48,200명` |
| Currency + amount | `<span>₩4.2</span><span>억</span>` | `₩4.2억` |
| Number + percent | `<span>142</span><span>%</span>` | `142%` |
| Number + rank | `<span>3</span><span>위</span>` | `3위` |
| Amount + won | `<span>5,500</span><span>원</span>` | `5,500원` |
| Sign + number | `<span>-12</span><span>%</span>` | `-12%` |
| Duration | `<span>6</span><span>개월</span>` | `6개월` |

Where to apply:
- KPI numbers (key metrics on slides)
- Price displays
- Statistics / metric values
- Hero numbers on cover slides
- Anywhere a number and its unit appear together

**Works alongside existing BEM-classed spans:**
```html
<!-- Parent has BEM class; child spans don't need classes -->
<div class="s1__stat-value"><span>₩4.2</span><span class="s1__stat-unit">억</span></div>
```

Plain text (no number/unit mix) does not need separation:
```html
<!-- No separation needed -->
<div class="s7__member-name">김준혁</div>
<div class="s3__col-name">원클릭 배포</div>
```

**External Scripts (CDN — always use absolute URLs, never regenerate):**
- `https://static.kid-o.cloud/ppt-designer/scripts/presenter.js` — presentation mode
- `https://static.kid-o.cloud/ppt-designer/scripts/editor.js` — style editor
- Every generated HTML must include both script tags. Never use relative paths.

**3D Emoji (CDN):**
```
https://static.kid-o.cloud/ppt-designer/emoji/{category}--{name}.png
```
See `references/emoji-cdn.md` for category list and frequently used emoji.
Do NOT download emoji locally — use CDN URLs directly in `<img>` tags.

**Emoji URL Validation (required — ADR-023):**
After generating HTML, verify all emoji URLs with curl:
```bash
grep -o 'static.kid-o.cloud/ppt-designer/emoji/[^"]*' output.html | sort -u | while read url; do
  code=$(curl -so /dev/null -w "%{http_code}" "https://$url")
  [ "$code" != "200" ] && echo "BROKEN: $url"
done
```
If any return 404, look up the correct filename in `references/emoji-index.json` and replace.

**Commonly incorrect category names:**
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

These are specific code-level rules to avoid common rendering issues:

**Bullet lists:**
- Use `indentLevel: 0` and `bullet: { indent: 10 }` (or 8-12) — default indent is too wide, causing bullet-text gap to be excessive
- Never rely on default bullet indent — it's almost always too far from the text

**Card padding:**
- Internal padding must be at least 0.25" on all sides (0.3" preferred)
- Content x = card.x + 0.3, content w = card.w - 0.6

**Section gaps:**
- Between title block and first content: 0.3" minimum
- Between description text and table/chart: 0.35" minimum
- Between quote text and attribution: 0.15" minimum (not 0)

**Flow diagrams (Step 1 → Step 2 → Step 3):**
- Wrap each step in a box/shape (ROUNDED_RECTANGLE with subtle fill)
- Connect with arrow shapes or arrow text (→)
- Don't just lay out text with arrows between — it looks unfinished

**Icon/image download validation:**
- After downloading any image (Fluent Emoji, etc.), verify the file is valid before embedding
- Check: file exists, file size > 1KB, file is valid PNG (starts with PNG header)
- If download fails, fall back to a text emoji or skip — never embed a broken/empty image
- Test the exact URL with curl before using in the script

**Image placement rules:**
Images should feel intentional, not decorative. Follow these patterns:

**Image sizing — object-fit: cover behavior:**
Images must NEVER appear stretched or squished. In PptxGenJS, use `sizing: { type: 'cover', w: W, h: H }` to fill the target area while preserving aspect ratio. The image will be cropped (clipped) to fit — this is correct behavior, like CSS `object-fit: cover` + `overflow: hidden`.

**Multiple images on one slide:**
When placing 2+ images side by side, they MUST share the same aspect ratio container. Pick one ratio (e.g., 4:3 or 1:1) and apply it to all. Mismatched image proportions look amateur.

**Image containers (clipping masks):**
Don't place a colored shape behind an image as a "container" — it looks like a thick border. Instead:
- Use `rounding: true` on the image itself for circular crop
- Or use ROUNDED_RECTANGLE as a clipping area by placing the image precisely inside with `sizing: { type: 'cover' }`
- The container shape should be invisible (same fill as slide bg) or not exist at all

On LIGHT backgrounds:
- Place images directly with rounding if desired — no visible container needed
- If a container is used, its fill must match the slide background exactly
- Rounded corners through image rounding, not through a separate shape behind it

On DARK backgrounds:
- Place images as sharp rectangles — NO rounding, NO border
- The hard edges match the rigid/serious feel of dark mode
- If the whole mood is dark, keep everything angular and clean

NEVER:
- Add visible borders/strokes around images
- Use image shadows on dark backgrounds
- Place images without considering text alignment (image edges should align with content margins)
- Place decorative images on data-heavy slides (KPI grids, tables, comparison charts). These slides need the full space for data. A random image in the corner of a metrics slide is the worst thing you can do — it screams "I had leftover images and didn't know where to put them."

**When to use images vs. when not to:**
- Cover slides: YES — as background with overlay, or as side visual
- Text + Visual slides (Layout B): YES — image is the visual half
- Section dividers: YES — as background
- Data/KPI slides: NO — let the data breathe
- Table slides: NO — tables need full width
- Process/flow slides: MAYBE — only if the image directly illustrates a step

### Phase 4.5: PDF Export (Required)

After generating HTML slides, **always** export a PDF as well. Uses a Playwright-based high-resolution capture script:

```bash
python3 scripts/export-pdf.py <input.html> <output.pdf>
```
Requires: playwright, Pillow (Python 3.12+)

- 2x resolution (1920x1080) capture → 300 DPI PDF
- UI elements (.export-btn, .nav, .page-header) auto-hidden
- Always run this script after HTML generation to deliver the PDF alongside

### Phase 5: QA

Follow the existing `pptx` skill's QA process:
1. Convert to images
2. Visually inspect every slide
3. Check: margin violations, text overflow, alignment, Korean text readability
4. Fix and re-verify

---

## Anti-Patterns — Things That Make Slides "Look AI"

These are the most common failures. Internalize them.

### 1. Vertical Accent Bar Before Titles
DO NOT put a vertical `|` line (accent bar) to the left of slide titles. This is the #1 hallmark of AI-generated slides. Human designers rarely use them. Just use the title text directly with proper font weight. If you need visual hierarchy, use a small colored section label above the title instead.

### 2. No Bottom Margin
Content runs to the bottom edge of the slide. Always maintain at least 0.55" from the bottom.
If content doesn't fit, reduce content — don't sacrifice margins.

### 3. Korean Text Too Large / Too Heavy
AI tends to make titles too big (36pt+) and too bold (900). Korean characters are visually denser and heavier than Latin — they feel bigger at the same point size. Read references/korean-typography.md.
- Slide title: 22-26pt is the sweet spot, NOT 28-36pt
- Body text: 11-13pt
- font-weight: 800 (NOT 900 — 900 causes Korean glyphs to blob together) (ADR-024)
- letter-spacing: -0.02em (default 0 makes Korean characters look too spread out) (ADR-024)
- If it feels bold enough in English, it's too big for Korean

### 4. Mechanical Grid Distribution
AI tends to distribute elements with mathematically equal spacing, filling all available space. Human designers leave intentional empty space.
- Not every inch needs content
- Asymmetry is often better than symmetry
- White space is a design element, not wasted space

### 5. Sections Crammed Together
In multi-column layouts, columns need clear separation. Minimum 0.3" gap between columns.
Use subtle divider lines (1px, muted color) or generous spacing — not both.

### 6. Inconsistent Component Padding
If a card has 0.2" top padding, it must have at least 0.2" bottom padding.
Top-heavy or bottom-heavy components look broken.

### 7. Meaninglessly Large Numbers
Don't make KPI numbers 44pt just because there's space. Size should reflect information hierarchy, not fill space. 24-28pt is usually sufficient for highlight numbers.

### 8. Accent Lines Under Titles
Horizontal lines under slide titles are another hallmark of AI-generated slides. Don't add them.

### 9. Overusing Cards and Chips
Don't wrap everything in cards by default. Cards are appropriate when:
- Each card contains a **different type of content** (e.g., one card has a chart, another has quotes, another has stats — not three identical text lists)
- You need clear visual separation for 2-3 parallel concepts
- The card has border/stroke only (not heavy fill + shadow) on dark backgrounds

When using cards:
- Use subtle elevation (background slightly lighter than slide bg) or thin border stroke — NOT heavy shadows
- Vary the content type inside each card (data viz, quotes, icons — not just text)
- Put Fluent Emoji or icons inside cards to add visual richness
- Tags/chips: max 1-2 per slide, inside the card or above the title — not on every element

When NOT to use cards:
- Simple bulleted lists — just use text hierarchy
- Single-topic content — use full-width layout
- Data tables — use table formatting directly

### 10. Generic Color Application
Don't default to blue. The user's moodboard defines the palette. Use it consistently:
- Primary color: key highlights, section labels, CTA elements
- Secondary: supporting elements
- Background: stick to 1-2 bg colors across the deck
- Never introduce colors not in the token set

### 11. UI Element Overlap
Elements must never overlap or touch. Check that:
- Text boxes don't extend beyond their intended bounds
- Shapes don't overlap adjacent shapes
- Icons have clearance from surrounding text
- Stat cards at the bottom don't clip the slide edge

### 12. Poor Alignment Consistency
All left-aligned elements on a slide must share the same x-position. Don't let titles, body text, and bullet items start at slightly different x-values. Pick one left margin and stick to it for the entire slide.

### 13. Ignoring Content Density
When a slide has lots of text content (3+ items per column, multiple rows), scale down font sizes proportionally and increase line spacing. Don't maintain body-text sizes that cause overflow.

---

## Section Labels (not tags)

Use small colored text labels to mark slide roles — NOT pill-shaped tags. Keep it minimal:
- "Problem" / "Solution" / "Hypothesis" etc.
- 9-10pt, primary or accent color, no background shape
- Positioned above the title, left-aligned
- Max 1 per slide. Most slides don't need one.

---

## Icons and Visual Elements

Slides with only text and shapes look flat. Use icons to add visual richness.

### Microsoft Fluent Emoji 3D (Recommended)
High-quality 3D emoji PNGs, free to use. Download at build time:
```
https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/{Name}/3D/{name_snake}_3d.png
```
Examples:
- `assets/Fire/3D/fire_3d.png`
- `assets/Chart increasing/3D/chart_increasing_3d.png`
- `assets/Rocket/3D/rocket_3d.png`
- `assets/Light bulb/3D/light_bulb_3d.png`
- `assets/Target/3D/target_3d.png`
- `assets/Money bag/3D/money_bag_3d.png`

Usage: download the PNG, then add as image in PptxGenJS. Size: 0.4-0.6" for inline icons, 0.8-1.2" for feature highlights.

### react-icons (Alternative)
If Fluent Emoji doesn't fit the mood (e.g., minimalist/corporate), use react-icons rendered to PNG via sharp. See the existing pptx skill's pptxgenjs.md for the setup pattern.

### Icon Guidelines
- Use icons to support text, not replace it
- 1-3 icons per slide max
- Consistent size across the slide
- Icons should add meaning — don't decorate randomly
- Inside cards: center the icon below the text to serve as the card's visual anchor
- Icon size inside cards: 0.8-1.0" for visual anchors, 0.4-0.5" for inline

---

## Design Philosophy

Real human-designed presentation slides are simpler than AI tends to produce:
- **Flat layouts over cards** — use text hierarchy (font size, weight, color) to create structure instead of wrapping everything in rounded rectangles
- **Generous whitespace** — leave 30-40% of the slide empty
- **Text + thin divider lines** — the most common pattern in professional Korean slides
- **Images when relevant** — a well-placed screenshot or photo is worth more than any card layout
- **Consistent left alignment** — everything on the slide shares the same left margin

### Content-First Layout Selection

**Choose the layout to fit the content. Never trim content to fit a layout.**

If you pick a layout first and shoehorn content in, text gets truncated or awkwardly abbreviated.
Correct order: assess content volume and type → select a matching layout.

| Content volume | Layout choice |
|---------------|---------------|
| 1 key message | Full-bleed quote, single large number |
| 2–3 items | 2-column, Before/After |
| 4–6 items | Grid, 3-column |
| 7+ items | Table, or split into 2 slides |
| Long text | Text + Visual (left text / right image) |
| Code | 2-column (left explanation / right code block) |
| Process | Horizontal flow (4 steps max) |

### Diverse Variations Within the Same Layout

Varying the content composition inside a proven layout is more effective and safer than making the layout itself complex.

---

## Reference Files

- `references/korean-typography.md` — Korean text sizing, spacing, font selection
- `references/slide-layouts.md` — Layout patterns with PptxGenJS coordinates
- `references/patterns/cover-patterns.md` — 8 cover slide patterns (title placement, decorations, gradients)
- `references/patterns/table-patterns.md` — 3 table slide patterns (comparison, data, summary)
- `references/emoji-cdn.md` — Fluent Emoji 3D CDN category/URL mapping
- `references/adr.md` — Architecture Decision Records (ADR-001~025)

Also read the existing `pptx` skill for:
- PptxGenJS API reference: `~/.claude/skills/pptx/pptxgenjs.md`
- QA process: `~/.claude/skills/pptx/SKILL.md`

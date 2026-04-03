# Korean Typography for Presentations

Korean (Hangul) characters are structurally different from Latin — they are square-shaped, visually denser, and have built-in internal whitespace. Rules optimized for English will produce cramped, unreadable Korean slides.

## Font Selection

### Recommended (in priority order)
1. **Pretendard** — Modern, clean, excellent weight range. Best for professional slides.
2. **Apple SD Gothic Neo** — macOS system font. Safe fallback.
3. **Noto Sans KR** — Google font. Wide availability.
4. **Malgun Gothic** — Windows system font. Last resort.

### Avoid
- Gothic fonts with very thin weights for body text (< 400 weight)
- Serif fonts for Korean body text in presentations (readability drops at distance)
- Mixing Korean and Latin fonts from different families — use one family that covers both

### Font Weight Usage
| Element | Weight | Why |
|---------|--------|-----|
| Slide title | 800 (ExtraBold) | Anchor the page, instant read |
| Section header | 700 (Bold) | Clear hierarchy under title |
| Body text | 400-500 (Regular/Medium) | Comfortable sustained reading |
| Caption / label | 500 (Medium) | Needs to be visible but subordinate |
| Tag text | 600 (SemiBold) | Small size compensated by weight |

## Font Sizes (pt)

Korean characters are visually heavier and denser than Latin. They feel bigger at the same point size. The sizes below are tuned for Korean text in slides — they will feel smaller than what AI typically produces, and that's correct.

| Element | Size | Notes |
|---------|------|-------|
| Slide title | 22-26pt | The sweet spot. 28pt+ feels banner-like for Korean. |
| Subtitle / description | 11-13pt | Below the title, muted color |
| Section label (above title) | 9-10pt | "Problem", "01. 마케팅 전략" — colored, no background |
| Section header (in content) | 16-18pt | Within content area |
| Body text | 11-13pt | Primary reading size |
| Bullet items | 11-12pt | Slightly smaller than body for hierarchy |
| Caption / annotation | 9-10pt | Muted color, supplementary info |
| Tag / badge | 8-9pt | Use sparingly |
| Page number | 9pt | Bottom corner |
| KPI / highlight number | 24-28pt | Large but not overwhelming. 30pt+ is rarely needed. |

### Title Line Spacing
When a Korean title wraps to 2+ lines, the default line spacing is too wide. Tighten it:
- Single-line title: lineSpacingMultiple 1.2 (default is fine)
- **Multi-line title (2+ lines): lineSpacingMultiple 1.05-1.1** — Korean titles need tight leading when stacked

This is critical. A 2-line title with 1.2+ leading looks like two separate elements instead of one title.

### Critical Rule
If the slide is content-heavy (3+ items in multiple columns), scale ALL text down by 1-2pt and increase line spacing. Content must fit within margins — never sacrifice margins for text size.

## Spacing

### Character Spacing (charSpacing in PptxGenJS)
| Element | charSpacing | Why |
|---------|-------------|-----|
| Title (Korean) | 0 to -0.5 | Korean has built-in spacing; negative tightens slightly for polish |
| Body (Korean) | 0 | Default is fine for body |
| ALL CAPS labels | 3-5 | Latin uppercase labels need tracking |
| Mixed KR+EN | 0 | Let the font handle it |

### Line Spacing (lineSpacingMultiple in PptxGenJS)
| Element | lineSpacingMultiple | Why |
|---------|---------------------|-----|
| Title | 1.2 | Tight but readable for 1-2 lines |
| Body text | 1.5-1.7 | Korean density needs generous leading |
| Bullet list | 1.4-1.5 | Tighter than body, paraSpaceAfter adds gap |
| Caption | 1.4 | Small text needs proportionally less leading |

### Paragraph Spacing
Use `paraSpaceAfter` (in pt) between bullet items instead of `lineSpacing`:
- Bullet items: paraSpaceAfter 4-6pt
- Body paragraphs: paraSpaceAfter 8-10pt
- Quote text → attribution: paraSpaceAfter 6-8pt (enough to separate, not too far)

### Bullet Indent
PptxGenJS default bullet indent is too wide for Korean. Override it:
```javascript
{ bullet: { indent: 10 }, indentLevel: 0 }  // 10pt indent, tight
```
The default creates a ~20pt gap between bullet dot and text, which looks disconnected in Korean.

## Common Mistakes

1. **Title too large** — 40pt+ Korean titles dominate the slide and look like banner ads. 28-32pt is the sweet spot.

2. **Body text too small** — Below 11pt, Korean becomes unreadable at presentation distance. 12-14pt minimum.

3. **No line spacing adjustment** — Default lineSpacing (1.0) makes Korean text blocks feel suffocating. Always set lineSpacingMultiple to at least 1.4 for body text.

4. **Mixing font sizes chaotically** — Stick to 3-4 distinct sizes per slide. Title, body, caption. That's usually enough.

5. **Using English typography rules** — Korean doesn't need letter-spacing increases at small sizes (unlike Latin uppercase). Don't add charSpacing to Korean body text.

## Alignment

- **Left-align** Korean body text. Always. Justified Korean text creates ugly gaps.
- **Left-align** titles. Centered Korean titles only work on cover slides with very short text.
- **Center-align** only: single-line tag text, page numbers, cover slide titles.

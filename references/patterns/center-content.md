# Center Content Patterns

Single-focus slides: section dividers, big numbers, quotes, CTA/closing. Source: `center-patterns/`, `content-patterns/`

Shared layout tokens: see `_layout-tokens.md`

---

## Section Divider: Inner Border (VAR-A)

**Composition:** Full-bleed image + dark overlay + gold inner border + centered title
**Source:** `center-patterns/cc-03-variations.html` VAR-A

**Key CSS:**
- `.slide { background: #000; display: flex; align-items: center; justify-content: center; }`
- `.bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .35; }`
- `.overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,.7) 100%); }`
- `.inner-border { position: absolute; z-index: 1; inset: 2.5cqw; border: 1px solid rgba(251,191,36,.25); }`
- Part label: 0.9cqw, uppercase, letter-spacing .25em, border pill
- Title: 5.5cqw, weight 800
- Desc: 1.2cqw, white 60%

**Layout:**
```
┌──────────────────────────────────────┐
│ ┌──────────────────────────────────┐ │
│ │                                  │ │
│ │        [ Section 01 ]            │ │
│ │        프로젝트 개요             │ │
│ │        설명 텍스트               │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
  (image bg)    (gold inner border)
```

**Mood:** Section transition, chapter opening

---

## Section Divider: HUD Brackets (VAR-C)

**Composition:** Full-bleed image + dark overlay + diagonal corner brackets (┌ ┘)
**Source:** `center-patterns/cc-03-variations.html` VAR-C

**Key CSS:**
- Base same as VAR-A (image + overlay)
- `.hud-bracket { position: absolute; z-index: 1; width: 5cqw; height: 5cqw; }`
- Top-left: `top: 17cqw; left: 24cqw; border-top + border-left: 1.5px solid rgba(251,191,36,.4);`
- Bottom-right: `bottom: 17cqw; right: 24cqw; border-bottom + border-right: 1.5px solid rgba(251,191,36,.4);`
- Only 2 brackets (TL + BR), NOT all 4 corners

**Layout:**
```
┌──────────────────────────────────────┐
│                                      │
│         ┌──                          │
│         [ Section 01 ]               │
│         프로젝트 개요                │
│         설명 텍스트                  │
│                          ──┘         │
│                                      │
└──────────────────────────────────────┘
```

**Mood:** Cinematic, HUD, tech

---

## Section Divider: Yellow Dot (VAR-D)

**Composition:** Full-bleed image + dark overlay + title with accent dot
**Source:** `center-patterns/cc-03-variations.html` VAR-D

**Key CSS:**
- Base same as VAR-A (image + overlay)
- `.title { position: relative; }`
- `.title .dot { position: absolute; width: 1.2cqw; height: 1.2cqw; background: #FBBF24; border-radius: 50%; top: -0.2cqw; right: -1.6cqw; }`
- Dot placed at title's top-right corner — minimal accent

**Mood:** Clean, editorial, minimal accent

---

## Big Number: Dark (CC-04)

**Composition:** Dark bg + section label + massive number + description
**Source:** `center-patterns/cc-04-06.html` CC-04

**Key CSS:**
- `.slide { background: #0F172A; justify-content: center; padding: 6cqw; text-align: center; }`
- Label: 0.9cqw, uppercase, letter-spacing .18em, amber (#F59E0B)
- Number: 14cqw, weight 900, white. Unit span: 8cqw, amber
- Desc: 1.3cqw, white 50%
- Glow: `radial-gradient(circle, rgba(245,158,11,.08) 0%, transparent 70%)` bottom-left

**Layout:**
```
┌──────────────────────────────────────┐
│                                      │
│          YEAR-OVER-YEAR GROWTH       │
│              347%                    │
│          설명 텍스트                 │
│                                      │
└──────────────────────────────────────┘
```

**Mood:** KPI hero, investor highlight, achievement

---

## Big Number: Gradient Text (CC-05)

**Composition:** Light bg + label pill + gradient number + title + desc
**Source:** `center-patterns/cc-04-06.html` CC-05

**Key CSS:**
- `.slide { background: #F8FAFC; justify-content: center; padding: 6cqw; text-align: center; }`
- Label: 0.9cqw pill, indigo text, #EEF2FF bg
- Number: 15cqw, weight 900, `background: linear-gradient(135deg, #6366F1, #EC4899, #F59E0B); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- Title: 2cqw, weight 700
- Desc: 1.1cqw, muted

**Mood:** Achievement, milestone celebration, vibrant

---

## Big Number: Before → After (CC-06)

**Composition:** Dark bg + strikethrough old value + arrow + new value + delta badge
**Source:** `center-patterns/cc-04-06.html` CC-06

**Key CSS:**
- `.slide { background: #111827; justify-content: center; padding: 5cqw 6cqw; text-align: center; }`
- Before value: 7cqw, white 30%, `text-decoration: line-through; text-decoration-color: rgba(239,68,68,.5); text-decoration-thickness: 0.3cqw;`
- Arrow SVG: 3cqw, emerald, `stroke-width: 2.5`
- After value: 10cqw, weight 900, emerald (#10B981)
- Delta badge: emerald text, `rgba(16,185,129,.1)` bg, pill shape

**Layout:**
```
┌──────────────────────────────────────┐
│                                      │
│        AVERAGE RESPONSE TIME         │
│         4.2s  →  0.8s               │
│        설명 텍스트                   │
│            ▼ 81% 개선               │
│                                      │
└──────────────────────────────────────┘
```

**Mood:** Performance improvement, A/B results, metric shift

---

## Fullscreen Quote: Light (CC-07)

**Composition:** White bg + large decorative quotes + single message + source
**Source:** `center-patterns/cc-07-09.html` CC-07

**Key CSS:**
- `.slide { background: #FAFBFC; justify-content: center; padding: 8cqw 10cqw; text-align: center; }`
- Message: 3.2cqw, weight 700, `em { color: #6366F1; font-weight: 800; }`
- Source: 1cqw, muted (#94A3B8)
- Decorative quotes: `::before` / `::after`, 12cqw Georgia serif, `rgba(99,102,241,.08)`
  - `::before { content: '\201C'; top: 6cqw; left: 7cqw; }`
  - `::after { content: '\201D'; bottom: 3cqw; right: 7cqw; }`

**Mood:** Key insight, message highlight, quote

---

## Dark Quote: Glow Ring (QT-04)

**Composition:** Near-black bg + concentric glow rings + centered quote + attribution
**Source:** `content-patterns/content-patterns.html` QT-04

**Key CSS:**
- `.slide { background: #0A0A0F; justify-content: center; padding: 6cqw 9cqw; text-align: center; }`
- Center glow: `radial-gradient(circle, rgba(255,213,79,.06) 0%, transparent 70%)` at center
- Glow ring 1: 28cqw, `border: 1px solid rgba(255,213,79,.12)`, centered
- Glow ring 2: 48cqw, `border: 1px solid rgba(255,213,79,.05)`, centered
- Badge: 0.9cqw, uppercase, `rgba(255,213,79,.6)`
- Quote: 3.2cqw, weight 800, white, `text-shadow: 0 0 40px rgba(255,213,79,.15)`
- Attribution: 1.1cqw, weight 600, #FFD54F

**Layout:**
```
┌──────────────────────────────────────┐
│             ╭─── ring ───╮           │
│         ╭───┤   glow    ├───╮        │
│         │   │ BADGE     │   │        │
│         │   │ 인용 텍스트│   │        │
│         │   │ — 이름    │   │        │
│         ╰───┤           ├───╯        │
│             ╰───────────╯            │
└──────────────────────────────────────┘
```

**Mood:** CEO message, founder quote, keynote moment

---

## Quote with Emoji: Light (V2-01)

**Composition:** White bg + single 3D emoji (xl) + quote + attribution
**Source:** `center-patterns/cc-v2-01-03.html` V2-01

**Key CSS:**
- `.slide { background: #FFFFFF; justify-content: center; padding: 5.4cqw 8.33cqw; text-align: center; }`
- Inner container: flex column, center, gap 2.5cqw
- Emoji: `.emoji3d--xl { width: 10.42cqw; height: 10.42cqw; }`
- Quote: 2.6cqw, weight 800, `em { color: primary; }`
- Attribution: 1.15cqw, muted

**Mood:** Key insight, value statement, brand message

---

## Quote with Emoji: Dark + Glow (V2-02)

**Composition:** Dark bg + radial glow + single 3D emoji + quote + attribution
**Source:** `center-patterns/cc-v2-01-03.html` V2-02

**Key CSS:**
- `.slide { background: #1A1A2E; justify-content: center; padding: 5.4cqw 8.33cqw; text-align: center; }`
- Glow: `::before { radial-gradient(ellipse 50% 60% at 50% 50%, rgba(251,191,36,.07) 0%, transparent 60%); }`
- Emoji: 10.42cqw, margin-bottom 2.5cqw
- Quote: 2.8cqw, weight 800, white, `em { color: #FBBF24; }`
- Attribution: 1.1cqw, white 40%

**Mood:** Founder quote, vision statement, keynote

---

## CTA / Closing: Dark + Glow (V2-03)

**Composition:** Dark bg + radial glow + emoji + title + desc + CTA button + contact
**Source:** `center-patterns/cc-v2-01-03.html` V2-03

**Key CSS:**
- `.slide { background: #1E1D1A; justify-content: center; padding: 5.4cqw 8.33cqw; text-align: center; }`
- Glow: `radial-gradient(ellipse 50% 60% at 50% 50%, rgba(99,102,241,.08) 0%, transparent 60%);`
- Emoji: 10.42cqw, margin-bottom 2.5cqw
- Title: 3.2cqw, weight 800, white
- Desc: 1.35cqw, white 50%, max-width 52cqw
- CTA button: primary bg, white text, 1.25cqw, weight 700, padding 1.04cqw 2.5cqw, rounded 0.52cqw
- Contact: 1.0cqw, white 30%

**Mood:** Last slide, call to action, closing with next steps

---

## CTA: Gradient Background (CC-10)

**Composition:** Bold gradient bg + decorative circles + title + CTA button + contact row
**Source:** `center-patterns/cc-10-12.html` CC-10

**Key CSS:**
- `.slide { background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); justify-content: center; padding: 6cqw; text-align: center; }`
- Decorative circles: `::before` 50cqw white 6% top-right, `::after` 35cqw white 4% bottom-left
- Title: 4.5cqw, weight 800, white
- Sub: 1.3cqw, white 70%
- CTA button: white bg, primary text, 1.2cqw bold, rounded 0.6cqw, shadow
- Contact row: flex, gap 3cqw, 0.95cqw, white 60%, SVG icons (stroke)

**Mood:** Bold CTA, signup, trial start

---

## QR Code + CTA (CC-11)

**Composition:** Light bg + title + QR placeholder + URL + hint
**Source:** `center-patterns/cc-10-12.html` CC-11

**Key CSS:**
- `.slide { background: #FAFBFC; justify-content: center; padding: 5cqw 6cqw; text-align: center; }`
- Title: 3cqw, weight 800
- QR box: 16cqw × 16cqw, white bg, border #E2E8F0, rounded 1.2cqw, shadow
- QR pattern: 7×7 grid of cells (.on = dark, .off = transparent)
- URL: 1.1cqw, weight 600, primary color
- Hint: 0.85cqw, muted

**Mood:** App download, landing page redirect, event registration

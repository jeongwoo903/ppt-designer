# Split Layout Patterns

Left text panel + right content (cards, code). Source: `split-patterns/split-patterns.html`

Shared layout tokens: see `_layout-tokens.md`

---

## Card 3-Stack (SP-01)

**Composition:** Left 55% text + right 45% emoji card 3-stack

**Key CSS:**
- `.left { width: 55%; padding: 7cqw 5cqw 7cqw 6.5cqw; gap: 2cqw; }`
- `.right { width: 45%; padding: 6cqw 5cqw 6cqw 2cqw; gap: 2cqw; }`
- `.kpi-card { display: flex; align-items: center; gap: 1.5cqw; background: #fff; border-radius: 1.2cqw; padding: 1.5cqw 2cqw; box-shadow: 0 2px 12px rgba(0,0,0,.05); }`
- Emoji: 4.5cqw, title: 3cqw

**Mood:** Pain points, problem listing, key metrics

---

## Icon Box Card 3-Stack (SP-02)

**Composition:** Left 42% text + right 58% feature cards with colored icon boxes

**Key CSS:**
- `.left { width: 42%; padding: 7cqw 4cqw 7cqw 6cqw; gap: 1.5cqw; }`
- `.right { width: 58%; padding: 5cqw 5cqw 5cqw 2cqw; gap: 2cqw; }`
- `.feat-card { display: flex; align-items: center; gap: 1.5cqw; padding: 1.8cqw 2.2cqw; background: #fff; border-radius: 1cqw; border: 1px solid tint; }`
- `.feat-icon { width: 4.2cqw; height: 4.2cqw; border-radius: .8cqw; background: tint; }` — icon bg box
- Inner emoji: 2.6cqw

**Mood:** Feature listing, service capabilities

---

## Dark Panel + 2x2 Card Grid (SP-05)

**Composition:** Left 38% dark panel + right 62% light 2x2 card grid

**Key CSS:**
- `.left { width: 38%; background: #1A1F2E; padding: 6cqw 4cqw 6cqw 5cqw; justify-content: center; gap: 2cqw; }`
- Left bottom stats: `border-top: 1px solid rgba(255,255,255,.1); display: flex; gap: 3cqw;`
- `.right { width: 62%; background: #F3F4FB; display: grid; grid-template-columns: 1fr 1fr; gap: 2cqw; padding: 4.5cqw; align-content: center; }`
- `.grid-card { background: #fff; border-radius: 1cqw; padding: 2.2cqw 2cqw; box-shadow: 0 2px 10px rgba(0,0,0,.04); }`
- Card emoji: 4cqw

**Mood:** Overview with metrics, feature grid with context

---

## 2x2 Metric Grid (SP-08)

**Composition:** Left 40% text + right 60% 2x2 KPI cards

**Key CSS:**
- `.left { width: 40%; padding: 7cqw 3cqw 7cqw 6cqw; gap: 1.5cqw; }`
- `.right { width: 60%; display: grid; grid-template-columns: 1fr 1fr; gap: 1.8cqw; padding: 5cqw 5cqw 5cqw 2cqw; align-content: center; }`
- `.metric-card { background: #fff; border-radius: 1.2cqw; padding: 2.2cqw 2cqw; }`
- `.metric-value { font-size: 2.8cqw; font-weight: 800; }`
- `.metric-change` — up #10B981 / down #EF4444

**Mood:** KPI dashboard, performance metrics

---

## Review Card Stack (SP-09)

**Composition:** Left 40% text + star rating + right 60% review cards

**Key CSS:**
- `.left { width: 40%; padding: 7cqw 3cqw 7cqw 6cqw; gap: 1.8cqw; }`
- Star rating: `★★★★★` text + average score
- `.right { width: 60%; padding: 5cqw 5cqw 5cqw 2cqw; gap: 2cqw; }`
- `.review-card { background: #fff; border-radius: 1.2cqw; padding: 2.2cqw 2.5cqw; }`
- `.review-text { font-size: 1.1cqw; font-style: italic; }`
- Author avatar: 3cqw circle, initials + bg color

**Mood:** Testimonials, customer reviews, social proof

---

## Code Block Split (SP-10)

**Composition:** Left 42% description + tags (dark) + right 58% code block (dark)

**Key CSS:**
- `.slide { background: #0F172A; display: flex; flex-direction: row; align-items: stretch; }`
- `.left { width: 42%; padding: 7cqw 3cqw 7cqw 6cqw; gap: 2cqw; }`
- `.tech-tag { padding: .4cqw 1cqw; background: rgba(accent,.12); border: 1px solid rgba(accent,.25); border-radius: .5cqw; font-size: 0.85cqw; }`
- `.code-block { background: #1E293B; border-radius: 1cqw; }`
- `.code-header` — 3-dot (red/yellow/green, .7cqw) + filename
- `.code-body { font-family: 'JetBrains Mono'; font-size: 0.9cqw; line-height: 1.8; white-space: pre; color: #CBD5E1; }`

**Syntax highlight classes:**
- `.kw` — keyword (#C084FC)
- `.fn` — function (#60A5FA)
- `.str` — string (#34D399)
- `.cm` — comment (#475569, italic)
- `.num` — number (#F59E0B)
- `.op` — operator (#94A3B8)

**Mood:** Technical demo, API showcase, developer-facing

---

## Anti-patterns

| Issue | Description |
|-------|-------------|
| 50:50 ratio | Visually flat — use 38:62 ~ 55:45 asymmetry |
| flex:1 on cards | Stretches vertically — use padding/gap instead |
| Inconsistent emoji sizes | Keep all emoji same size within a slide |

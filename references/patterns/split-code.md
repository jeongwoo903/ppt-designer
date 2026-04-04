# 좌우 분할 + 코드 블록 레이아웃

좌측 설명 + 우측 코드. 소스: `split-patterns/split-patterns.html`

공통 레이아웃 토큰은 `_layout-tokens.md` 참조.

---

## 설명 + 코드 블록 (SP-10)

**구도:** 좌 42% 설명+태그 (다크) + 우 58% 코드 블록 (다크)

**핵심 CSS:**
- `.slide { background: #0F172A; display: flex; flex-direction: row; align-items: stretch; }`
- `.left { width: 42%; padding: 7cqw 3cqw 7cqw 6cqw; gap: 2cqw; }`
- `.tech-tag { padding: .4cqw 1cqw; background: rgba(accent,.12); border: 1px solid rgba(accent,.25); border-radius: .5cqw; font-size: 0.85cqw; }`
- `.code-block { background: #1E293B; border-radius: 1cqw; }`
- `.code-header` — 3색 dot (red/yellow/green, .7cqw) + 파일명
- `.code-body { font-family: 'JetBrains Mono'; font-size: 0.9cqw; line-height: 1.8; white-space: pre; color: #CBD5E1; }`

**구문 하이라이트 클래스:**
- `.kw` — keyword (#C084FC)
- `.fn` — function (#60A5FA)
- `.str` — string (#34D399)
- `.cm` — comment (#475569, italic)
- `.num` — number (#F59E0B)
- `.op` — operator (#94A3B8)

**레이아웃:**
```
┌─────────────────┬──────────────────────────┐
│ (dark)          │ (darker)                 │
│                 │ ● ● ●  filename.py       │
│ LABEL           │                          │
│                 │ code line 1              │
│ 메인 타이틀     │ code line 2              │
│                 │ code line 3              │
│ 설명...         │ ...                      │
│                 │                          │
│ [Tag] [Tag]     │                          │
└─────────────────┴──────────────────────────┘
```

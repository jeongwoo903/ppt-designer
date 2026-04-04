# 리스트 레이아웃

번호, 체크박스 등으로 항목을 나열하는 패턴. 소스: `center-patterns/`

공통 레이아웃 토큰은 `_layout-tokens.md` 참조.

---

## 넘버 리스트 2컬럼 (C03)

**구도:** 좌측 타이틀 + 2컬럼 넘버 리스트 (3+3)
**소스:** `center-patterns/center-01-03.html` C03

**핵심 CSS:**
- `.slide { background: #F8FAFC; justify-content: center; padding: 2.5cqw 5cqw 4cqw; }`
- 타이틀: 좌측 정렬, 2.3cqw
- 리스트: `display: grid; grid-template-columns: 1fr 1fr; gap: 0 3cqw;`
- 각 아이템: flex row, gap 1.5cqw, padding 1.2cqw 0, border-bottom 1px
- 넘버 배지: 원형 (2.5cqw), primary bg, white text, 1.1cqw bold
- 텍스트: 제목 (1.15cqw bold) + 설명 (0.9cqw, muted)

**레이아웃:**
```
┌──────────────────────────────────────┐
│  프로젝트 진행 순서                  │
│  6단계 체계적 프로세스               │
│                                      │
│  ① 요구사항 분석     ④ 베타 런칭    │
│    설명 텍스트         설명 텍스트    │
│  ──────────────     ──────────────   │
│  ② 설계/프로토타입   ⑤ 피드백 반영  │
│    설명 텍스트         설명 텍스트    │
│  ──────────────     ──────────────   │
│  ③ 개발 및 테스트    ⑥ 정식 출시    │
│    설명 텍스트         설명 텍스트    │
│                                      │
└──────────────────────────────────────┘
```

**무드:** 프로세스, 아젠다, 순서 안내

---

## 체크리스트 (C09)

**구도:** 좌측 타이틀 + 진행바 + 2컬럼 체크리스트
**소스:** `center-patterns/center-07-09.html` C09

**핵심 CSS:**
- `.slide { background: #F5F6FA; padding: 3.5cqw 5cqw; }`
- 타이틀: 좌측 정렬, 2.3cqw
- 진행률 텍스트: subtitle에 "D-14 기준 · 진행률 78%"
- 진행바: full width, 0.55cqw height, emerald fill, rounded track
- 리스트: `display: grid; grid-template-columns: 1fr 1fr; gap: 0.8cqw 4cqw;`
- 각 아이템: flex row, gap 0.8cqw
- 완료: 초록 원형 ✓ (SVG) + 기본 색상 텍스트
- 미완료: 회색 outline 원 (SVG) + muted 텍스트
- 하단 footnote: "마지막 업데이트: 날짜 시간" (0.8cqw, muted)

**레이아웃:**
```
┌──────────────────────────────────────┐
│  프로젝트 런칭 체크리스트            │
│  D-14 기준 · 진행률 78%             │
│  ████████████████░░░░░  78%         │
│                                      │
│  ✅ 서비스 개발 완료   ✅ 마케팅 소재 │
│  ✅ QA 테스트 통과     ✅ 랜딩페이지  │
│  ✅ 디자인 가이드      ○ 보도자료    │
│  ✅ API 문서 배포      ○ 인플루언서  │
│  ○ 베타 피드백 반영   ○ 정식 출시   │
│                                      │
│  마지막 업데이트: 2026.03.28 14:30   │
└──────────────────────────────────────┘
```

**무드:** 프로젝트 관리, 진행 상황, 런칭 준비

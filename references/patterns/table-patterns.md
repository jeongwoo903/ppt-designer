# 테이블 슬라이드 패턴 라이브러리

검증된 테이블 슬라이드 3종 + 베이스 토큰. 전체 소스는 `table-patterns/table-best.html`, `table-variations.html` 참조.

## 베이스 토큰 (확정값 — 모든 테이블에 적용)

```css
/* 슬라이드 */
.slide { padding: 2cqw 4.5cqw 5cqw; justify-content: center; }

/* 타이틀 */
.title-block { margin-bottom: 3.7cqw; }
.title-label { font-size: 0.85cqw; font-weight: 700; letter-spacing: .12em; }
.title-main { font-size: 2.2cqw; font-weight: 800; }
.title-sub { font-size: 0.95cqw; }

/* 테이블 카드 */
.table-card { width: 80%; margin: 0 auto; border-radius: 1cqw; box-shadow: 0 2px 16px rgba(0,0,0,.07); overflow: hidden; }

/* 테이블 */
table { border-collapse: collapse; }
thead th { padding: 1cqw 1.2cqw; font-size: 0.95cqw; font-weight: 700; }
thead th:first-child { text-align: left; padding-left: 2cqw; width: 28%; }
tbody td { padding: 1cqw 1.2cqw; font-size: 0.95cqw; font-weight: 500; }
tbody td:first-child { text-align: left; padding-left: 2cqw; font-weight: 600; }
tbody td:last-child { font-weight: 700; color: primary; }

/* 하이라이트 행 */
tbody tr.highlight td { background: primary; color: #fff; font-weight: 700; padding-top: 1cqw; padding-bottom: 0.9cqw; }
/* border-radius 사용하지 않음 — border-collapse와 충돌 */

/* 푸터 */
.table-footer { margin-top: 2.7cqw; font-size: 0.75cqw; color: muted; }
```

**핵심 규칙:**
- `border-collapse: collapse` 사용 (separate + spacing은 라운딩 깨짐 유발)
- 하이라이트 행에 border-radius 금지
- 테이블 너비 80%, 슬라이드 850px 이하면 세로 중앙 배치
- 타이틀은 테이블 위치에 독립적

---

## V1 — 센터 타이틀 + 풀 테이블 (기본형)

**구도:** 타이틀 중앙 + 80% 테이블 중앙 + 하단 footer
**용도:** 예산, 매출, 일반 데이터

**레이아웃:**
```
┌──────────────────────────────────────┐
│                                      │
│        REVENUE REPORT                │
│        분기별 매출 현황              │
│        2026년 상반기 · 단위: 억원    │
│                                      │
│   ┌──────────────────────────────┐   │
│   │ 구분  │ 1월 │ 2월 │ ... │ 합계 │   │
│   │ 온라인│ 2.8 │ 3.1 │     │ 17.3 │   │
│   │ ...   │     │     │     │      │   │
│   │▌합계  │ 5.8 │ 6.6 │     │ 38.2▐│   │
│   └──────────────────────────────┘   │
│        * 관리회계 기준                │
│                                      │
└──────────────────────────────────────┘
```

**무드:** 깔끔, 범용, 데이터 중심

---

## V2 — 좌측 정렬 + 비교 테이블

**구도:** 타이틀 좌측(80% inner) + 80% 비교 테이블 + footer 좌측
**용도:** 플랜 비교, 스펙 비교, 기능 비교

**핵심 CSS:**
- `.title-block { display: flex; justify-content: center; }`
- `.title-inner { width: 80%; text-align: left; }`
- `.table-card { width: 80%; }`
- `.table-footer { width: 80%; margin: 0 auto; text-align: left; }`
- 추천 컬럼: 전체 열에 tint 배경 (#FFF1F2 등)
- ✓ = accent color, — = muted

**레이아웃:**
```
┌──────────────────────────────────────┐
│                                      │
│   PRICING                            │
│   서비스 플랜 비교                   │
│   부가세 별도 · 연간 결제 기준       │
│                                      │
│   ┌────────────────────────────┐     │
│   │ 기능 │ Free│Basic│Pro⭐│Ent│     │
│   │ 사용자│ 3  │ 10  │ 50  │ ∞ │     │
│   │ ...  │    │     │(tint)│   │     │
│   └────────────────────────────┘     │
│   * Pro 플랜 연간 결제 시 2개월 무료 │
│                                      │
└──────────────────────────────────────┘
```

**무드:** 비교, SaaS, 가격표

---

## V3 — 좌우 분할 Market Insight

**구도:** 좌 30% 다크 패널 + 우 70% 라이트 패널 (테이블 + 인사이트 배너)
**용도:** 분석 리포트, 경쟁사 비교, 시장 현황

**핵심 CSS:**
- 슬라이드: `padding: 1.2cqw; flex-direction: row; align-items: stretch;`
- 좌측: `width: 30%; background: #1A1F2E; border-radius: 1cqw; justify-content: center; gap: 5cqw;`
- 좌측 콘텐츠: `.v3-left-content { flex: 1에서 제거; justify-content: center; }` — 타이틀 세로 중앙
- 좌측 하단: 통계 카드 (border: 1px solid rgba(255,255,255,.1))
- 우측: `flex: 1; justify-content: center; padding: 2.5cqw 3cqw;`
- 테이블: 헤더 없음 (muted 컬럼명만), thin border, 하이라이트 행 = subtle tint + 좌측 accent bar
- 하단: 다크 인사이트 배너 (아이콘 + 텍스트)
- 슬라이드 넘버: 우측 패널 하단

**레이아웃:**
```
┌─────────┬────────────────────────────┐
│ MARKET  │ 경쟁사별 상세 지표  [날짜] │
│ INSIGHT │                            │
│         │  컴퍼니    점유율   성장률  │
│ 시장    │  Alpha     32.1%   +2.4%   │
│ 점유율  │ ▌본사      24.5%   +8.2% ▐│
│ 현황    │  Beta      18.4%   -1.2%   │
│         │  ...                       │
│ 설명... │                            │
│         │ ┌────────────────────────┐ │
│ ┌─────┐ │ │ 💡 Insight: 본사의... │ │
│ │$4.2B│ │ └────────────────────────┘ │
│ │24.5%│ │                      03/03 │
│ └─────┘ │                            │
└─────────┴────────────────────────────┘
```

**무드:** 분석, 리포트, 컨설팅

---

## 안티패턴 (테이블 공통)

| 문제 | 설명 |
|------|------|
| 셀 패딩 과다 | 1.2cqw 이상이면 셀이 헐렁 — 1cqw 기준 |
| flex: 1로 테이블 늘리기 | 테이블 컨테이너에 flex:1 쓰면 셀이 비정상 확대 |
| border-separate + spacing | 라운딩 깨짐 유발 — collapse 사용 |
| 하이라이트 행 border-radius | collapse에서 무시됨, 쓰지 말 것 |
| 테이블-배경 동화 | 배경과 테이블 색이 같으면 shadow/border로 구분 |
| 타이틀-테이블 결합 | 타이틀은 테이블과 독립적으로 배치 |

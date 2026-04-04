# 3-4 Column 슬라이드 패턴 라이브러리

검증된 컬럼 레이아웃 11종. Playwright 스크린샷 QA를 거쳐 확정.
전체 소스는 `workspace/column-patterns/columns-v3.html`, `columns-batch1~3.html` 참조.

## 공통 규칙

- 슬라이드: `justify-content: center` (세로 중앙 기본)
- 콘텐츠가 슬라이드 높이의 **60-80%를 채워야** 함 — 부족하면 폰트/패딩 키우기
- 컬럼 간격: 2cqw (디바이더 사용 시 margin으로 분리)
- **flex:1 금지** — 카드/그리드 컨테이너에 사용하지 않음
- 타이틀↔콘텐츠: 최소 2.5cqw 간격
- 생성 후 반드시 **Playwright 스크린샷 QA** 수행 (아래 참조)

---

## P01 — 3-Column Icon Feature (센터 타이틀)

**구도:** 센터 타이틀 + 3컬럼 (이모지 + 제목 + 설명), 디바이더로 구분
**배경:** Light (#F5F6FA)
**용도:** 핵심 기능 소개, 서비스 장점

---

## P02 — 3-Column Accent Bar (좌측 타이틀)

**구도:** 좌측 정렬 타이틀 + 3컬럼, 각 컬럼 상단에 컬러 accent bar (3px)
**배경:** Light (#FAFAFA)
**용도:** 채널 전략, 카테고리별 항목 나열

---

## P03 — 4-Column KPI Cards (센터 타이틀)

**구도:** 센터 타이틀 + 4개 KPI 카드 (이모지 + 큰 숫자 + 라벨 + 변화율)
**배경:** White
**용도:** 핵심 성과, 분기 지표

---

## C12 — Dark Pain→Solution 3×2 Grid

**구도:** 다크 배경, 상단 3 Pain 카드 + 커넥터 + 하단 3 Solution 카드
**배경:** Dark (#1E1E2E)
**핵심:** 글래스 카드 (rgba bg + border), ✕ 빨강 / ✓ 초록 아이콘, 하이라이트 수치
**용도:** 문제/해결, Pain Point→솔루션

---

## C13 — Staggered 3-Column Cards

**구도:** 센터 타이틀 + 3카드, 가운데 카드가 위로 올라간 계단 효과
**배경:** Light (#EDF2F7)
**핵심:** `transform: translateY(-2cqw)` 중앙 카드, 각 카드 상단 컬러 accent bar
**용도:** 서비스 핵심 가치, 차별화 포인트

---

## C15 — 4-Column As-Is → To-Be

**구도:** 좌측 타이틀 + 4카드, 각 카드 상하 분할 (회색 AS-IS / 컬러 TO-BE)
**배경:** Light (#F3F4F6)
**핵심:** 넘버 뱃지 (01-04), 각 카드 TO-BE 영역 다른 컬러 (인디고/초록/주황/빨강)
**용도:** UX 개선, Before/After 비교, 리뉴얼

---

## C16 — News/Article Citation Grid (비대칭)

**구도:** 좌측 타이틀 + 비대칭 그리드 (좌 55% 대형 카드 + 우 45% 소형 카드 2장)
**배경:** White + subtle blue tint (#F8FAFF)
**핵심:** 소스 dot + 날짜 + 헤드라인 + 본문 + 카테고리 칩
**용도:** 시장 분석, 뉴스 인용, 트렌드 리포트

---

## C17 — Dark Card + Hashtag Chips (타겟 분석)

**구도:** 상단 라이트 타이틀 + 하단 65% 다크 카드, 내부 3컬럼
**배경:** Light top + Dark (#1E293B) bottom card
**핵심:** 세그먼트 칩 (MAIN/SUB/B2B), 컬러 해시태그 칩, rgba 디바이더
**용도:** 타겟 고객 분석, 세그먼트, 페르소나

---

## C18 — Full Color BG + Overlapping Cards (Pricing)

**구도:** 퍼플 배경 + 3카드 겹침 배치, 중앙 Pro 카드 돌출
**배경:** Bold purple (#7C3AED)
**핵심:** 카드 겹침 (margin -1cqw), Pro translateY(-1.5cqw) + scale(1.02), 추천 뱃지, 이모지 장식
**용도:** 가격 비교, 서비스 플랜, 구독 모델

---

## C19 — Image Overlay + Need→Solution Flow

**구도:** 우주 사진 + 다크 오버레이, 상단 3 글래스 카드 (Need) → 하단 3 화이트 카드 (Solution)
**배경:** Unsplash 이미지 + rgba(10,10,30,.78) overlay
**핵심:** 글래스모피즘 Need 카드, 화이트 Solution 카드, 커넥터
**용도:** 고객 니즈 → 솔루션, 가치 제안
**주의:** 콘텐츠 양이 적으면 상단 편중 — 설명 텍스트 충분히 넣을 것

---

## C20 — CSS Bar Chart + KPI Grid Split

**구도:** 좌 48% CSS 바 차트 + 우 48% 2×2 KPI 카드 그리드
**배경:** Light (#F3F4F6)
**핵심:** 순수 CSS 막대 그래프 (높이 비례), 하이라이트 KPI 카드 (primary bg)
**용도:** 성과 대시보드, 분기 리포트

---

## 안티패턴 (QA에서 발견된 반복 실패)

| 문제 | 설명 |
|------|------|
| 콘텐츠 상단 편중 | justify-content: center 필수. 그래도 부족하면 콘텐츠 양 늘리기 |
| 슬라이드 40%만 채움 | 폰트 크기, 패딩, 설명 텍스트를 키워서 60%+ 채우기 |
| 카드 overflow | 카드 총 폭 + 갭 + 패딩이 960px 초과 — 계산 필수 |
| 카드 내 겹침 | badge/icon의 position:absolute 시 다른 요소와 겹침 확인 |
| 디바이더 안 보임 | align-self: stretch 필요 (flex 컨테이너 안에서) |
| 다크 슬라이드 콘텐츠 z-index | ::before overlay 위에 콘텐츠가 보이려면 z-index 설정 필수 |

---

## Playwright 스크린샷 QA (필수 프로세스)

HTML 슬라이드 생성 후, **반드시** Playwright로 스크린샷을 찍어 시각적으로 검증한다.
이 프로세스를 거치면 레이아웃 깨짐, overflow, 여백 불균형을 사전에 잡을 수 있어 **품질이 크게 향상**된다.

```python
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

async def qa_screenshots(html_path, output_dir):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={'width': 960, 'height': 540},
            device_scale_factor=2
        )
        await page.goto(Path(html_path).resolve().as_uri(), wait_until='networkidle')
        await page.wait_for_timeout(3000)

        viewports = await page.query_selector_all('.viewport')
        for i, vp in enumerate(viewports):
            await vp.screenshot(
                path=f'{output_dir}/slide-{i+1:02d}.png',
                type='png'
            )
            print(f'Captured slide {i+1}')

        await browser.close()

asyncio.run(qa_screenshots('path/to/slides.html', 'path/to/qa/'))
```

**QA 체크리스트:**
1. 콘텐츠가 슬라이드의 60-80%를 채우는가?
2. 세로 중앙 정렬이 되어 있는가?
3. overflow 없는가? (요소가 960x540 밖으로 나가지 않는가)
4. 카드 내부 요소가 겹치지 않는가?
5. 다크 슬라이드에서 텍스트 대비가 충분한가?
6. 이모지가 깨지지 않았는가?

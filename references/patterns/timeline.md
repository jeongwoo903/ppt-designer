# 타임라인/프로세스 슬라이드 패턴 라이브러리

검증된 타임라인 슬라이드 6종. 전체 소스는 `workspace/timeline-patterns/timelines.html` 참조.

## HTML 구조 규칙

```html
<div class="slide tlXX">
  <div class="title-block">         ← 슬라이드별 스코핑 (.tlXX .title-block)
    <div class="title-head">        ← label + title (gap: 0.6cqw)
      <div class="slide-label">...</div>
      <div class="slide-title">...</div>
    </div>
    <div class="slide-sub">...</div>
  </div>
  <div class="slide-content">       ← 콘텐츠 영역 (독립, flex:1 또는 flex:0.9)
    ...timeline/process content...
  </div>
</div>
```

**핵심 규칙:**
- `.title-block` CSS는 공통이 아닌 슬라이드별 독립 정의 (`.tl01 .title-block`)
- 콘텐츠 영역은 `slide-content`로 감싸서 타이틀과 독립적으로 세로 정렬
- 컴포넌트(노드, 카드)는 컨테이너(크기) > padding(여백) > inner(배치) 3단계 분리
- bg와 contents 분리 — bg는 ::before 또는 별도 div, contents는 relative z-index

---

## TL01 — Horizontal Steps

**구도:** 센터 타이틀 + 4단계 수평 스텝 (원형 넘버 + 커넥터 라인)
**용도:** 제품 출시 로드맵, 단계별 프로세스

**핵심 구조:**
- 4개 넘버 원형 (done/active/todo 상태 구분)
- 수평 커넥터 라인 (진행 상태에 따라 채워진 부분과 빈 부분)
- 각 스텝: 원형 + 제목 + 설명 + 상태 태그

**무드:** 클린, 로드맵, 단계별 진행

---

## TL04 — Gantt-Style Timeline

**구도:** 좌측 작업명 + 우측 주차별 가로 바
**용도:** 실행 계획, 프로젝트 일정, 주차별 작업

**핵심 구조:**
- 상단 주차 헤더 (W1~W6)
- 각 행: 작업명 + 해당 주차에 걸쳐있는 컬러 바
- 작업 그룹별 다른 색상
- 그리드 배경으로 주차 구분

**무드:** 체계적, 프로젝트 관리, 실행력

---

## TL05 — Cards with Arrows (퍼널)

**구도:** 센터 타이틀 + 4개 카드 + 화살표 연결
**용도:** 마케팅 퍼널, 전환 프로세스, 단계별 지표

**핵심 구조:**
- 4개 카드 (이모지 + 단계명 + 핵심 수치 + 설명 + 전환율)
- 카드 사이 → 화살표
- 각 카드에 subtle shadow

**무드:** 데이터 드리븐, 퍼널, 전환율

---

## TL06 — Circular Cycle (좌우 분할)

**구도:** 좌 30-35% 다크 패널 + 우측 순환 다이어그램
**용도:** 애자일 스프린트, 반복 프로세스, 사이클

**핵심 구조:**
- 좌측 다크 패널: 타이틀 + 설명 + 현재 상태 카드
- 우측: 4방향 노드 (상/우/하/좌) + 중앙 아이콘
- 노드 간 화살표로 순환 표현
- 노드: padding으로 크기 제어 (width/height 고정 아님)

**무드:** 애자일, 반복, 순환 구조

---

## TL09 — Split Panel + Phase Flow

**구도:** 좌 30% 다크 패널 + 우측 4-페이즈 카드 흐름
**용도:** 출시 타임라인, 캠페인 단계, 멀티 페이즈 프로젝트

**핵심 구조:**
- 좌측 다크 패널: 타이틀(좌측 정렬) + 설명 + 주요 일정 리스트
- 우측 라이트: 4개 페이즈 카드 (넘버 + 이모지 + 제목 + 불릿 항목)
- 페이즈 간 화살표 연결

**무드:** 전략적, 런칭, 단계별 실행

---

## TL10 — Metro/Subway Map

**구도:** 다크 배경 + 3개 병렬 노선 + 분기별 격자
**용도:** 기술 로드맵, 멀티트랙 계획, 분기별 전략

**핵심 구조:**
- Q1~Q4 시간 축 (상단 헤더)
- 3개 병렬 노선 (프론트엔드/백엔드/인프라 등)
- 각 노선에 역사 도트 (크기로 중요도 표현)
- 노선별 다른 컬러

**무드:** 테크, 로드맵, 멀티트랙

---

## 탈락 패턴

| # | 패턴 | 사유 |
|---|------|------|
| TL02 | Vertical Timeline | 채택 안 됨 |
| TL03 | Chevron Process | 채택 안 됨 |
| TL07 | Stacked Cards | 채택 안 됨 |
| TL08 | Progress Steps | 채택 안 됨 |

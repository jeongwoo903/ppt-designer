# ppt-designer

Claude Code 스킬 — 무드보드 기반 디자인 시스템으로 프레젠테이션을 제작합니다.

## 핵심 인사이트

AI가 만든 슬라이드가 "AI스러운" 이유는 디자인 시스템 단계를 건너뛰기 때문입니다.
이 스킬은 올바른 순서를 강제합니다: **무드보드 → 디자인 토큰 → 레이아웃 패턴 → 슬라이드**

## 아웃풋

HTML 슬라이드 + PDF. 순수 슬라이드 콘텐츠만 생성하고, 프레젠테이션/편집 기능은 외부 스크립트가 처리.

## 파일 구조

```
ppt-designer/
├── SKILL.md                          # 메인 스킬 정의
├── references/
│   ├── korean-typography.md          # 한국어 타이포 규칙
│   ├── slide-layouts.md              # 레이아웃 좌표 패턴
│   ├── adr.md                        # Architecture Decision Records (18개)
│   ├── template-map.md              # 마스터 템플릿 매핑
│   ├── emoji-cdn.md                  # 3D 이모지 CDN 레퍼런스
│   └── emoji-index.json              # 3,054개 이모지 전체 인덱스
├── scripts/
│   ├── presenter.js                  # 프레젠테이션 모드 (자동 주입)
│   ├── editor.js                     # 스타일 편집기 (자동 주입)
│   └── export-pdf.py                 # HTML → 300 DPI PDF
└── examples/
    └── startup-pitch/                # AI SaaS 피치덱 예시 (8장)
        └── startup-pitch.html
```

## 설치

```bash
# Claude Code 스킬 디렉토리에 복사
cp -r . ~/.claude/skills/ppt-designer/

# PDF 추출 의존성
pip install playwright Pillow
playwright install chromium
```

## 사용법

Claude Code에서:
```
"이 내용으로 PPT 만들어줘"
"전략제안서 발표자료 제작해줘"
"이 PDF 기반으로 presentation 만들어줘"
```

스킬이 자동 트리거되어:
1. 무드보드/레퍼런스 요청
2. 디자인 토큰 추출 + 확인
3. HTML 슬라이드 생성 + PDF 추출

## 아키텍처

### HTML은 순수 콘텐츠만

생성되는 HTML은 `.frames > .frame > .viewport > .slide` 구조의 슬라이드 콘텐츠만 포함.
모든 사이징은 `cqw` 단위 (container query width).

```html
<script src="scripts/presenter.js"></script>  <!-- 프레젠테이션 모드 -->
<script src="scripts/editor.js"></script>      <!-- 스타일 편집기 -->
```

### presenter.js

- "프레젠테이션" 버튼 → 풀스크린 오버레이
- 키보드: P 시작, → Space 다음, ← 이전, F 전체화면, ESC 종료
- 터치 스와이프 + 마우스 휠 지원
- 썸네일 클릭 → 해당 슬라이드부터 시작
- 자동 워터마크 (meta author + HTML comment)

### editor.js

- "수정" 버튼 → 스타일 편집 패널
- 글로벌 탭: CSS 커스텀 프로퍼티 컬러 편집
- 요소 탭: 클릭 → font-size, line-height, color, padding, margin, 텍스트 내용 편집
- 이미지: width/height 조절
- 되돌리기 (Ctrl+Z, 100단계) + 저장 (Ctrl+S, localStorage)
- HTML 다운로드 (에디터 UI 제거, 수정 반영)

### 에셋 (CDN)

- **3D 이모지**: `https://static.kid-o.cloud/ppt-designer/emoji/{category}--{name}.png` (3,054개)
- **Unsplash 사진**: URL 직접 사용 (핫링크 허용)
- 로컬 다운로드 없음 → HTML 하나로 자립

## PDF 추출

```bash
python3 scripts/export-pdf.py input.html output.pdf
```
- Playwright 기반 2x 해상도 캡처 → 300 DPI PDF

## 디자인 규칙 (ADR 18개)

- 타이틀 accent bar 금지 — AI 슬라이드의 #1 특징
- 한국어 타이틀 22-26pt — 28pt+ 는 배너 광고
- 카드 최소화 — 플랫 레이아웃 + 디바이더 우선
- Fluent Emoji 3D — 시각적 풍성함
- 데이터 슬라이드에 장식 이미지 금지
- container-type 사용 시 viewport 높이 명시 필수

전체 목록: [references/adr.md](references/adr.md)

## 라이센스

MIT

Fluent Emoji: MIT License (Microsoft Corporation)
Unsplash Images: [Unsplash License](https://unsplash.com/license)
Pretendard Font: SIL Open Font License

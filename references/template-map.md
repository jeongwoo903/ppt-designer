# Master Template Slide Map

마스터 템플릿 `barkery-master-template.pptx` 기반 슬라이드 구조.
스킬이 슬라이드를 복제하고 텍스트/이미지를 교체할 때 이 맵을 참조.

## Slide Index

| # | ID | Type | Background | 용도 |
|---|-----|------|------------|------|
| 1 | cover-dark | Cover | Dark #18171F | 표지 (제목+이미지+KPI 3개) |
| 2 | agenda | Agenda | Light #F9F9FB | 목차 (사이드바+6항목) |
| 3 | problem | Text+Visual | White #FFFFFF | 문제 제기 (좌 텍스트+우 이미지) |
| 4 | three-col | 3-Column | Light #F9F9FB | 채널/비교 (아이콘+불릿) |
| 5 | before-after | 2-Column | White #FFFFFF | Before/After (틴트 패널) |
| 6 | kpi-grid | KPI Grid | Light #F9F9FB | 2x3 지표 그리드 |
| 7 | table | Table | White #FFFFFF | 예산/데이터 테이블 |
| 8 | journey | Flow | Light #F9F9FB | 5단계 프로세스/여정 |
| 9 | quote | Quote | Violet tint #F8F5FF | 인용문/핵심 메시지 |
| 10 | section-div | Section Divider | Dark #18171F | 챕터 구분 |
| 11 | closing | Closing/CTA | Dark #18171F | 마무리+연락처 |

## Replaceable Content Per Slide

### Slide 1: Cover
- Section label (e.g., "MARKETING PROPOSAL · 2026")
- Title (multi-line, max 3줄)
- Subtitle (1-2줄)
- 3 stat cards: label + value 쌍
- Cover image (right side)

### Slide 2: Agenda
- 목차 제목
- 6 section items: 번호 + 영문태그 + 한글제목 + 설명

### Slide 3: Text + Visual
- Section label (e.g., "Problem")
- Title (multi-line)
- Body text (2 paragraphs)
- Pull quote (accent box)
- Right image

### Slide 4: 3-Column
- Section label + Title + Subtitle
- 3 columns: icon image + header + subheader + bullet items (4개씩)

### Slide 5: Before/After
- Title + Subtitle
- Left (Before): header + subheader + 5 items
- Right (After): header + subheader + 5 items

### Slide 6: KPI Grid
- Section label + Title
- 6 metrics: label + number + unit + change indicator

### Slide 7: Table
- Title + Subtitle (단위 표시)
- Header row + 6 data rows + totals row
- 8 columns

### Slide 8: Journey/Flow
- Section label + Title
- 5 stages: number + icon + title + description

### Slide 9: Quote
- Quote text (2-3줄)
- Attribution
- Label

### Slide 10: Section Divider
- Section number (large ghost)
- Section label
- Section title
- Description
- 4 subsection keywords

### Slide 11: Closing
- Header label
- Title (2줄)
- Supporting message
- 3 next steps
- 5 contact items (icon + label + value)
- Brand footer

## Media Files

| File | Used In | Description | Replaceable |
|------|---------|-------------|-------------|
| image1.jpg | Slide 1 | 커버 사진 | Yes |
| image2.jpg | Slide 3 | 콘텐츠 이미지 | Yes |
| image3.png | Slide 4 | 컬럼1 아이콘 (Fluent Emoji) | Yes |
| image4.png | Slide 4 | 컬럼2 아이콘 | Yes |
| image5.png | Slide 4 | 컬럼3 아이콘 | Yes |
| image6-10.png | Slide 8 | 여정 단계 아이콘 | Yes |

## Template Usage

스킬이 이 템플릿을 사용하는 방식:

1. **unpack** — PPTX를 ZIP으로 풀기
2. **복제** — 필요한 레이아웃의 slide XML을 복제
3. **교체** — `<a:t>` 텍스트 노드를 새 콘텐츠로 교체
4. **이미지 교체** — media/ 폴더의 이미지를 새 이미지로 대체 (같은 rId 유지)
5. **불필요한 슬라이드 삭제** — 사용하지 않는 레이아웃 제거
6. **repack** — XML을 다시 PPTX로 압축

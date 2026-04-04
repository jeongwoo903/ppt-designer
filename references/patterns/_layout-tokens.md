# 공통 레이아웃 토큰

패턴 파일에서 참조하는 레이아웃별 공통 CSS 토큰.

---

## 좌우 분할 (Split Layout)

```css
/* 슬라이드 */
.slide { display: flex; flex-direction: row; align-items: stretch; }

/* 좌측 텍스트 패널 */
.left {
  padding: 7cqw 4cqw 7cqw 6cqw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5~2cqw;
}

/* 섹션 라벨 */
.top-label {
  font-size: 0.9cqw;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
}

/* 메인 타이틀 */
.main-title {
  font-size: 2.4~3cqw;
  font-weight: 800;
  letter-spacing: -.02em;
  line-height: 1.25~1.3;
}

/* 설명 */
.desc {
  font-size: 1.1~1.25cqw;
  line-height: 1.65~1.7;
  font-weight: 400;
}

/* 이모지 */
.em { width: 3.8cqw; height: 3.8cqw; object-fit: contain; }
.em-lg { width: 5cqw; height: 5cqw; object-fit: contain; }
```

**규칙:**
- 좌우 비율: 38:62 ~ 55:45 비대칭 (50:50 금지)
- 좌측은 항상 `justify-content: center`
- 라벨 → 타이틀 → 설명 순서
- 우측 카드에 `flex: 1` 금지 — padding/gap으로 조절
- 좌측 좌패딩(6cqw) > 우측 우패딩(5cqw)
- 같은 슬라이드 내 이모지는 동일 크기
- 전체 다크일 때 우측을 약간 밝게 (#1E293B)

---

## 센터 (Center Layout)

```css
.slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2cqw 4.5cqw 5cqw;
}
```

테이블, 단일 콘텐츠 슬라이드에 사용.

"""
HTML 슬라이드 → 16:9 고해상도 PDF 변환 (Playwright Python)
Usage: python export-pdf.py [input.html] [output.pdf]

Requires: playwright, Pillow
Python: /Users/a./.pyenv/versions/3.12.1/bin/python3
"""
import sys
import asyncio
import tempfile
from pathlib import Path

# 2x 해상도 (1920x1080 캡처 → 300 DPI PDF)
SCALE = 2
VIEWPORT_W = 960
VIEWPORT_H = 540
CAPTURE_W = VIEWPORT_W * SCALE
CAPTURE_H = VIEWPORT_H * SCALE
PDF_DPI = 300


async def capture_slides(html_path: Path, pdf_path: Path):
    from playwright.async_api import async_playwright

    html_uri = html_path.resolve().as_uri()

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(
            viewport={"width": CAPTURE_W, "height": CAPTURE_H},
            device_scale_factor=SCALE,
        )
        await page.goto(html_uri, wait_until="networkidle")
        await page.wait_for_timeout(3000)

        # UI 요소 + present overlay 숨기기
        await page.evaluate("""
            document.querySelectorAll('.export-btn, .nav, .page-header, .present-btn, .present-overlay, .slide-editor-ui').forEach(el => el.style.display = 'none');
        """)
        await page.wait_for_timeout(500)

        # 듀얼 모드: .frames .viewport를 캡처. 없으면 .slide 직접 캡처 (레거시)
        slides = await page.query_selector_all(".frames .viewport")
        if not slides:
            slides = await page.query_selector_all(".slide")
        print(f"Found {len(slides)} slides — capturing at {CAPTURE_W}x{CAPTURE_H} ({SCALE}x)")

        tmp_dir = Path(tempfile.mkdtemp(prefix="slides-"))
        png_files = []

        for i, slide in enumerate(slides):
            png_path = tmp_dir / f"slide_{i:03d}.png"
            await slide.screenshot(path=str(png_path), type="png")
            png_files.append(png_path)
            print(f"  Captured slide {i + 1}/{len(slides)}")

        await browser.close()

    # PNG → PDF (Pillow, 고해상도)
    from PIL import Image

    images = [Image.open(p).convert("RGB") for p in png_files]
    images[0].save(
        str(pdf_path),
        "PDF",
        save_all=True,
        append_images=images[1:],
        resolution=PDF_DPI,
    )
    print(f"PDF saved: {pdf_path} ({PDF_DPI} DPI, {len(images)} pages)")

    # cleanup
    for p in png_files:
        p.unlink()
    tmp_dir.rmdir()


def main():
    html_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "slide-preview.html"
    pdf_path = Path(sys.argv[2]) if len(sys.argv) > 2 else html_path.with_suffix(".pdf")
    asyncio.run(capture_slides(html_path, pdf_path))


if __name__ == "__main__":
    main()

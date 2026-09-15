import { expect } from "@playwright/test";
import type { Locator, Page, TestInfo } from "@playwright/test";
import { writeFile } from "node:fs/promises";

interface CopyCase {
  locator: Locator;
  before: string;
}

/** Compare old/new copy in the same real control, without changing its CSS. */
export async function checkSingleLineCopy(
  page: Page,
  testInfo: TestInfo,
  name: string,
  cases: CopyCase[],
): Promise<void> {
  const originalViewport = page.viewportSize();
  const report = [];
  try {
    for (const width of [1280, 1024]) {
      await page.setViewportSize({ width, height: 800 });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
      });
      for (const { locator, before } of cases) {
        await expect(locator).toBeVisible();
        const metrics = await locator.evaluate((element, previous) => {
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
          const nodes: Text[] = [];
          while (walker.nextNode()) {
            const node = walker.currentNode as Text;
            if (node.textContent?.trim()) nodes.push(node);
          }
          // These compact labels each have one text node, with optional icons.
          if (nodes.length !== 1)
            throw new Error(`Expected one label text node, found ${nodes.length}`);
          const node = nodes[0]!;
          const current = node.data;
          const neighboringText: Text[] = [];
          if (element.parentElement) {
            const siblings = document.createTreeWalker(element.parentElement, NodeFilter.SHOW_TEXT);
            while (siblings.nextNode()) {
              const sibling = siblings.currentNode as Text;
              if (sibling !== node && sibling.data.trim()) neighboringText.push(sibling);
            }
          }
          const measure = () => {
            const range = document.createRange();
            range.selectNodeContents(node);
            const rects = Array.from(range.getClientRects()).filter(
              (rect) => rect.width > 0 && rect.height > 0,
            );
            const lines = new Set(rects.map((rect) => Math.round(rect.top))).size;
            const box = element.getBoundingClientRect();
            const inside = (rect: DOMRect, bounds: DOMRect) =>
              rect.left >= bounds.left - 1 &&
              rect.right <= bounds.right + 1 &&
              rect.top >= bounds.top - 1 &&
              rect.bottom <= bounds.bottom + 1;
            const clipped = rects.some((rect) => {
              if (!inside(rect, box) || rect.left < 0 || rect.right > innerWidth) return true;
              // Hit-test painted text instead of assuming every DOM ancestor
              // clips fixed overlays, which can escape the sidebar's bounds.
              const y = (rect.top + rect.bottom) / 2;
              return [rect.left + 1, (rect.left + rect.right) / 2, rect.right - 1].some(
                (x) => !element.contains(document.elementFromPoint(x, y)),
              );
            });
            const neighbors = neighboringText.map((sibling) => {
              const siblingRange = document.createRange();
              siblingRange.selectNodeContents(sibling);
              return {
                text: sibling.data,
                lines: new Set(
                  Array.from(siblingRange.getClientRects())
                    .filter((rect) => rect.width > 0)
                    .map((rect) => Math.round(rect.top)),
                ).size,
              };
            });
            return {
              lines,
              clipped,
              neighbors,
              width: Math.round(box.width),
              height: Math.round(box.height),
            };
          };
          const after = measure();
          try {
            node.data = previous;
            return { text: current, before: measure(), after };
          } finally {
            node.data = current;
          }
        }, before);
        report.push({ viewport: width, ...metrics });
      }
      await page.screenshot({ path: testInfo.outputPath(`${name}-${width}.png`) });
    }
  } finally {
    if (originalViewport) await page.setViewportSize(originalViewport);
    const reportPath = testInfo.outputPath(`${name}.json`);
    await writeFile(reportPath, JSON.stringify(report, null, 2));
    await testInfo.attach(name, {
      path: reportPath,
      contentType: "application/json",
    });
  }
  for (const entry of report) {
    const label = `${entry.viewport}px: ${entry.text}`;
    expect(entry.before.lines, `Baseline should be single-line: ${label}`).toBe(1);
    expect(entry.after.lines, `Translation wrapped: ${label}`).toBe(1);
    expect(entry.after.clipped, `Translation clipped or overflowed: ${label}`).toBe(false);
    for (const [index, neighbor] of entry.before.neighbors.entries()) {
      if (neighbor.lines === 1) {
        expect(
          entry.after.neighbors[index]?.lines,
          `Adjacent text wrapped: ${label} / ${neighbor.text}`,
        ).toBe(1);
      }
    }
  }
}

import { expect, test } from "@playwright/test";

// Migration guide REQ-4, AC-4: removed and added lines are coloured with the error and success
// inks, keep their markers, and differ from each other and from unchanged lines.
test("a diff block colours removed and added lines and keeps the markers", async ({ page }) => {
  await page.goto("/docs/v1/getting-started/installation");
  const lines = page.locator("pre.language-diff .line");
  await expect(lines).toHaveCount(3);
  const line = (i: number) => lines.nth(i).evaluate((el) => ({
    text: el.textContent ?? "",
    color: getComputedStyle(el.querySelector("span") ?? el).color,
    cls: el.querySelector("span")?.className ?? "",
  }));
  const [removed, added, same] = [await line(0), await line(1), await line(2)];
  expect(removed.text.startsWith("-")).toBe(true);
  expect(added.text.startsWith("+")).toBe(true);
  expect(removed.cls).not.toBe(added.cls);
  const ink = (name: string) => page.evaluate((n) => {
    const probe = document.createElement("span");
    probe.style.color = `var(${n})`;
    document.body.append(probe);
    const c = getComputedStyle(probe).color;
    probe.remove();
    return c;
  }, name);
  expect(removed.color).toBe(await ink("--site-code-deleted"));
  expect(added.color).toBe(await ink("--site-code-value"));
  expect(same.color).not.toBe(removed.color);
  expect(same.color).not.toBe(added.color);
});

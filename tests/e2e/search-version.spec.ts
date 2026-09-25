import { expect, test } from "@playwright/test";
import { latestVersion } from "../../app/versions";
import { openSearch, results, searchInput } from "../helpers/search";

// Search REQ-4, AC-4: results come from the version being read, the latest on the landing.
for (const path of ["/", `/docs/${latestVersion.id}/components/button`]) {
  test(`results on ${path} are all ${latestVersion.id} pages`, async ({ page }) => {
    await openSearch(page, path);
    await searchInput(page).fill("pui");
    await expect(results(page).first()).toBeVisible();
    const hrefs = await results(page).evaluateAll((els) => els.map((e) => e.getAttribute("href")));
    for (const href of hrefs) expect(href).toMatch(new RegExp(`^/docs/${latestVersion.id}/`));
  });
}

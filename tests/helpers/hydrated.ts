import { expect, type Page } from "@playwright/test";

/**
 * Waits until the landing has hydrated: the hero's copy control renders only after mount. Before
 * that, key handlers are not attached and live example previews are about to be replaced (Vue
 * re-assigns v-html when hydrating), so an interaction can land on a node that goes away.
 */
export async function landingHydrated(page: Page) {
  await expect(page.locator("#hero").getByRole("button", { name: "Copy install command" })).toBeVisible();
}

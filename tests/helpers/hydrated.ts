import { expect, type Page } from "@playwright/test";

/**
 * Waits until the landing has hydrated: the hero's copy control renders only after mount. Before
 * that, key handlers are not attached and live example previews are about to be replaced (Vue
 * re-assigns v-html when hydrating), so an interaction can land on a node that goes away.
 */
export async function landingHydrated(page: Page) {
  await expect(page.locator("#hero").getByRole("button", { name: "Copy install command" })).toBeVisible();
}

/**
 * Waits until any page has finished hydrating: Nuxt clears `isHydrating` once the app is mounted.
 * While it hydrates, example previews are re-rendered and the layout can still move, so a scroll
 * made earlier may no longer hold the element it aimed at.
 */
export async function pageHydrated(page: Page) {
  await page.waitForFunction(() => {
    const root = document.querySelector("#__nuxt") as unknown as { __vue_app__?: { $nuxt?: { isHydrating?: boolean } } } | null;
    return root?.__vue_app__?.$nuxt?.isHydrating === false;
  });
}

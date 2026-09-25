// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { createSSRApp, defineComponent, h, ref } from "vue";
import { renderToString } from "vue/server-renderer";
import { useMotion } from "../../app/composables/useMotion";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

// EDGE-3, NFR-3: the server renders final states; no timer or observer exists before mount.
describe("useMotion", () => {
  it("creates no timer and no observer before mount", async () => {
    vi.useFakeTimers();
    const observer = vi.fn();
    vi.stubGlobal("IntersectionObserver", observer);
    let state: ReturnType<typeof useMotion> | undefined;
    const Demo = defineComponent({
      setup() {
        const el = ref<HTMLElement | null>(null);
        state = useMotion(el);
        state.after(100, () => {});
        return () => h("div", { ref: el }, "final state");
      },
    });
    expect(await renderToString(createSSRApp(Demo))).toContain("final state");
    expect(vi.getTimerCount()).toBe(0);
    expect(observer).not.toHaveBeenCalled();
    expect(state!.allowed.value).toBe(false);
    expect(state!.inView.value).toBe(false);
  });
});

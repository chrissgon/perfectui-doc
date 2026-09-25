import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/**
 * Client-only motion for the landing's demos (NFR-3, EDGE-3). The server renders final states;
 * nothing here runs before mount. `allowed` turns true after mount unless reduced motion is
 * requested; `inView` follows the element once it crosses `threshold`. `after` schedules a
 * timer only while mounted and clears every timer on unmount.
 */
export function useMotion(target: Ref<HTMLElement | null>, options: { threshold?: number } = {}) {
  const allowed = ref(false);
  const inView = ref(false);
  const timers = new Set<ReturnType<typeof setTimeout>>();
  let mounted = false;
  let observer: IntersectionObserver | undefined;

  function after(ms: number, fn: () => void) {
    if (!mounted || !allowed.value) return;
    const id = setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
  }

  function cancel() {
    for (const id of timers) clearTimeout(id);
    timers.clear();
  }

  onMounted(() => {
    mounted = true;
    allowed.value = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!allowed.value || !target.value) return;
    observer = new IntersectionObserver(
      ([entry]) => (inView.value = Boolean(entry?.isIntersecting)),
      { threshold: options.threshold ?? 0.3 },
    );
    observer.observe(target.value);
  });

  onBeforeUnmount(() => {
    mounted = false;
    observer?.disconnect();
    cancel();
  });

  return { allowed, inView, after, cancel };
}

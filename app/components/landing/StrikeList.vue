<template>
  <section id="nothing-to-undo" class="site-inverse relative overflow-hidden" style="background: var(--pui-bg); color: var(--pui-text)">
    <div aria-hidden="true" class="rules pointer-events-none absolute inset-0" />
    <div aria-hidden="true" class="glow pointer-events-none absolute -bottom-[460px] -left-[360px] size-[900px]" />
    <div class="relative mx-auto max-w-[1200px] px-[clamp(20px,5vw,40px)] py-[clamp(96px,12vw,160px)]">
      <h2 class="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em]">{{ section.headline }}</h2>
      <p class="mt-[clamp(40px,6vw,72px)] mb-0 flex flex-col items-start gap-[clamp(8px,1.2vw,14px)] text-[clamp(26px,4.2vw,52px)] leading-[1.1] font-semibold tracking-[-0.03em]">
        <span
          v-for="(item, i) in items"
          :key="item"
          ref="itemEls"
          data-strike
          :data-struck="struck[i]"
          class="relative transition-colors duration-[400ms]"
          :style="{ color: struck[i] ? 'var(--pui-text-muted)' : 'var(--pui-text)' }"
        ><InlineCopy :text="item" /><span
          aria-hidden="true"
          class="absolute top-[54%] -left-1 h-[0.08em] rounded-full transition-[width] duration-500"
          :style="{ width: struck[i] ? 'calc(100% + 8px)' : '0%', background: 'var(--pui-theme)' }"
        /></span>
        <span class="mt-[clamp(16px,2vw,28px)]" style="color: var(--site-theme-ink)"><InlineCopy :text="closing" /></span>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LandingSection } from "#shared/landing-copy";

// Messaging SECTION-7 on an inverse band. The items are the body's first sentence split at its
// commas; the closing line is the rest. Server and reduced motion show every item struck.
const props = defineProps<{ section: LandingSection }>();

const sentences = computed(() => props.section.body.split(/(?<=\.) /));
const items = computed(() => sentences.value[0]!.split(/(?<=,) /));
const closing = computed(() => sentences.value.slice(1).join(" "));

const struck = ref<boolean[]>(items.value.map(() => true));
const itemEls = ref<HTMLElement[]>([]);
const root = computed(() => itemEls.value[0] ?? null);
const { allowed, after } = useMotion(root);

// Handoff Motion: each item strikes 250 ms after it is fully in view, at least 260 ms after the
// previous one.
let observer: IntersectionObserver | undefined;
let last = 0;
onMounted(() => {
  if (!allowed.value) return;
  struck.value = items.value.map(() => false);
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const i = itemEls.value.indexOf(entry.target as HTMLElement);
        if (i < 0) continue;
        observer?.unobserve(entry.target);
        const now = performance.now();
        const at = Math.max(now + 250, last + 260);
        last = at;
        after(at - now, () => (struck.value[i] = true));
      }
    },
    { threshold: 1, rootMargin: "0px 0px -12% 0px" },
  );
  for (const el of itemEls.value) observer.observe(el);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
.rules {
  background-image: linear-gradient(to bottom, color-mix(in oklab, var(--pui-border) 50%, transparent) 1px, transparent 1px);
  background-size: 100% 96px;
  mask-image: linear-gradient(to right, transparent, #000 40%, #000 60%, transparent);
}
.glow {
  background: radial-gradient(closest-side, color-mix(in oklab, var(--pui-theme) 26%, transparent), transparent);
}
</style>

<template>
  <section id="size" ref="root" class="site-inverse relative overflow-hidden" style="background: var(--pui-bg); color: var(--pui-text)">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="chart-glow absolute -top-[260px] -left-[280px] h-[800px] w-[1000px]" />
      <div class="chart-glow-purple absolute -right-[300px] -bottom-[420px] size-[900px]" />
    </div>
    <div class="relative mx-auto max-w-[1200px] px-[clamp(20px,5vw,40px)] pt-[clamp(96px,12vw,160px)] pb-[clamp(88px,11vw,140px)]">
      <h2 class="m-0 max-w-[16ch] text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em]">
        {{ fillSize(section.headline, perfectui) }}
      </h2>
      <p class="mt-7 mb-0 max-w-[60ch] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-pretty" style="color: var(--pui-text-muted)">
        <InlineCopy :text="fillSize(section.body, perfectui)" />
      </p>

      <div class="mt-[clamp(48px,7vw,88px)]">
        <div class="flex justify-end gap-5 pb-4 font-mono text-xs" style="color: var(--pui-text-muted)">
          <span class="flex items-center gap-2"><span class="size-2.5 rounded-[2px]" style="background: var(--pui-text)" />CSS</span>
          <span class="flex items-center gap-2"><span class="size-2.5 rounded-[2px]" style="background: color-mix(in oklab, var(--pui-text) 35%, transparent)" />JavaScript</span>
        </div>
        <div
          v-for="(row, i) in rows"
          :key="row.name"
          class="flex flex-wrap items-center gap-x-6 gap-y-3 border-t py-[22px]"
          style="border-color: var(--pui-border)"
        >
          <div class="flex flex-col max-[719px]:flex-auto min-[720px]:flex-[0_0_216px]">
            <span class="font-semibold" :style="i === 0 ? 'color: var(--site-theme-ink)' : ''">{{ row.name }}</span>
            <span class="font-mono text-xs" style="color: var(--pui-text-muted)">{{ row.version }}</span>
          </div>
          <div aria-hidden="true" class="flex h-7 min-w-0 gap-0.5 max-[719px]:order-3 max-[719px]:flex-[1_1_100%] min-[720px]:flex-1">
            <div :class="['rounded-l-[3px]', i === 0 ? 'seg-css-perfectui' : 'seg-css']" :style="{ width: `${(row.css / max) * 100 * progress(i)}%` }" />
            <div :class="['rounded-r-[3px]', i === 0 ? 'seg-js-perfectui' : 'seg-js']" :style="{ width: `${(row.js / max) * 100 * progress(i)}%` }" />
          </div>
          <div class="min-w-[150px] flex-none text-right font-mono tabular-nums">
            <span class="text-xl font-semibold">{{ fmt((row.css + row.js) * progress(i)) }}</span>
            <span v-if="row.js" class="block text-xs" style="color: var(--pui-text-muted)">{{ fmt(row.css * progress(i)) }} + {{ fmt(row.js * progress(i)) }}</span>
          </div>
        </div>
        <p class="m-0 border-t pt-4 font-mono text-xs" style="border-color: var(--pui-border); color: var(--pui-text-muted)">
          {{ perfectui.method }} of the published builds; perfectui measured at build from version {{ perfectui.version }}, others on {{ competitorsMeasuredAt }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { fillSize, type LandingSection } from "#shared/landing-copy";
import type { LibrarySize } from "#shared/library-size";
import { competitors, competitorsMeasuredAt } from "~/data/competitors";

// Messaging SECTION-2: perfectui's row from the build's measurement, the others from the
// static list (REQ-2, ADR-0007). The server renders full bars and exact numbers.
const props = defineProps<{ section: LandingSection; perfectui: LibrarySize }>();

const rows = computed(() => [
  { name: "perfectui", version: props.perfectui.version, css: props.perfectui.css, js: props.perfectui.js },
  ...competitors,
]);
const max = computed(() => Math.max(...rows.value.map((r) => r.css + r.js)));
const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

// Once 30% of the chart is in view: each bar grows over 1300 ms (ease-out cubic), starting
// 250 ms + 110 ms × its row, with the counters following (handoff Motion).
const root = ref<HTMLElement | null>(null);
const { allowed, inView } = useMotion(root, { threshold: 0.3 });
const elapsed = ref(Number.POSITIVE_INFINITY);
const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const progress = (i: number) => ease((elapsed.value - 250 - i * 110) / 1300);

let frame = 0;
onMounted(() => {
  if (!allowed.value) return;
  elapsed.value = 0;
  const stop = watch(inView, (visible) => {
    if (!visible) return;
    stop();
    const start = performance.now();
    const step = (now: number) => {
      elapsed.value = now - start;
      if (elapsed.value < 2200) frame = requestAnimationFrame(step);
      else elapsed.value = Number.POSITIVE_INFINITY;
    };
    frame = requestAnimationFrame(step);
  });
});
onBeforeUnmount(() => cancelAnimationFrame(frame));
</script>

<style scoped>
.chart-glow {
  background: radial-gradient(closest-side, color-mix(in oklab, var(--pui-theme) 30%, transparent), transparent);
}
.chart-glow-purple {
  background: radial-gradient(closest-side, color-mix(in oklab, #7340d9 28%, transparent), transparent);
}
.seg-css-perfectui {
  background: var(--pui-theme);
}
.seg-js-perfectui {
  background: color-mix(in oklab, var(--pui-theme) 45%, transparent);
}
.seg-css {
  background: color-mix(in oklab, var(--pui-muted) 70%, transparent);
}
.seg-js {
  background: color-mix(in oklab, var(--pui-muted) 32%, transparent);
}
</style>

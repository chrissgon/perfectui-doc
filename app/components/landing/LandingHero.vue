<template>
  <section id="hero" ref="root" class="relative flex min-h-[calc(100svh-65px)] flex-col overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="hero-grid absolute inset-0" />
      <div class="hero-glow absolute -top-[340px] -right-[220px] size-[900px]" />
      <div class="hero-glow-purple absolute top-[120px] right-[180px] size-[760px]" />
      <!-- One bar per library of the size chart, perfectui first, scaled by the hero's visibility. -->
      <div class="absolute inset-x-0 bottom-0 mx-auto flex h-[86%] max-w-[1200px] items-end gap-[clamp(6px,1.5vw,16px)] px-[clamp(20px,5vw,40px)]">
        <div
          v-for="(height, i) in bars"
          :key="i"
          :class="['flex-1 origin-bottom rounded-t-md', i === 0 ? 'bar-perfectui' : 'bar-other']"
          :style="{ height: `${height}%`, transform: `scaleY(${barScale})`, opacity: barOpacity }"
        />
      </div>
    </div>

    <div class="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col px-[clamp(20px,5vw,40px)] pt-[clamp(32px,6vw,72px)]">
      <div class="flex flex-wrap items-start gap-x-16 gap-y-12">
        <div class="flex min-w-0 flex-[1_1_480px] flex-col gap-[clamp(20px,3vw,28px)] pt-2">
          <h1 class="m-0 text-[clamp(36px,5vw,60px)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">
            {{ section.headline }}
          </h1>
          <p class="m-0 flex flex-col gap-1 min-[720px]:hidden">
            <span class="pl-1 text-lg font-semibold tracking-tight">{{ lead }}</span>
            <span class="text-[88px] leading-[0.82] font-semibold tracking-[-0.065em] whitespace-nowrap">{{ number }} <span style="color: var(--pui-theme)">kB</span>.</span>
          </p>
          <p class="m-0 max-w-[46ch] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-pretty" style="color: var(--pui-text-muted)">
            <InlineCopy :text="paragraph" />
          </p>
          <div class="flex flex-col items-start gap-4">
            <CopyCommand :text="installCommand('npm')" />
            <div class="flex flex-wrap gap-3">
              <NuxtLink v-if="primary" :to="primary" class="pui-btn pui-solid pui-theme">{{ section.cta!.label }}</NuxtLink>
              <NuxtLink v-if="secondary" :to="secondary" class="pui-btn pui-outline pui-surface">{{ section.secondary!.label }}</NuxtLink>
            </div>
          </div>
        </div>
        <LandingClassCycleDemo class="flex-[1_1_400px]" />
      </div>

      <div class="mt-auto pt-12 pb-11 max-[719px]:hidden">
        <p class="m-0 flex flex-col gap-6">
          <span class="pl-2.5 text-[22px] font-semibold tracking-tight">{{ lead }}</span>
          <span class="text-[clamp(120px,17vw,216px)] leading-[0.82] font-semibold tracking-[-0.065em] whitespace-nowrap">{{ number }} <span style="color: var(--pui-theme)">kB</span>.</span>
        </p>
      </div>
      <div class="h-16 flex-none" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ctaTarget, fillSize, type LandingSection } from "#shared/landing-copy";
import { installCommand } from "~/site.config";

// Messaging SECTION-1 from the landing copy; the size is the build's measurement (REQ-1, REQ-2).
const props = defineProps<{
  section: LandingSection;
  size: { css: number; js: number };
  /** Bar heights in percent of the largest library, perfectui first. */
  bars: number[];
  version: string;
  /** Paths of the latest version's pages; a link to a page not in the build is not rendered. */
  pages: Set<string>;
}>();

// A link to a page not in the build yet is not rendered (ctaTarget).
const primary = computed(() => props.section.cta && ctaTarget(props.section.cta.to, props.version, props.pages));
const secondary = computed(() => props.section.secondary && ctaTarget(props.section.secondary.to, props.version, props.pages));

// The copy's body is "<lead> {css.kB}. <paragraph>": the lead and the number form the display line.
const parts = computed(() => props.section.body.split(/(?<=\{css\.kB\}\.) /));
const lead = computed(() => parts.value[0]!.replace(/\s*\{css\.kB\}\.$/, ""));
const paragraph = computed(() => fillSize(parts.value[1] ?? "", props.size));
const number = computed(() => (props.size.css / 1000).toFixed(1));

// Bars scale from 0.35 to 1 and fade from 0.25 to 1 with the hero's visible ratio (handoff Motion).
const root = ref<HTMLElement | null>(null);
const { allowed } = useMotion(root);
const ratio = ref(1);
let observer: IntersectionObserver | undefined;
onMounted(() => {
  if (!allowed.value || !root.value) return;
  observer = new IntersectionObserver(([entry]) => (ratio.value = entry?.intersectionRatio ?? 1), {
    threshold: Array.from({ length: 21 }, (_, i) => i / 20),
  });
  observer.observe(root.value);
});
onBeforeUnmount(() => observer?.disconnect());
const progress = computed(() => Math.min(1, ratio.value / 0.85));
const barScale = computed(() => 0.35 + 0.65 * progress.value);
const barOpacity = computed(() => 0.25 + 0.75 * progress.value);
</script>

<style scoped>
.hero-grid {
  background-image:
    linear-gradient(to right, color-mix(in oklab, var(--pui-border) 55%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklab, var(--pui-border) 55%, transparent) 1px, transparent 1px);
  background-size: 64px 64px;
  background-position: -1px -1px;
  mask-image: radial-gradient(ellipse 80% 70% at 70% 35%, #000 10%, transparent 75%);
}
.hero-glow {
  background: radial-gradient(closest-side, color-mix(in oklab, var(--pui-theme) 26%, transparent), transparent);
}
/* Design system glow-purple (#7340d9 at 12%), not the export's invented mix. */
.hero-glow-purple {
  background: radial-gradient(closest-side, color-mix(in oklab, #7340d9 12%, transparent), transparent);
}
.bar-perfectui {
  background: var(--pui-theme);
}
.bar-other {
  border: 1px solid color-mix(in oklab, var(--pui-border) 80%, transparent);
  border-bottom: 0;
  background: color-mix(in oklab, var(--pui-text) 2.5%, transparent);
}
</style>

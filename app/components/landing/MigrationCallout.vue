<template>
  <section id="migration" class="relative overflow-hidden">
    <div aria-hidden="true" class="grid-bg pointer-events-none absolute inset-0" />
    <div class="relative mx-auto flex max-w-[880px] flex-col items-center px-[clamp(20px,5vw,40px)] py-[clamp(96px,12vw,160px)] text-center">
      <h2 class="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em]">{{ section.headline }}</h2>
      <p class="mt-7 mb-0 max-w-[56ch] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-pretty" style="color: var(--pui-text-muted); background: var(--pui-bg)">
        <InlineCopy :text="section.body" />
      </p>
      <div class="pui-card mt-[clamp(40px,6vw,64px)] w-full text-left">
        <div class="pui-card-header font-mono text-xs">button.html</div>
        <div v-for="(line, i) in lines" :key="line.sign" :class="['flex flex-wrap items-center gap-x-6 gap-y-3 px-4', i ? 'pb-4' : 'py-4']">
          <code :class="`pui-soft pui-${line.colour} pui-rounded block min-w-0 flex-[1_1_300px] px-4 py-3 font-mono text-[clamp(14px,1.8vw,18px)] leading-[1.4] [overflow-wrap:anywhere]`">{{ line.sign }} {{ line.classes }}</code>
          <!-- The 0.23 classes do nothing in 1.0: the first button renders unstyled. -->
          <div aria-hidden="true" class="flex flex-[0_0_150px] justify-center">
            <button type="button" tabindex="-1" :class="line.classes">Button</button>
          </div>
        </div>
      </div>
      <NuxtLink v-if="cta" :to="cta" class="pui-btn pui-soft pui-theme mt-8">{{ section.cta!.label }}</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ctaTarget, type LandingSection } from "#shared/landing-copy";

// Messaging SECTION-8: one before/after line and the link to the guide (REQ-4). The link
// renders once the guide page is in the build (T-mg-1).
const props = defineProps<{ section: LandingSection; version: string; pages: Set<string> }>();
const cta = computed(() => props.section.cta && ctaTarget(props.section.cta.to, props.version, props.pages));

const lines = [
  { sign: "-", classes: "btn style-solid-primary", colour: "error" },
  { sign: "+", classes: "pui-btn pui-solid pui-theme", colour: "success" },
];
</script>

<style scoped>
.grid-bg {
  background-image:
    linear-gradient(to right, color-mix(in oklab, var(--pui-border) 55%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklab, var(--pui-border) 55%, transparent) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 75%);
}
</style>

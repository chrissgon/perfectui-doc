<template>
  <section id="overlays" class="relative border-t" style="border-color: var(--pui-border)">
    <div class="mx-auto max-w-[1200px] px-[clamp(20px,5vw,40px)] py-[clamp(96px,12vw,160px)]">
      <h2 class="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em]">{{ section.headline }}</h2>
      <p class="mt-7 mb-0 max-w-[62ch] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-pretty" style="color: var(--pui-text-muted)">
        <InlineCopy :text="section.body" />
      </p>
      <div class="pui-card mt-[clamp(40px,6vw,72px)] overflow-hidden">
        <div class="overlays-grid grid gap-px" style="background: var(--pui-border)">
          <div v-for="item in items" :key="item.page" class="flex min-w-0 flex-col" style="background: var(--pui-bg)">
            <div class="flex items-center justify-between gap-3 border-b px-4 py-3" style="border-color: var(--pui-border)">
              <span class="font-semibold">{{ item.label }}</span>
              <span class="flex items-center gap-2">
                <span class="font-mono text-sm" style="color: var(--pui-text-muted)">{{ item.feature }}</span>
                <span class="pui-badge pui-soft pui-success">no JavaScript of yours</span>
              </span>
            </div>
            <ExampleRef :page="item.page" name="basic" class="flex-1" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LandingSection } from "#shared/landing-copy";

// Messaging SECTION-4: the four overlays are the documentation's named examples (ADR-0008);
// this component holds no example HTML.
defineProps<{ section: LandingSection }>();

const items = [
  { label: "Modal", feature: "<dialog>", page: "components/modal" },
  { label: "Dropdown", feature: "popover", page: "components/dropdown" },
  { label: "Tooltip", feature: "interestfor", page: "components/tooltip" },
  { label: "Accordion", feature: "<details>", page: "components/accordion" },
];
</script>

<style scoped>
.overlays-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr));
}
</style>

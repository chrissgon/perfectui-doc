<template>
  <section
    id="mode-theme"
    class="relative overflow-hidden border-t"
    :data-pui-mode="mode"
    :style="{ '--pui-theme': swatch.value, background: 'var(--pui-bg)', color: 'var(--pui-text)', borderColor: 'var(--pui-border)' }"
  >
    <div aria-hidden="true" class="demo-glow pointer-events-none absolute -top-[300px] -right-[360px] h-[900px] w-[1100px]" />
    <div class="relative mx-auto max-w-[1200px] px-[clamp(20px,5vw,40px)] py-[clamp(96px,12vw,160px)]">
      <h2 class="m-0 max-w-[20ch] text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance">{{ section.headline }}</h2>
      <p class="mt-7 mb-0 max-w-[56ch] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-pretty" style="color: var(--pui-text-muted)">
        <InlineCopy :text="section.body" />
      </p>

      <div class="pui-card mt-[clamp(40px,6vw,72px)] flex flex-wrap">
        <div class="flex min-w-0 flex-[0_1_340px] flex-col gap-6 border-r p-6" style="border-color: var(--pui-border)">
          <label class="flex cursor-pointer items-center gap-3">
            <input v-model="dark" type="checkbox" class="pui-switch">
            <span>Dark</span>
          </label>
          <div class="flex items-center gap-3" role="radiogroup" aria-label="Section theme colour">
            <input
              v-for="(s, i) in swatches"
              :key="s.label"
              v-model="selected"
              type="radio"
              name="landing-theme-demo"
              class="pui-radio size-[22px]"
              :value="i"
              :aria-label="s.label"
              :style="{ '--pui-color': s.value }"
            >
          </div>
          <pre class="m-0 border-t pt-5 whitespace-pre-wrap [overflow-wrap:anywhere] font-mono text-[13px] leading-[1.8]" style="border-color: var(--pui-border)">&lt;html <span class="pui-soft pui-theme pui-rounded px-[3px] py-px">data-pui-mode="{{ mode }}"</span>&gt;
<span class="pui-soft pui-theme pui-rounded px-[3px] py-px">--pui-theme: {{ swatch.label }};</span></pre>
          <NuxtLink v-if="cta" :to="cta" class="pui-btn pui-link pui-theme mt-auto self-start px-0">{{ section.cta!.label }}</NuxtLink>
        </div>
        <div class="demo-canvas flex min-w-0 flex-[1_1_480px] flex-wrap items-start gap-4 p-[clamp(16px,3vw,32px)]">
          <div class="pui-card min-w-0 flex-[1_1_260px]">
            <div class="pui-card-header">New project</div>
            <div class="pui-card-content">
              <label class="pui-field-group"><span>Name</span><input class="pui-input" value="Perfect dashboard"></label>
              <label class="pui-field-group"><span>Owner</span><input class="pui-input" value="ana@perfectui.dev"><small>You can change this later in Settings.</small></label>
              <label class="flex items-center gap-2.5 text-sm"><input type="checkbox" class="pui-switch" checked>Notifications</label>
              <div class="flex justify-end gap-2">
                <button type="button" class="pui-btn pui-outline pui-surface">Cancel</button>
                <button type="button" class="pui-btn pui-solid pui-theme">Create</button>
              </div>
            </div>
          </div>
          <div class="flex min-w-0 flex-[1_1_260px] flex-col gap-4">
            <div class="pui-card pui-soft pui-theme">
              <div class="pui-card-content gap-1"><strong class="font-semibold">Your trial ends in 3 days</strong><span>Add a payment method to keep your projects.</span></div>
            </div>
            <div class="pui-card">
              <div v-for="(row, i) in invoices" :key="row.name" class="flex items-center justify-between gap-2 px-4 py-2.5 text-sm" :class="i ? 'border-t' : ''" style="border-color: var(--pui-border)">
                <span>{{ row.name }}</span>
                <span class="flex items-center gap-2.5">{{ row.amount }}<span :class="`pui-badge pui-soft pui-${row.colour}`">{{ row.status }}</span></span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="pui-chip pui-solid pui-theme">Operational</span>
              <span class="pui-chip pui-outline pui-surface">Degraded</span>
              <span class="pui-badge pui-solid pui-inverse">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ctaTarget, type LandingSection } from "#shared/landing-copy";

// Messaging SECTION-5: the switch and the swatches scope data-pui-mode and --pui-theme to this
// section only (landing handoff behaviour). It opens light in #7c3aed: in dark mode the library
// labels solid fills in black, which fails AA on a dark violet (T-sh-16); the reader can still
// switch, as with the theme picker, where any colour is allowed (EDGE-6).
const props = defineProps<{ section: LandingSection; version: string; pages: Set<string> }>();
const cta = computed(() => props.section.cta && ctaTarget(props.section.cta.to, props.version, props.pages));

const swatches = [
  { label: "#0092cd", value: "light-dark(#0092cd, #07b6f0)" },
  { label: "#7c3aed", value: "#7c3aed" },
  { label: "#16a34a", value: "#16a34a" },
  { label: "#dc2626", value: "#dc2626" },
  { label: "#d97706", value: "#d97706" },
] as const;

const dark = ref(false);
const selected = ref(1);
const mode = computed(() => (dark.value ? "dark" : "light"));
const swatch = computed(() => swatches[selected.value]!);

const invoices = [
  { name: "Ana Souza", amount: "$120.00", status: "Paid", colour: "success" },
  { name: "Bruno Lima", amount: "$80.00", status: "Pending", colour: "warn" },
  { name: "Carla Dias", amount: "$45.00", status: "Failed", colour: "error" },
];
</script>

<style scoped>
.demo-glow {
  background: radial-gradient(closest-side, color-mix(in oklab, var(--pui-theme) 18%, transparent), transparent);
}
.demo-canvas {
  background-image: radial-gradient(color-mix(in oklab, var(--pui-text) 14%, transparent) 1px, transparent 1.5px);
  background-size: 16px 16px;
}
</style>

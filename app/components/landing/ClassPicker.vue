<template>
  <section id="classes" class="relative overflow-hidden">
    <div aria-hidden="true" class="classes-dots pointer-events-none absolute inset-0" />
    <div class="relative mx-auto max-w-[1200px] px-[clamp(20px,5vw,40px)] py-[clamp(96px,12vw,160px)]">
      <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
        <h2 class="m-0 flex-[1_1_420px] text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em]">{{ section.headline }}</h2>
        <p class="m-0 flex-[1_1_420px] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-pretty" style="color: var(--pui-text-muted); background: var(--pui-bg)">
          <InlineCopy :text="section.body" />
        </p>
      </div>

      <div class="pui-card mt-[clamp(40px,6vw,72px)]">
        <div class="flex flex-wrap gap-x-10 gap-y-3 border-b p-4" style="border-color: var(--pui-border)">
          <div v-for="group in groups" :key="group.name" class="flex flex-wrap items-center gap-2">
            <span class="w-12 font-mono text-xs" style="color: var(--pui-text-muted)">{{ group.name }}</span>
            <button
              v-for="option in group.options"
              :key="option.value"
              type="button"
              :class="chip(group.current === option.value)"
              :aria-pressed="group.current === option.value"
              @click="pick(group.name, option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="flex min-w-0 flex-[1_1_380px] flex-col border-r" style="border-color: var(--pui-border)">
            <div aria-hidden="true" class="picker-stage grid min-h-[clamp(220px,26vw,300px)] flex-1 place-items-center">
              <div class="scale-[3]">
                <button v-if="current.tag === 'button'" data-live type="button" tabindex="-1" :class="classes">{{ current.label }}</button>
                <span v-else data-live :class="classes">{{ current.label }}</span>
              </div>
            </div>
            <code class="block border-t p-4 font-mono text-sm leading-normal" style="border-color: var(--pui-border)">
              <span style="color: var(--pui-text-muted)">&lt;{{ current.tag }} class="</span><template v-for="(token, i) in tokens" :key="token.part">{{ i ? " " : "" }}<span
                :data-changed="token.part === changed ? '' : undefined"
                :class="token.part === changed ? 'pui-soft pui-theme pui-rounded px-[3px] py-px' : ''"
              >{{ token.value }}</span></template><span style="color: var(--pui-text-muted)">"&gt;</span>
            </code>
          </div>
          <div class="matrix grid min-w-0 flex-auto items-center justify-center justify-items-center gap-x-2 gap-y-2.5 overflow-x-auto px-7 py-6">
            <span />
            <span v-for="colour in colours" :key="colour" class="font-mono text-xs" style="color: var(--pui-text-muted)">{{ colour }}</span>
            <template v-for="style in styles" :key="style">
              <span class="justify-self-start font-mono text-xs" style="color: var(--pui-text-muted)">{{ style }}</span>
              <div
                v-for="colour in colours"
                :key="colour"
                class="rounded-[9px] border border-dashed p-1"
                :style="{ borderColor: style === state.style && colour === state.colour ? 'var(--pui-theme)' : 'transparent' }"
              >
                <button
                  type="button"
                  :class="`pui-${state.shape} pui-${style} pui-${colour}`"
                  :aria-label="`${style} ${colour}`"
                  @click="pickCell(style, colour)"
                >
                  {{ current.label }}
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div v-if="cta" class="mt-6">
        <NuxtLink :to="cta" class="pui-btn pui-link pui-theme px-0">{{ section.cta!.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ctaTarget, type LandingSection } from "#shared/landing-copy";

// Messaging SECTION-3: shape, style and colour as independent classes (REQ-5). The server
// renders the default combination, pui-btn pui-solid pui-theme.
const props = defineProps<{ section: LandingSection; version: string; pages: Set<string> }>();
const cta = computed(() => props.section.cta && ctaTarget(props.section.cta.to, props.version, props.pages));

const shapes = [
  { value: "btn", label: "button", tag: "button" },
  { value: "chip", label: "chip", tag: "span" },
  { value: "badge", label: "badge", tag: "span" },
] as const;
const styles = ["solid", "soft", "outline", "link"] as const;
const colours = ["theme", "success", "error", "warn", "muted", "surface", "inverse"] as const;

type Part = "shape" | "style" | "colour";
const state = reactive({ shape: "btn" as string, style: "solid" as string, colour: "theme" as string });
const changed = ref<Part>("colour");

const current = computed(() => {
  const shape = shapes.find((s) => s.value === state.shape)!;
  return { tag: shape.tag, label: shape.label[0]!.toUpperCase() + shape.label.slice(1) };
});
const classes = computed(() => `pui-${state.shape} pui-${state.style} pui-${state.colour}`);
const tokens = computed(() =>
  (["shape", "style", "colour"] as const).map((part) => ({ part, value: `pui-${state[part]}` })),
);

const groups = computed(() => [
  { name: "shape" as Part, current: state.shape, options: shapes.map((s) => ({ value: s.value, label: s.label })) },
  { name: "style" as Part, current: state.style, options: styles.map((s) => ({ value: s, label: s })) },
  { name: "colour" as Part, current: state.colour, options: colours.map((c) => ({ value: c, label: c })) },
]);

const chip = (on: boolean) => (on ? "pui-chip pui-solid pui-inverse" : "pui-chip pui-outline pui-surface");

function pick(part: Part, value: string) {
  state[part] = value;
  changed.value = part;
}

function pickCell(style: string, colour: string) {
  changed.value = style !== state.style ? "style" : "colour";
  state.style = style;
  state.colour = colour;
}
</script>

<style scoped>
.classes-dots {
  background-image: radial-gradient(color-mix(in oklab, var(--pui-text) 14%, transparent) 1px, transparent 1.5px);
  background-size: 24px 24px;
  mask-image: linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent);
}
.picker-stage {
  background-image: radial-gradient(color-mix(in oklab, var(--pui-text) 16%, transparent) 1px, transparent 1.5px);
  background-size: 16px 16px;
  background-position: 8px 8px;
}
.matrix {
  grid-template-columns: 52px repeat(7, auto);
}
</style>

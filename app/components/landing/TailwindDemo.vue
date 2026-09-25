<template>
  <section id="tailwind" ref="root" class="relative border-t" style="border-color: var(--pui-border)">
    <div class="mx-auto max-w-[1200px] px-[clamp(20px,5vw,40px)] py-[clamp(96px,12vw,160px)]">
      <div class="flex flex-wrap items-end gap-x-16 gap-y-6">
        <h2 class="m-0 flex-[1_1_420px] text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em]">{{ section.headline }}</h2>
        <p class="m-0 flex-[1_1_420px] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-pretty" style="color: var(--pui-text-muted)">
          <InlineCopy :text="section.body" />
        </p>
      </div>
      <div class="pui-card mt-[clamp(40px,6vw,72px)] flex flex-wrap">
        <div data-demo class="flex min-w-0 flex-[1_1_520px] flex-col border-r" style="border-color: var(--pui-border)">
          <div class="dots grid min-h-[240px] flex-1 place-items-center px-[clamp(16px,4vw,48px)] py-8">
            <div class="flex w-full max-w-[440px] justify-center rounded-[9px] border border-dashed p-4" style="border-color: var(--pui-border); background: var(--pui-bg)">
              <button type="button" tabindex="-1" :class="['pui-btn pui-solid pui-theme', { 'w-full': applied }]">Send message</button>
            </div>
          </div>
          <code class="block border-t p-4 font-mono text-sm leading-normal [overflow-wrap:anywhere]" style="border-color: var(--pui-border)">
            <span style="color: var(--pui-text-muted)">class="</span>pui-btn pui-solid pui-theme<span class="font-semibold" style="color: var(--site-theme-ink)">{{ typed }}</span><span v-if="allowed" class="caret" /><span style="color: var(--pui-text-muted)">"</span>
          </code>
        </div>
        <!-- The cascade as the Tailwind guide measures it: one layer order, utilities on top. The
             export's "unlayered" utility was the disproved claim (library docs/tailwindcss.md). -->
        <div class="flex min-w-0 flex-[1_1_340px] flex-col gap-1.5 p-6 font-mono text-[13px]">
          <div
            v-for="layer in layers"
            :key="layer.name"
            :class="['flex items-center justify-between gap-2 rounded-md px-3 py-2.5', layer.wins ? 'pui-soft pui-theme' : 'border']"
            :style="layer.wins ? '' : 'border-color: var(--pui-border)'"
          >
            <span>@layer {{ layer.name }}</span>
            <span v-if="layer.wins" class="pui-badge pui-solid pui-theme">{{ layer.holds }}</span>
            <span v-else style="color: var(--pui-text-muted)">{{ layer.holds }}</span>
          </div>
          <pre class="m-0 mt-3 overflow-x-auto border-t pt-4 leading-[1.7]" style="border-color: var(--pui-border)"><span style="color: var(--site-theme-ink)">@layer</span> theme, base, pui, components, utilities;
<span style="color: var(--site-theme-ink)">@custom-variant</span> dark (&amp;:where([data-pui-mode="dark"], [data-pui-mode="dark"] *));</pre>
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

// Messaging SECTION-6: " w-full" typed onto a perfectui button, which stretches because
// utilities sit above the library's layer. Server and reduced motion show it applied.
const props = defineProps<{ section: LandingSection; version: string; pages: Set<string> }>();
const cta = computed(() => props.section.cta && ctaTarget(props.section.cta.to, props.version, props.pages));

const layers = [
  { name: "utilities", holds: ".w-full wins", wins: true },
  { name: "components", holds: "yours", wins: false },
  { name: "pui", holds: ".pui-btn …", wins: false },
  { name: "base", holds: "Preflight", wins: false },
  { name: "theme", holds: "tokens", wins: false },
];

const word = " w-full";
const count = ref(word.length);
const typed = computed(() => word.slice(0, count.value));
const applied = computed(() => count.value === word.length);

// Handoff Motion: at 40% in view, after 500 ms type at 90 ms per character, hold 2600 ms,
// erase at 40 ms per character, pause 1200 ms, loop.
const root = ref<HTMLElement | null>(null);
const { allowed, inView, after } = useMotion(root, { threshold: 0.4 });
let phase: "type" | "erase" = "type";
function tick() {
  let delay: number;
  if (phase === "type") {
    if (count.value < word.length) {
      count.value++;
      delay = count.value === word.length ? 2600 : 90;
    } else {
      phase = "erase";
      delay = 40;
    }
  } else if (count.value > 0) {
    count.value--;
    delay = 40;
  } else {
    phase = "type";
    delay = 1200;
  }
  after(delay, tick);
}
onMounted(() => {
  if (!allowed.value) return;
  count.value = 0;
  const stop = watch(inView, (visible) => {
    if (!visible) return;
    stop();
    after(500, tick);
  });
});
</script>

<style scoped>
.dots {
  background-image: radial-gradient(color-mix(in oklab, var(--pui-text) 14%, transparent) 1px, transparent 1.5px);
  background-size: 16px 16px;
}
.caret {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  vertical-align: -0.2em;
  background: var(--pui-theme);
  animation: caret 1s steps(1) infinite;
}
@keyframes caret {
  50% {
    opacity: 0;
  }
}
</style>

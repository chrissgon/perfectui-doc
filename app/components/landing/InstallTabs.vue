<template>
  <section id="install" class="relative border-t" style="border-color: var(--pui-border)">
    <div class="mx-auto flex max-w-[1200px] flex-wrap items-start gap-x-16 gap-y-12 px-[clamp(20px,5vw,40px)] py-[clamp(96px,12vw,160px)]">
      <div class="flex min-w-0 flex-[1_1_340px] flex-col items-start gap-7">
        <h2 class="m-0 text-[clamp(36px,5vw,64px)] leading-[1.02] font-semibold tracking-[-0.035em]">{{ section.headline }}</h2>
        <p class="m-0 max-w-[44ch] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-pretty" style="color: var(--pui-text-muted)">
          <InlineCopy :text="section.body" />
        </p>
        <NuxtLink v-if="cta" :to="cta" class="pui-btn pui-solid pui-theme">{{ section.cta!.label }}</NuxtLink>
      </div>
      <div class="pui-card min-w-0 flex-[1.4_1_520px]">
        <div class="pui-card-content gap-4">
          <div class="pui-group-row" role="group" aria-label="Package manager" @keydown="onKeydown">
            <button
              v-for="m in managers"
              :key="m"
              :ref="(el) => (buttons[m] = el as HTMLButtonElement)"
              type="button"
              :class="m === manager ? 'pui-btn pui-solid pui-inverse' : 'pui-btn pui-outline pui-surface'"
              :aria-pressed="m === manager"
              :tabindex="m === manager ? 0 : -1"
              @click="manager = m"
            >
              {{ m }}
            </button>
          </div>
          <CopyCommand :text="installCommand(manager)" />
          <pre class="m-0 overflow-x-auto font-mono text-[13px] leading-[1.7]">import "{{ site.packageName }}/perfectui.css";
<span style="color: var(--pui-text-muted)">// or only what you use:</span>
import "{{ site.packageName }}/core.css";
import "{{ site.packageName }}/components/button.css";</pre>
        </div>
        <div class="flex items-center justify-between gap-3 border-t px-4 py-2 font-mono text-xs" style="border-color: var(--pui-border); background: var(--pui-bg-muted); color: var(--pui-text-muted)">
          <span>CDN</span>
          <button
            v-if="mounted"
            type="button"
            :class="['pui-btn pui-link px-2 py-1', copied ? 'pui-success' : 'pui-surface']"
            :aria-label="copied ? 'Copied' : 'Copy CDN tags'"
            @click="copyCdn"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path v-if="copied" d="M20 6 9 17l-5-5" />
              <template v-else>
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </template>
            </svg>
          </button>
        </div>
        <pre ref="cdnEl" data-cdn tabindex="0" aria-label="CDN tags" class="m-0 overflow-x-auto border-t p-4 font-mono text-[13px] leading-[1.7]" style="border-color: var(--pui-border)">{{ cdn }}</pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ctaTarget, type LandingSection } from "#shared/landing-copy";
import { installCommand, site, type PackageManager } from "~/site.config";

// Messaging SECTION-9: package managers as a group of pressed buttons moved with the arrow keys
// (landing handoff behaviour), and the CDN tags pinned to the installed version.
const props = defineProps<{ section: LandingSection; version: string; pages: Set<string>; libraryVersion: string }>();
const cta = computed(() => props.section.cta && ctaTarget(props.section.cta.to, props.version, props.pages));

const managers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];
const manager = ref<PackageManager>("npm");
const buttons: Partial<Record<PackageManager, HTMLButtonElement>> = {};

function onKeydown(event: KeyboardEvent) {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  event.preventDefault();
  const step = event.key === "ArrowRight" ? 1 : managers.length - 1;
  manager.value = managers[(managers.indexOf(manager.value) + step) % managers.length]!;
  buttons[manager.value]?.focus();
}

const base = computed(() => `https://cdn.jsdelivr.net/npm/${site.packageName}@${props.libraryVersion}/dist`);
const cdn = computed(
  () => `<link rel="stylesheet" href="${base.value}/perfectui.css">\n<script type="module">\n  import "${base.value}/js/index.js";\n</scr` + `ipt>`,
);

// Same behaviour as CopyCommand: "Copied" for 1800 ms, the snippet selected without clipboard.
const mounted = ref(false);
const copied = ref(false);
const cdnEl = ref<HTMLElement | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;
onMounted(() => (mounted.value = true));
onBeforeUnmount(() => clearTimeout(timer));
async function copyCdn() {
  try {
    await navigator.clipboard.writeText(cdn.value);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1800);
  } catch {
    if (cdnEl.value) window.getSelection()?.selectAllChildren(cdnEl.value);
  }
}
</script>

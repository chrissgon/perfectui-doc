<template>
  <div ref="root" data-demo class="pui-card relative min-w-0">
    <div class="pui-card-header flex justify-between font-mono text-xs">
      <span>index.html</span><span>{{ applied.length }} / 3</span>
    </div>
    <div aria-hidden="true" class="demo-stage grid h-[clamp(180px,22vw,250px)] place-items-center border-b" style="border-color: var(--pui-border)">
      <div class="scale-[2.25]">
        <button v-if="current.tag === 'button'" type="button" tabindex="-1" :class="applied.join(' ')">{{ current.label }}</button>
        <span v-else :class="applied.join(' ')">{{ current.label }}</span>
      </div>
    </div>
    <div class="pui-card-content gap-4">
      <code class="block min-h-[42px] font-mono text-sm leading-normal [overflow-wrap:anywhere]">
        <span style="color: var(--pui-text-muted)">&lt;{{ current.tag }} class="</span><span>{{ typed }}</span><span v-if="animating" class="caret" /><span style="color: var(--pui-text-muted)">"&gt;{{ current.label }}&lt;/{{ current.tag }}&gt;</span>
      </code>
      <div class="flex items-center gap-2">
        <span
          v-for="(slot, i) in ['shape', 'style', 'colour']"
          :key="slot"
          :class="['pui-badge font-mono', i < applied.length ? 'pui-soft pui-theme' : 'pui-outline pui-surface']"
        >{{ slot }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// The hero's class cycle (landing handoff, Motion): types each combination's classes, holds,
// erases and moves on. The server and reduced motion show the first combination complete.
const cycle = [
  { tag: "button", classes: "pui-btn pui-solid pui-theme", label: "Button" },
  { tag: "span", classes: "pui-chip pui-soft pui-success", label: "Chip" },
  { tag: "button", classes: "pui-btn pui-outline pui-inverse", label: "Button" },
  { tag: "span", classes: "pui-badge pui-solid pui-warn", label: "Badge" },
  { tag: "button", classes: "pui-btn pui-soft pui-error", label: "Button" },
  { tag: "span", classes: "pui-chip pui-outline pui-muted", label: "Chip" },
] as const;

const root = ref<HTMLElement | null>(null);
const { allowed, after } = useMotion(root);

const index = ref(0);
const count = ref<number>(cycle[0].classes.length);
const current = computed(() => cycle[index.value]!);
const typed = computed(() => current.value.classes.slice(0, count.value));
// A class applies once it is typed in full (followed by a space, or at the end).
const applied = computed(() => {
  const tokens = typed.value.split(" ");
  return (count.value >= current.value.classes.length ? tokens : tokens.slice(0, -1)).filter(Boolean);
});
const animating = computed(() => allowed.value);

let phase: "type" | "erase" = "type";
function tick() {
  const full = current.value.classes;
  let delay: number;
  if (phase === "type") {
    if (count.value < full.length) {
      count.value++;
      delay = full[count.value] === " " || count.value === full.length ? 700 : 45 + Math.random() * 55;
    } else {
      phase = "erase";
      delay = 1500;
    }
  } else if (count.value > 0) {
    count.value = Math.max(0, count.value - 2);
    delay = 18;
  } else {
    phase = "type";
    index.value = (index.value + 1) % cycle.length;
    delay = 500;
  }
  after(delay, tick);
}

onMounted(() => {
  if (!allowed.value) return;
  count.value = 0;
  after(600, tick);
});
</script>

<style scoped>
.demo-stage {
  background-image: radial-gradient(color-mix(in oklab, var(--pui-text) 16%, transparent) 1px, transparent 1.5px);
  background-size: 16px 16px;
  background-position: 8px 8px;
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

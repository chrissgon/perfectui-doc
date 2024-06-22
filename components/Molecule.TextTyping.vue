<template>
  <span
    class="after:content-['|']"
    v-text="qualification"
  > </span>
</template>

<script setup lang="ts">
// props
interface Props {
  texts: string[];
}
const props = defineProps<Props>();

// data
const qualification = ref(props.texts[0]);

// methods
async function enter(): Promise<void> {
  props.texts.push(props.texts.shift() || props.texts[0]);
  await delLetters();
  await sleep(1500);
  await addLetters();
  await sleep(5000);
  enter();
}

async function delLetters(): Promise<void> {
  if (qualification.value === "") return;

  qualification.value = qualification.value.slice(0, -1);
  await sleep(60);
  await delLetters();
}

async function addLetters(): Promise<void> {
  for (const char of props.texts[0]) {
    qualification.value += char;
    await sleep(125);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

enter();
</script>

<style scoped>
span::after {
  animation: blink 0.7s step-end infinite;
}

@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: inherit;
  }
}
</style>

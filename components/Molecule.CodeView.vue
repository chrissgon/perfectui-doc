<template>
  <div
    v-if="template"
    class="bg-gray-800 rounded-md"
  >
    <button
      class="dark absolute right-0 p-3 m-1"
      @click="copy(input)"
    >
      <i
        v-if="copied"
        class="bi-check-circle-fill text-green-500 text-md bg-gray-800"
      />
      <i
        v-else
        class="bi-copy text-md bg-gray-800"
      />
    </button>

    <pre class="w-full overflow-auto p-5"><code
    class="dark"
    v-html="template"
    /></pre>
  </div>
</template>

<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";

// props
interface IProps {
  input: string;
  lang?: string;
}
const props = defineProps<IProps>();

// data
const copied = ref<boolean>(false);
const template = hljs.highlight(props.input, {
  language: props.lang ?? "xml",
}).value;

// methods
async function copy(input: string): Promise<void> {
  await navigator.clipboard.writeText(input);
  copied.value = true;
  setTimeout(unsetCopy, 2000);
}
function unsetCopy(): void {
  copied.value = false;
}
</script>

<style></style>

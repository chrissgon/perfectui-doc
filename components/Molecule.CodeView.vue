<template>
  <div
    v-if="template"
    class="bg-secondary rounded-md"
  >
    <button
      class="absolute right-0 p-3 m-1"
      @click="copy(input)"
    >
      <i
        v-if="copied"
        class="bi-check-circle-fill text-green-500 text-md bg-secondary"
      />
      <i
        v-else
        class="bi-copy text-md bg-secondary"
      />
    </button>

    <pre class="w-full overflow-auto p-5"><code
    v-html="template"
    /></pre>
  </div>
</template>

<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/github.min.css";

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

<style>
.dark .hljs-doctag,
.dark .hljs-keyword,
.dark .hljs-meta .hljs-keyword,
.dark .hljs-template-tag,
.dark .hljs-template-variable,
.dark .hljs-type,
.dark .hljs-variable.language_ {
  /* prettylights-syntax-keyword */
  color: #ff7b72;
}
.dark .hljs-title,
.dark .hljs-title.class_,
.dark .hljs-title.class_.inherited__,
.dark .hljs-title.function_ {
  /* prettylights-syntax-entity */
  color: #d2a8ff;
}
.dark .hljs-attr,
.dark .hljs-attribute,
.dark .hljs-literal,
.dark .hljs-meta,
.dark .hljs-number,
.dark .hljs-operator,
.dark .hljs-variable,
.dark .hljs-selector-attr,
.dark .hljs-selector-class,
.dark .hljs-selector-id {
  /* prettylights-syntax-constant */
  color: #79c0ff;
}
.dark .hljs-regexp,
.dark .hljs-string,
.dark .hljs-meta .hljs-string {
  /* prettylights-syntax-string */
  color: #a5d6ff;
}
.dark .hljs-built_in,
.dark .hljs-symbol {
  /* prettylights-syntax-variable */
  color: #ffa657;
}
.dark .hljs-comment,
.dark .hljs-code,
.dark .hljs-formula {
  /* prettylights-syntax-comment */
  color: #8b949e;
}
.dark .hljs-name,
.dark .hljs-quote,
.dark .hljs-selector-tag,
.dark .hljs-selector-pseudo {
  /* prettylights-syntax-entity-tag */
  color: #7ee787;
}
.dark .hljs-subst {
  /* prettylights-syntax-storage-modifier-import */
  color: #c9d1d9;
}
.dark .hljs-section {
  /* prettylights-syntax-markup-heading */
  color: #1f6feb;
  font-weight: bold;
}
.dark .hljs-bullet {
  /* prettylights-syntax-markup-list */
  color: #f2cc60;
}
.dark .hljs-emphasis {
  /* prettylights-syntax-markup-italic */
  color: #c9d1d9;
  font-style: italic;
}
.dark .hljs-strong {
  /* prettylights-syntax-markup-bold */
  color: #c9d1d9;
  font-weight: bold;
}
.dark .hljs-addition {
  /* prettylights-syntax-markup-inserted */
  color: #aff5b4;
  background-color: #033a16;
}
.dark .hljs-deletion {
  /* prettylights-syntax-markup-deleted */
  color: #ffdcd7;
  background-color: #67060c;
}
.dark .hljs-char.escape_,
.dark .hljs-link,
.dark .hljs-params,
.dark .hljs-property,
.dark .hljs-punctuation,
.dark .hljs-tag {
  /* purposely ignored */
}
</style>

<template>
  <div
    v-show="template"
    class="bg-secondary rounded-md"
  >
    <button
      aria-label="Copy"
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

    <ClientOnly>
      <pre
        v-if="template"
        class="w-full overflow-auto p-5"
      ><code
      v-html="template"
      /></pre>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { md5 } from "js-md5";

// props
interface IProps {
  input: string;
  lang?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  lang: "html",
});

// data
const channelID = getChannelID();
const copied = ref<boolean>(false);
const template = ref<string>();

// methods
function setup(): void {
  const cache = sessionStorage.getItem(channelID);

  if (cache) {
    template.value = cache;
    return;
  }

  const channel = new BroadcastChannel("highlight");
  channel.postMessage({ channelID, input: props.input, lang: props.lang });
  channel.onmessage = (e) => {
    if (e.data.channelID === channelID) {
      template.value = e.data.highlight;
    }
  };
}
async function copy(input: string): Promise<void> {
  await navigator.clipboard.writeText(input);
  copied.value = true;
  setTimeout(unsetCopy, 2000);
}
function unsetCopy(): void {
  copied.value = false;
}
function getChannelID(): string {
  const length = props.input.length;
  const start = props.input.substring(0, 30).trim();
  const end = props.input.substring(length - 20, length).trim();
  const lang = props.lang ?? "html";
  return md5(`${start}${length}${end}${lang}`);
}

// setup
if (process.client) {
  setup();
}
</script>

<style></style>

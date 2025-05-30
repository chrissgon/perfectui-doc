<template>
  <dialog
    id="modalAssistant"
    ref="modalRef"
    class="modal"
    @click.self="reset"
  >
    <div class="card w-full bg-tertiary [html:not(.dark)_&]:!bg-white">
      <!-- header -->
      <header
        class="card-header sticky top-0 border-b z-1 border-secondary border-solid bg-secondary [html:not(.dark)_&]:!bg-white flex items-center"
      >
        <i
          class="bi-chevron-left btn"
          @click="close"
        ></i>
        <!-- input -->
        <input
          v-model="doubt"
          type="text"
          class="outline-none bg-transparent w-full mx-2 mousetrap"
          placeholder="What's your question?"
          @keydown.enter="search"
        />
        <button
          :disabled="loading"
          class="btn style-white bg-tertiary !px-3"
          @click="search"
        >
          <i class="bi-send"></i>
        </button>
      </header>

      <article class="px-2">
        <article class="flex flex-col gap-4 p-4 text">
          <!-- error -->
          <aside
            v-if="error"
            class="flex max-sm:flex-col gap-4 items-center"
          >
            <i
              class="bi-exclamation-triangle-fill text-warn text-lg leading-none px-2"
            ></i>

            <div
              class="text-base relative overflow-x-auto w-full max-sm:text-center"
            >
              <span class="text-warn">
                {{ error }}
              </span>
            </div>

            <button
              class="btn style-white bg-tertiary"
              @click="init"
            >
              <i class="bi-arrow-clockwise"></i> Reconnect
            </button>
          </aside>

          <!-- bot -->
          <div
            v-if="!error"
            class="flex flex-col gap-4"
          >
            <!-- room -->
            <template v-for="({ bot, text }, i) in room">
              <!-- bot -->
              <aside
                v-if="bot"
                :key="i"
                class="flex float-left max-sm:flex-col"
              >
                <AtomIconChatGPT
                  class="inline badge style-white !py-2 !px-2 rounded-full !bg-transparent mr-4 min-w-9 max-w-9 [html:not(.dark)_&>path]:!invert"
                />

                <div
                  class="mt-2 text-base relative overflow-x-auto flex flex-col gap-2 w-full"
                  v-html="text"
                ></div>
              </aside>

              <!-- user -->
              <article
                v-if="!bot"
                :key="i"
              >
                <div
                  class="p-2 px-4 text-right bg-secondary rounded-md block float-right"
                  v-html="text"
                ></div>
              </article>
            </template>
          </div>

          <!-- loading -->
          <div
            v-if="loading"
            class="flex"
          >
            <AtomIconChatGPT
              class="inline badge style-white !py-2 !px-2 rounded-full !bg-transparent mr-4 min-w-9 max-w-9 [html:not(.dark)_&>path]:!invert"
            />

            <div class="mt-3 w-4 h-4 block rounded-full animate-scale"></div>
          </div>
        </article>
      </article>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { Marked, Renderer } from "@ts-stack/markdown";
import hljs from "highlight.js";
import { scrollToBottom } from "~/shared";

// interfaces
interface IMessage {
  bot?: boolean;
  text: string;
}
interface IRoom extends Array<IMessage> {}

// computed
const connIsClosed = computed<boolean>(() => {
  return conn.value === null || conn.value.readyState !== conn.value.OPEN;
});

// data
const DEFAULT_BOT_MESSAGE: IMessage = {
  bot: true,
  text: "Hello! How can I assist you today with the Perfect UI framework?",
};
const ERROR_CHATGPT = "An error occurred when connecting to GPT Chat";

const runtime = useRuntimeConfig();
const loading = ref<boolean>(false);
const conn = ref<WebSocket | null>(null);
const room = reactive<IRoom>([DEFAULT_BOT_MESSAGE]);
const error = ref<string | null>(null);
Marked.setOptions({
  renderer: new Renderer(),
  gfm: true,
  tables: false,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: false,
  smartypants: false,
  highlight: (code, lang) => hljs.highlight(lang ?? "html", code).value,
});
const modalRef = ref<InstanceType<typeof HTMLDialogElement> | null>(null);
const doubt = ref<string>("");

// methods
function init(): void {
  if (!process.client) return;
  if (!runtime.public.SEARCH_ENDPOINT) return;

  reset();

  let threadID = localStorage.getItem("assistant:thread");

  if (!threadID) {
    threadID = crypto.randomUUID();
    localStorage.setItem("assistant:thread", threadID);
  }

  const params = new URLSearchParams();
  params.append("id", threadID);

  conn.value = new WebSocket(
    `${runtime.public.SEARCH_ENDPOINT}?${params.toString()}`
  );

  conn.value.onmessage = processResponse;
  conn.value.onerror = setError;
  conn.value.onclose = setError;
}
function close(): void {
  modalRef.value?.close();
  reset();
}
function reset(): void {
  error.value = null;
  loading.value = false;
  room.length = 0;
  room.push(DEFAULT_BOT_MESSAGE);
  doubt.value = "";
}
function search(): void {
  if (loading.value) return;
  if (!conn.value) return;

  loading.value = true;

  room.push({ text: doubt.value });

  scroll();

  conn.value.send(doubt.value);

  doubt.value = "";
}
function processResponse({ data }: MessageEvent<any>): void {
  if (connIsClosed.value) return;

  const text = data as string;
  loading.value = true;

  if (!text) return;

  room.push({
    bot: true,
    text: Marked.parse(text),
  });

  scroll();

  loading.value = false;

  setTimeout(() => {
    addCopyAction();
  }, 500);
}
function addCopyAction(): void {
  const codes = document.querySelectorAll(
    "#modalAssistant pre code"
  ) as NodeListOf<HTMLElement>;

  for (const code of codes) {
    code.onclick = async () => {
      if (code.classList.contains("copied")) return;
      await navigator.clipboard.writeText(code.innerText);
      code.classList.add("copied");
      setTimeout(() => {
        code.classList.remove("copied");
      }, 1000);
    };
  }
}
function setError(): void {
  error.value = ERROR_CHATGPT;
}
function scroll(): void {
  setTimeout(() => {
    const el = document.querySelector("#modalAssistant .card") as HTMLElement;
    if (!el) return;
    scrollToBottom(el);
  }, 0);
}

// methods
init();
</script>

<style>
.animate-scale {
  background: rgb(var(--contentSecondary));
  animation: scale 2s infinite;
}
.text * {
  font-size: 14px;
}
.text pre {
  position: relative;
  margin: 10px 0;
}
.text code {
  border-radius: var(--rounded);
  background: rgb(var(--backgroundSecondary));
  border: 1px solid rgb(var(--borderSecondary));
  font-size: var(--fontXS);
  padding: 3px 7px;
}
.text code[class*="lang"] {
  overflow-x: auto;
  display: block;
  padding: var(--spacingMD);
  padding-right: 40px;
  font-size: 14px;
  cursor: pointer;
}
.text pre code[class*="lang"]::after {
  content: "\F759";
  position: absolute;
  top: 0;
  right: 0;
  font-family: "bootstrap-icons";
  margin: 7px 14px;
  background: rgb(var(--backgroundSecondary));
  border-radius: var(--rounded);
}
.text pre code.copied::after {
  content: "\F26A";
  color: rgb(var(--green500));
}
.text strong {
  font-weight: 700;
}
.text ul {
  list-style: disc;
}

.text ol {
  list-style: decimal;
}

.text ul,
.text ol {
  border-radius: var(--rounded);

  list-style-position: inside !important;
}
.text ul li,
.text ol li {
  padding: var(--spacingXS) !important;
  margin-bottom: 10px;
}
.text ul li p,
.text ol li p {
  display: inline;
}

.text a {
  color: rgb(var(--theme500));
  text-decoration: underline;
}

@keyframes scale {
  to {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  from {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

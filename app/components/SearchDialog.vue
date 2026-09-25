<template>
  <dialog ref="dialog" class="pui-modal search-dialog" aria-label="Search the documentation" closedby="any">
    <div class="pui-card flex h-full flex-col">
      <div class="flex items-center gap-2.5 border-b p-3" style="border-color: var(--pui-border)">
        <div class="pui-input-group min-w-0 flex-1">
          <span class="pui-addon"><SiteIcon name="search" /></span>
          <input
            ref="input"
            v-model="query"
            class="pui-input"
            type="search"
            :placeholder="`Search ${label} docs`"
            :aria-label="`Search ${label} docs`"
            autocomplete="off"
            spellcheck="false"
          >
        </div>
        <button type="button" class="pui-btn pui-link pui-surface px-2.5" aria-label="Close search" @click="close">
          <SiteIcon name="x" />
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { versions } from "~/versions";

// Search design, SearchDialog on pui-modal (approved export): opened by SearchButton.
const props = defineProps<{ version: string }>();
const label = computed(() => versions.find((v) => v.id === props.version)?.id ?? props.version);

const dialog = ref<HTMLDialogElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const query = ref("");

function open(initial = "") {
  if (initial) query.value = initial;
  if (!dialog.value?.open) dialog.value?.showModal();
  input.value?.focus();
}

function close() {
  dialog.value?.close();
}

defineExpose({ open, close });
</script>

<style scoped>
/* Full screen below 640 px (approved export at 360 px); a centred panel above. */
.search-dialog {
  width: min(640px, calc(100vw - 32px));
  max-height: min(560px, calc(100vh - 96px));
  margin: 72px auto auto;
}
@media (max-width: 639px) {
  .search-dialog {
    width: 100vw;
    max-width: 100vw;
    height: 100dvh;
    max-height: 100dvh;
    margin: 0;
  }
}
</style>

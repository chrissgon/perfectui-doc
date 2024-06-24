<template>
  <dialog
    @click.self="reset"
    class="fixed top-0 left-0 w-full h-screen z-30 bg-search flex justify-center items-ceter p-4"
  >
    <div
      class="OrganismSearchCard card [html:not(.dark)_&]:!bg-white bg-tertiary w-full md:min-w-[700px] lg:min-w-[900px] max-w-[900px] h-fit max-h-full sm:max-h-[800px] !overflow-y-auto sm:mt-24"
    >
      <label
        class="bg-secondary [html:not(.dark)_&]:!bg-white p-2 flex items-center sticky top-0 z-10"
      >
        <i class="bi-chevron-left btn" @click="emit('close')"></i>
        <input
          v-model="doubt"
          :disabled="loading"
          type="text"
          class="outline-none bg-transparent w-full mx-2"
          placeholder="What's your question?"
          focus
          @keydown.enter="message"
          @keyup="search"
        />
        <button
          v-if="chat"
          :disabled="loading"
          class="btn btn-white bg-secondary bg-tertiary !px-3"
          @click="message"
        >
          <i class="bi-send"></i>
        </button>
      </label>

      <hr class="sticky top-[55px] z-10" />

      <slot></slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
// props
interface IProps {
  loading?: boolean;
  chat?: boolean;
}
const props = defineProps<IProps>();

// data
const doubt = ref<string>("");

// methods
function message(): void {
  if (!props.chat) return;
  emit("message", doubt.value);
  reset();
}
function search(): void {
  emit("search", doubt.value);
}
function reset(): void {
  doubt.value = "";
}

// emit
interface IEmits {
  (e: "message", doubt: string): void;
  (e: "search", doubt: string): void;
  (e: "close"): void;
}
const emit = defineEmits<IEmits>();
</script>

<style scoped>
html:not(.dark) .bg-secondary {
  background: rgb(var(--backgroundSecondary));
}
</style>

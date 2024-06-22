<template>
  <div
    class="p-5 bg-primary rounded-md"
    v-html="input"
  />
</template>

<script setup lang="ts">
// props
interface IProps {
  input: string;
}
defineProps<IProps>();
</script>

<style scoped></style>

<template>
  <div
    class="p-5"
    v-html="preview"
  />
</template>

<script setup lang="ts">
// props
interface IProps {
  preview: string;
}
defineProps<IProps>();
</script>

<style scoped></style>

<template>
  <!-- The site's own heading: MDC's ProseH2 rendered as another level after hydration (T-sh-16). -->
  <h2 :id="id">
    <a v-if="id" :href="`#${id}`"><slot /></a>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>();
</script>

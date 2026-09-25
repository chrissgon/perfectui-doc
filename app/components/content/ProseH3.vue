<template>
  <!-- The site's own heading: MDC's ProseH3 rendered as another level after hydration (T-sh-16). -->
  <h3 :id="id">
    <a v-if="id" :href="`#${id}`"><slot /></a>
    <slot v-else />
  </h3>
</template>

<script setup lang="ts">
defineProps<{ id?: string }>();
</script>

<template>
  <template v-for="(part, i) in inlineSegments(text)" :key="i">
    <code v-if="part.code" class="font-mono text-[0.92em]">{{ part.text }}</code>
    <template v-else>{{ part.text }}</template>
  </template>
</template>

<script setup lang="ts">
import { inlineSegments } from "#shared/landing-copy";

// Copy from content/landing.yml with its `inline code` rendered as <code>.
defineProps<{ text: string }>();
</script>

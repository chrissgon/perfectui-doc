<template>
  <!-- The fixture site tests the content model only; the landing, which renders the production
       documentation's named examples (ADR-0008), is tested on the production build. -->
  <main class="p-8">
    <h1>Fixture site</h1>
    <NuxtLink :to="`/docs/${latestVersion.id}`">Documentation</NuxtLink>
  </main>
</template>

<script setup lang="ts">
import { latestVersion } from "~/versions";
</script>

<template>
  <main>
    <LandingHero :section="section('hero')" :size="size" :bars="bars" :version="latestVersion.id" :pages="pages" />
    <LandingSizeChart :section="section('size')" :perfectui="size" />
    <LandingClassPicker :section="section('classes')" :version="latestVersion.id" :pages="pages" />
    <LandingModeThemeDemo :section="section('mode-theme')" :version="latestVersion.id" :pages="pages" />
  </main>
</template>

<script setup lang="ts">
import { assertSections, landingSectionIds, type LandingSection } from "#shared/landing-copy";
import type { LibrarySize } from "#shared/library-size";
import { competitors } from "~/data/competitors";
import { latestVersion, type DocsCollection } from "~/versions";

// The landing: messaging copy from content/landing.yml, the size measured at build (REQ-1, REQ-2).
const { data: copy } = await useAsyncData("landing-copy", () => queryCollection("landing").first());
const { data: measured } = await useFetch<LibrarySize>("/api/library-size.json");
if (!copy.value || !measured.value) {
  throw createError({ statusCode: 500, statusMessage: "Landing copy or library size missing", fatal: true });
}
// Pages of the latest version: a call to action renders only when its page exists, so a guide
// written in a later task (the migration guide, T-mg-1) shows up without an edit here.
const { data: docPaths } = await useAsyncData("landing-doc-paths", () =>
  queryCollection(latestVersion.collection as DocsCollection).select("path").all(),
);
const pages = computed(() => new Set((docPaths.value ?? []).map((p) => p.path)));

// Fails the prerender naming any section id the copy and the page disagree on.
assertSections(copy.value, landingSectionIds);

const size = measured.value;
const section = (id: string) => copy.value!.sections.find((s) => s.id === id) as LandingSection;

const totals = [size.css + size.js, ...competitors.map((c) => c.css + c.js)];
const bars = totals.map((t) => (t / Math.max(...totals)) * 100);

const hero = section("hero");
usePageMeta({
  title: `Perfect UI · ${hero.headline.replace(/\.$/, "")}`,
  description: hero.body.split(/(?<=\{css\.kB\}\.) /)[1] ?? "",
});
</script>

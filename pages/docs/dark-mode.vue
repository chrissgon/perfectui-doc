<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Customization
      </template>
      <template #title>
        Dark Mode
      </template>

      Easily implement a dark theme on your site
    </MoleculeDocsHeader>

    <!-- how it works -->
    <MoleculeDocsContent>
      <template #title>
        How it works
      </template>

      <p>
        Perfect ui provides methods to make customization easier. You can set
        the theme using the <AtomToken>setMode</AtomToken> function.
      </p>

      <!-- tabs -->
      <OrganismTabs>
        <!-- header -->
        <template #header>
          <AtomIconTS />
          index.ts
        </template>
        <!-- code -->
        <MoleculeCodeView
          :input="CODE_VIEW_USING_SET_THEME"
          lang="typescript"
        />
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- mode button -->
    <MoleculeDocsContent>
      <template #title>
        Mode button
      </template>
      <p>
        You can implement a mode button in your application for the user to
        change according to their preference.
      </p>

      <!-- tabs -->
      <OrganismTabs :tabs="['html', 'preview']">
        <!-- header -->
        <template #hhtml>
          <AtomIconHTML />
          index.html
        </template>
        <template #hpreview>
          Preview
        </template>

        <!-- html -->
        <template #html>
          <MoleculeCodeView :input="CODE_VIEW_MODE_BUTTON_HTML" />
        </template>

        <!-- preview -->
        <template #preview>
          <MoleculeCodePreview :preview="CODE_PREVIEW_MODE_BUTTON" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
// data
const CODE_VIEW_USING_SET_THEME = `import { setMode } from "@chrissgon/perfectui"

setMode("dark") // system, light or dark`;

const CODE_VIEW_MODE_BUTTON_HTML = `<!-- switch button -->
<label class="field-group">
  <i class="bi-sun"></i>
  <input type="checkbox" class="switch" id="mode" />
  <i class="bi-moon"></i>
</label>

<!-- script -->
<script type="module">
  import { setMode } from "https://unpkg.com/@chrissgon/perfectui@latest/dist/perfectui.js";

  document.getElementById("mode").addEventListener("change", (e) => {
    const dark = e.target.checked;
    setMode(dark ? "dark" : "light");
  });
<\/script>`;

const CODE_PREVIEW_MODE_BUTTON = `
<label class="field-group gap-2 w-fit">
  <i class="bi-sun"></i>
  <input type="checkbox" class="switch" id="mode" />
  <i class="bi-moon"></i>
</label>

<script>
  document.getElementById("mode").addEventListener("change", (e) => {
    const dark = e.target.checked;
    window.perfectui.setMode(dark ? "dark" : "light");
  });
<\/script>`;
</script>

<style scoped></style>

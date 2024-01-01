<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Customization
      </template>
      <template #title>
        Dark Mode
      </template>

      Implement different modes in your application easily with Perfectui
      through auxiliary methods.
    </MoleculeDocsHeader>

    <!-- how it works -->
    <MoleculeDocsContent>
      <template #title>
        How it works
      </template>

      <p>
        Perfect ui provides methods to make customization easier. You can set
        the mode using the <AtomToken>setMode</AtomToken> function.
      </p>

      <!-- tabs -->
      <OrganismTabs>
        <template #header>
          <AtomIconTS />
          index.ts
        </template>
        <MoleculeCodeView
          :input="CODE_VIEW_USING_SET_MODE"
          lang="ts"
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
      <OrganismTabs :tabs="['preview', 'html']">
        <template #hhtml>
          <AtomIconHTML />
          index.html
        </template>
        <template #hpreview>
          Preview
        </template>

        <template #html>
          <MoleculeCodeView :input="CODE_VIEW_MODE_BUTTON_HTML" />
        </template>

        <template #preview>
          <MoleculeCodePreview :preview="CODE_PREVIEW_MODE_BUTTON" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
// data
const CODE_VIEW_USING_SET_MODE = `import { setMode } from "@chrissgon/perfectui"

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

const CODE_PREVIEW_MODE_BUTTON = `<label class="field-group gap-2 w-fit">
  <i class="bi-sun"></i>
  <input type="checkbox" class="switch" id="mode" onchange="changeMode(this.checked)" checked />
  <i class="bi-moon"></i>
</label>

<script>
  function changeMode(dark){
    window.perfectui.setMode(dark ? "dark" : "light");
  }
  
  document.getElementById("mode").checked = document.cookie.includes("darkmode=true")
<\/script>`;
</script>

<style scoped></style>

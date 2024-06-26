<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle> Getting Started </template>
      <template #title> Get started with Perfect UI </template>

      An exceptionally lightweight and highly customizable CSS and JavaScript
      framework for crafting elegant user interfaces.
    </MoleculeDocsHeader>

    <!--  play cdn -->
    <MoleculeDocsContent>
      <template #title> Play CDN </template>
      <p>
        Place the <AtomToken>&lt;link&gt;</AtomToken>
        tag in the
        <AtomToken>&lt;head&gt;</AtomToken>
        for our CSS, and the
        <AtomToken>&lt;script&gt;</AtomToken>
        tag for our JavaScript bundle before the closing
        <AtomToken>&lt;/body&gt;</AtomToken>.
      </p>

      <OrganismTabs :tabs="['code', 'preview']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          index.html
        </template>
        <template #preview>
          <MoleculeCodePreview :input="CODE_PREVIEW_IMPORT_CDN" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_IMPORT_CDN" />
        </template>
      </OrganismTabs>

      <p>
        When imported via CDN, Perfect UI provides methods in
        <AtomToken>window</AtomToken> and <AtomToken>document</AtomToken>.
      </p>

      <OrganismTabs>
        <template #header>
          <AtomIconJS />
          index.js
        </template>
        <MoleculeCodeView :input="CODE_VIEW_IMPORT_CDN_SCRIPT" lang="ts" />
      </OrganismTabs>

      <p>You can also import Perfect UI as a module by CDN.</p>

      <OrganismTabs>
        <template #header>
          <AtomIconHTML />
          index.html
        </template>
        <MoleculeCodeView :input="CODE_VIEW_IMPORT_CDN_MODULE" />
      </OrganismTabs>
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title> Install by package manager </template>
      <p>You can also install Perfect UI by package manager.</p>

      <OrganismTabs :tabs="['npm', 'yarn', 'pnpm', 'bun']">
        <template #hnpm>
          <AtomIconNPM />
          npm
        </template>
        <template #hyarn>
          <AtomIconYarn />
          yarn
        </template>
        <template #hpnpm>
          <AtomIconPNPM />
          pnpm
        </template>
        <template #hbun>
          <AtomIconBun />
          bun
        </template>
        <template #npm>
          <MoleculeCodeView input="npm i @chrissgon/perfectui" lang="bash" />
        </template>
        <template #yarn>
          <MoleculeCodeView input="yarn add @chrissgon/perfectui" lang="bash" />
        </template>
        <template #pnpm>
          <MoleculeCodeView input="pnpm i @chrissgon/perfectui" lang="bash" />
        </template>
        <template #bun>
          <MoleculeCodeView input="bun i @chrissgon/perfectui" lang="bash" />
        </template>
      </OrganismTabs>

      <p>
        After installation, import the styles and methods in your
        <AtomToken>.js</AtomToken> or <AtomToken>.ts</AtomToken> file.
      </p>

      <OrganismTabs>
        <template #header>
          <AtomIconTS />
          index.ts
        </template>
        <MoleculeCodeView :input="CODE_VIEW_IMPORT_MODULE" lang="ts" />
      </OrganismTabs>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
// data
const CODE_VIEW_IMPORT_CDN = `<!DOCTYPE html> 
<html>
  <head>
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- import css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.css">

  </head>
  <body>
    <button class="btn btn-solid-primary">
      My button
    </button>
    
    <!-- import javascript -->
    <script src="https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.js"><\/script>
  </body>
</html>`;

const CODE_PREVIEW_IMPORT_CDN = `<button class="btn btn-solid-primary">My button</button>`;

const CODE_VIEW_IMPORT_CDN_SCRIPT = `console.log(window.perfectui) // { setMode: ƒ ...}
console.log(document.perfectui) // { setMode: ƒ ...}`;

const CODE_VIEW_IMPORT_CDN_MODULE = `<script type="module">
  import * as perfectUI from "https://cdn.jsdelivr.net/npm/@chrissgon/perfectui@latest/dist/perfectui.js"
  console.log(perfectUI) // { setMode: ƒ ...}
<\/script>`;

const CODE_VIEW_IMPORT_MODULE = `import { setMode } from "@chrissgon/perfectui";
import "@chrissgon/perfectui/dist/perfectui.css";`;
</script>

<style scoped></style>

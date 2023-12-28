<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle> Installation </template>
      <template #title> Get started with Perfect UI </template>

      An exceptionally lightweight and highly customizable CSS and JavaScript
      framework for crafting elegant user interfaces.
    </MoleculeDocsHeader>

    <MoleculeDocsContent>
      <template #title> Play CDN </template>
      <p>
        Place the <span class="token">&lt;link&gt;</span>
        tag in the
        <span class="token">&lt;head&gt;</span>
        for our CSS, and the
        <span class="token">&lt;script&gt;</span>
        tag for our JavaScript bundle before the closing
        <span class="token">&lt;/body&gt;</span>.
      </p>

      <OrganismTabs :tabs="['code', 'preview']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          index.html
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="INSTALLATION_IMPORT_CDNS.preview" />
        </template>
        <template #code>
          <MoleculeCodeView :input="INSTALLATION_IMPORT_CDNS.input" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title> Import via module </template>
      <p>
        You can also install Perfect UI via the package manager. First, you need
        to make sure you have <code class="token">Node</code> and
        <code class="token">NPM</code> installed on your machine.
      </p>

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
        <span class="token">.js</span> or <span class="token">.ts</span> file.
      </p>

      <OrganismTabs>
        <template #header>
          <AtomIconTS />
          index.ts
        </template>
        <MoleculeCodeView
          :input="INSTALLATION_IMPORT_MODULE.input"
          lang="javascript"
        />
      </OrganismTabs>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
import { INSTALLATION_IMPORT_CDNS, INSTALLATION_IMPORT_MODULE } from "~/shared";
</script>

<style scoped></style>

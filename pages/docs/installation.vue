<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Installation
      </template>
      <template #title>
        Get started with Perfect UI
      </template>

      An exceptionally lightweight and highly customizable CSS and JavaScript
      framework for crafting elegant user interfaces.
    </MoleculeDocsHeader>

    <MoleculeDocsContent>
      <template #title>
        Play CDN
      </template>
      <p>
        Place the <span class="token">&lt;link&gt;</span>
        tag in the
        <span class="token">&lt;head&gt;</span>
        for our CSS, and the
        <span class="token">&lt;script&gt;</span>
        tag for our JavaScript bundle before the closing
        <span class="token">&lt;/body&gt;</span>.
      </p>

      <MoleculeCodeView :input="INSTALLATION_IMPORT_CDNS.input" />
      <AtomIconBun />
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title>
        Import via module
      </template>
      <p>
        You can also install Perfect UI via the package manager. First, you need
        to make sure you have <code class="token">Node</code> and
        <code class="token">NPM</code> installed on your machine.
      </p>

      <MoleculeCodeView
        input="npm i @chrissgon/perfectui"
        lang="bash"
      />

      <p>After installation, import the styles and methods in your <span class="token">.js</span> or <span class="token">.ts</span> file.</p>

      <MoleculeCodeView
        :input="INSTALLATION_IMPORT_MODULE.input"
        lang="javascript"
      />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
import { INSTALLATION_IMPORT_CDNS, INSTALLATION_IMPORT_MODULE } from "~/shared";
</script>

<style scoped></style>

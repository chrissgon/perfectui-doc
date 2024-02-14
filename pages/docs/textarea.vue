<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Forms
      </template>
      <template #title>
        Textarea
      </template>

      A textarea is an element on a webpage that you can type into.
    </MoleculeDocsHeader>

    <label
      class="field-group"
      label="Note"
    >
      <textarea
        type="text"
        class="input"
        placeholder="Some text"
      />
      <span class="addon bi-pencil-fill" />
    </label>
    <label
      class="field-group"
      label="Note"
    >
      <div class="input input-group relative">
        <textarea
          type="text"
          class="input w-full h-full"
          placeholder="Some text"
        />
        <i class="btn bi bi-clipboard" />
        <span class="badge absolute -top-3 -right-3">0/100</span>
      </div>
      <span class="addon bi-pencil-fill" />
    </label>
  </MoleculeDocsSection>
</template>

<script setup lang="ts"></script>

<style scoped>
textarea {
  line-height: normal !important;
}
</style>

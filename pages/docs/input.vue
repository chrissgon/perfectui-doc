<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Forms
      </template>
      <template #title>
        Input
      </template>
      A basic widget for getting the user input is a text field.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent>
      <template #title>
        Basic
      </template>
      <p>
        To create inputs, simply add the
        <AtomToken>.input</AtomToken> class to the
        <AtomToken>input</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_INPUT_BASIC" />

      <p>Also possible add a placeholder.</p>

      <OrganismComponentExample :code="CODE_VIEW_INPUT_PLACEHOLDER" />
    </MoleculeDocsContent>

    <!-- types -->
    <MoleculeDocsContent>
      <template #title>
        Types
      </template>
      <p>The most commonly used input types.</p>

      <OrganismComponentExample :code="CODE_VIEW_INPUT_TYPES" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_INPUT_BASIC = `<input class="input">`;
const CODE_VIEW_INPUT_PLACEHOLDER = `<input class="input" placeholder="This is placeholder">`;
const CODE_VIEW_INPUT_TYPES = `<form class="flex flex-col gap-3">
  <label class="field-group">
    <input class="input" placeholder="Text" />
  </label>
  <label class="field-group">
    <input class="input" type="number" placeholder="Number" />
  </label>
  <label class="field-group">
    <input class="input" type="email" placeholder="Email" />
  </label>
  <label class="field-group">
    <input class="input" type="password" placeholder="Password" />
  </label>
  <label class="field-group">
    <input class="input" type="search" placeholder="Search" />
  </label>
  <label class="field-group">
    <input class="input" type="week" placeholder="Week" />
  </label>
  <label class="field-group">
    <input class="input" type="month" placeholder="Month" />
  </label>
  <label class="field-group">
    <input class="input" type="date" placeholder="Date" />
  </label>
</form>
`;
</script>

<style scoped></style>

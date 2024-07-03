<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Forms
      </template>
      <template #title>
        Select
      </template>

      Select allows users to make a single selection or multiple selections from
      a list of options.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>

      <p>
        To create selects, simply add the
        <AtomToken>.input</AtomToken> class to the
        <AtomToken>select</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_SELECT_BASIC" />
    </MoleculeDocsContent>

    <!-- label message -->
    <MoleculeDocsContent id="label-message">
      <template #title>
        Label/Message
      </template>

      <p>
        You can use
        <NuxtLink
          class="btn-link-primary"
          to="/docs/field-group"
        >
          Field Group
        </NuxtLink>
        with <AtomToken>select</AtomToken> to create complex elements.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_SELECT_LABEL" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_SELECT_BASIC = `<select class="input">
  <option value="#" disabled selected>Select an option</option>
  <option value="#">One</option>
  <option value="#">Two</option>
  <option value="#">Three</option>
</select>
`;
const CODE_VIEW_SELECT_LABEL = `<label
  class="field-group field-group-error"
  data-label="Currency"
  data-message="Choose a currency"
>
  <select class="input">
    <option value="#" disabled selected>Select your currency</option>
    <option value="#">Euro</option>
    <option value="#">Dollar</option>
    <option value="#">Pounds</option>
  </select>
  <span class="addon bi-bank"></span>
</label>
`;
</script>

<style scoped></style>

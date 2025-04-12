<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Forms
      </template>
      <template #title>
        Input Group
      </template>
      Easily extend input by adding text and icons.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>
      <p>You can extend input with icons or texts.</p>
      <p>
        To extend inputs, simply add the
        <AtomToken>.input-group</AtomToken> class to the
        <AtomToken>.input</AtomToken> element.
      </p>
      <p>
        After, add <AtomToken>.input</AtomToken> element inside
        <AtomToken>.input-group</AtomToken> parent.
      </p>
      <p>Others elements will be consider texts or icons.</p>

      <OrganismComponentExample :code="CODE_VIEW_INPUT_GROUP_BASIC" />
    </MoleculeDocsContent>

    <!-- mixed -->
    <MoleculeDocsContent id="mixed">
      <template #title>
        Mixed
      </template>
      <p>
        You can add multiple <AtomToken>.input</AtomToken> inside a
        <AtomToken>.input-group</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_INPUT_GROUP_MIXED" />
    </MoleculeDocsContent>

    <!-- buttons -->
    <MoleculeDocsContent id="buttons">
      <template #title>
        Buttons
      </template>

      <p>
        You can also add buttons inside a <AtomToken>.input-group</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_INPUT_GROUP_BUTTON" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_INPUT_GROUP_BASIC = `<label class="field-group">
  <div class="input input-group">
    <i class="bi-person"></i>
    <input type="text" class="input" placeholder="Your name" />
    <span>
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
  </div>
</label>
`;
const CODE_VIEW_INPUT_GROUP_MIXED = `<label class="field-group field-group-success" data-message="Verified">
  <div class="input input-group">
    <i class="bi-envelope"></i>
    <input type="text" class="input" placeholder="your_email" />
    <span>@</span>
    <select class="input">
      <option>gmail.com</option>
      <option>outlook.com</option>
      <option>hotmail.com</option>
    </select>
  </div>
</label>
`;
const CODE_VIEW_INPUT_GROUP_BUTTON = `<label class="field-group">
  <div class="input input-group">
    <button class="btn style-link-primary">
      New
      <i class="bi-plus-lg"></i>
    </button>
    <input type="text" class="input" placeholder="Write a task" />
    <button class="btn style-link-error">
      Delete
      <i class="bi-trash"></i>
    </button>
    <button class="btn style-solid-success">
      Done
      <i class="bi-check-lg"></i>
    </button>
  </div>
</label>
`;
</script>

<style scoped></style>

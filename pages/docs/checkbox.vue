<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Forms
      </template>
      <template #title>
        Checkbox
      </template>

      A checkbox is an input control that allows a user to select one or more
      options from a number of choices.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent>
      <template #title>
        Basic
      </template>

      <p>
        To create checkboxes, simply add the
        <AtomToken>.checkbox</AtomToken> class to the
        <AtomToken>input</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_CHECKBOX_BASIC" />
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title>
        Checkbox group
      </template>

      <p>A group of checkboxes elements.</p>

      <OrganismComponentExample :code="CODE_VIEW_CHECKBOX_GROUP" />
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title>
        Checkbox with Field Group
      </template>

      <p>
        You can use checkboxes with
        <NuxtLink
          class="btn-link-primary"
          to="/docs/field-group"
        >
          Field Group
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_CHECKBOX_FIELD_GROUP" />
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title>
        Checkbox with Lists
      </template>

      <p>
        You can use checkboxes with
        <NuxtLink
          class="btn-link-primary"
          to="/docs/list"
        >
          Lists
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_CHECKBOX_LIST" />

      <p>You can make the list item appear with checkbox.</p>

      <OrganismComponentExample :code="CODE_VIEW_CHECKBOX_LIST_VERTICAL" />

      <p>
        You can also make a horizontal list group item appear with checkbox.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_CHECKBOX_LIST_HORIZONTAL" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_CHECKBOX_BASIC = `<ul class="list unmarker">
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle" />
    Default checkbox
  </label>
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle" indeterminate />
    Indeterminate checkbox
  </label>
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle" checked />
    Checked checkbox
  </label>
  <label class="list-item" disabled>
    <input type="checkbox" class="checkbox align-middle" />
    Disabled checkbox
  </label>
</ul>
`;
const CODE_VIEW_CHECKBOX_GROUP = `<div class="flex flex-wrap">
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" />
      Apple
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" indeterminate />
      Apple
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" checked />
      Apple
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="checkbox align-middle" />
      Apple
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" />
      Pear
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" indeterminate />
      Pear
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" checked />
      Pear
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="checkbox align-middle" />
      Pear
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" />
      Orange
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" indeterminate />
      Orange
    </label>
    <label class="list-item">
      <input type="checkbox" class="checkbox align-middle" checked />
      Orange
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="checkbox align-middle" />
      Orange
    </label>
  </ul>
</div>
`;
const CODE_VIEW_CHECKBOX_FIELD_GROUP = `<div class="flex flex-col gap-2">
  <label class="field-group">
    <span class="addon">
      <input type="checkbox" class="checkbox" />
    </span>
    <div class="input">
      Default checkbox
    </div>
  </label>
  <label class="field-group">
    <div class="input">
      Default checkbox
    </div>
    <span class="addon">
      <input type="checkbox" class="checkbox" />
    </span>
  </label>
</div>
`;

const CODE_VIEW_CHECKBOX_LIST = `<ul class="list unmarker">
  <label class="list-item !flex gap-2">
    <input type="checkbox" class="checkbox" />
    <div>
      <p class="font-bold">Delete</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
  <label class="list-item !flex gap-2">
    <input type="checkbox" class="checkbox" />
    <div>
      <p class="font-bold">Archive</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
</ul>
`;

const CODE_VIEW_CHECKBOX_LIST_VERTICAL = `<ul class="unmarker sm:w-64 list list-bordered group-col">
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle mr-2" />
    Christopher Gonçalves
  </label>
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle mr-2" />
    Amanda Ketellyn
  </label>
  <label class="list-item">
    <input type="checkbox" class="checkbox align-middle mr-2" />
    Thais Emilly
  </label>
</ul>
`;

const CODE_VIEW_CHECKBOX_LIST_HORIZONTAL = `<ul class="unmarker sm:w-64 list list-bordered group-row">
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="checkbox" />
    Christopher Gonçalves
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="checkbox" />
    Amanda Ketellyn
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="checkbox" />
    Thais Emilly
  </label>
</ul>
`;
</script>

<style scoped></style>

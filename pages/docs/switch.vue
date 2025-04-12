<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Forms
      </template>
      <template #title>
        Switch
      </template>

      A toggle is used to view or switch between enabled or disabled states.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>

      <p>
        To create switches, simply add the
        <AtomToken>.switch</AtomToken> class to the
        <AtomToken>input:checkbox</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_SWTICH_BASIC" />
    </MoleculeDocsContent>

    <!-- group -->
    <MoleculeDocsContent id="group">
      <template #title>
        Switch group
      </template>

      <p>A group of switches elements.</p>

      <OrganismComponentExample :code="CODE_VIEW_SWITCH_GROUP" />
    </MoleculeDocsContent>

    <!-- field-group -->
    <MoleculeDocsContent id="field-group">
      <template #title>
        Switch with Field Group
      </template>

      <p>
        You can use switches with
        <NuxtLink
          class="style-link-primary"
          to="/docs/field-group"
        >
          Field Group
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_SWITCH_FIELD_GROUP" />
    </MoleculeDocsContent>

    <!-- lists -->
    <MoleculeDocsContent id="lists">
      <template #title>
        Switch with Lists
      </template>

      <p>
        You can use switches with
        <NuxtLink
          class="style-link-primary"
          to="/docs/list"
        >
          Lists
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_SWITCH_LIST" />

      <p>You can make the list item appear with switch.</p>

      <OrganismComponentExample :code="CODE_VIEW_SWITCH_LIST_VERTICAL" />

      <p>You can also make a horizontal list group item appear with switch.</p>

      <OrganismComponentExample :code="CODE_VIEW_SWITCH_LIST_HORIZONTAL" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_SWTICH_BASIC = `<ul class="list unmarker">
  <label class="list-item">
    <input type="checkbox" class="switch" />
    Default switch
  </label>
  <label class="list-item">
    <input type="checkbox" class="switch" checked />
    Checked switch
  </label>
  <label class="list-item" disabled>
    <input type="checkbox" class="switch" />
    Disabled switch
  </label>
</ul>
`;
const CODE_VIEW_SWITCH_GROUP = `<div class="flex flex-wrap">
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" />
      Apple
    </label>
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" checked />
      Apple
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="switch align-middle" />
      Apple
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" />
      Pear
    </label>
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" checked />
      Pear
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="switch align-middle" />
      Pear
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" />
      Orange
    </label>
    <label class="list-item">
      <input type="checkbox" class="switch align-middle" checked />
      Orange
    </label>
    <label class="list-item" disabled>
      <input type="checkbox" class="switch align-middle" />
      Orange
    </label>
  </ul>
</div>
`;
const CODE_VIEW_SWITCH_FIELD_GROUP = `<div class="flex flex-col gap-2">
  <label class="field-group">
    <span class="addon">
      <input type="checkbox" class="switch" />
    </span>
    <div class="input">
      Default switch
    </div>
  </label>
  <label class="field-group">
    <div class="input">
      Checked switch
    </div>
    <span class="addon">
      <input type="checkbox" class="switch" checked />
    </span>
  </label>
</div>
`;

const CODE_VIEW_SWITCH_LIST = `<ul class="list unmarker">
  <label class="list-item !flex gap-2">
    <input type="checkbox" class="switch !h-fit" checked />
    <div>
      <p class="font-bold">Delete</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
  <label class="list-item !flex gap-2">
    <input type="checkbox" class="switch !h-fit" />
    <div>
      <p class="font-bold">Archive</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
</ul>
`;

const CODE_VIEW_SWITCH_LIST_VERTICAL = `<ul class="unmarker sm:w-64 list list-bordered group-col">
  <label class="list-item">
    <input type="checkbox" class="switch align-middle mr-2" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item">
    <input type="checkbox" class="switch align-middle mr-2" />
    Amanda Ketellyn
  </label>
  <label class="list-item">
    <input type="checkbox" class="switch align-middle mr-2" />
    Thais Emilly
  </label>
</ul>
`;

const CODE_VIEW_SWITCH_LIST_HORIZONTAL = `<ul class="unmarker sm:w-64 list list-bordered group-row">
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="switch" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="switch" />
    Amanda Ketellyn
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="checkbox" class="switch" />
    Thais Emilly
  </label>
</ul>
`;
</script>

<style scoped></style>

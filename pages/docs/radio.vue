<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Forms
      </template>
      <template #title>
        Radio
      </template>

      A radio input allows people to select only one option from a number of
      choices. Radio is generally displayed in a radio group.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>

      <p>
        To create radios, simply add the
        <AtomToken>.radio</AtomToken> class to the
        <AtomToken>input</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_RADIO_BASIC" />
    </MoleculeDocsContent>

    <!-- group -->
    <MoleculeDocsContent id="group">
      <template #title>
        Radio group
      </template>

      <p>A group of radios elements.</p>

      <OrganismComponentExample :code="CODE_VIEW_RADIO_GROUP" />
    </MoleculeDocsContent>

    <!-- field group -->
    <MoleculeDocsContent id="field-group">
      <template #title>
        Radio with Field Group
      </template>

      <p>
        You can use radios with
        <NuxtLink
          class="style-link-primary"
          to="/docs/field-group"
        >
          Field Group
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_RADIO_FIELD_GROUP" />
    </MoleculeDocsContent>

    <!-- lists -->
    <MoleculeDocsContent id="lists">
      <template #title>
        Radio with Lists
      </template>

      <p>
        You can use radios with
        <NuxtLink
          class="style-link-primary"
          to="/docs/list"
        >
          Lists
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_RADIO_LIST" />

      <p>You can make the list item appear with radio.</p>

      <OrganismComponentExample :code="CODE_VIEW_RADIO_LIST_VERTICAL" />

      <p>You can also make a horizontal list group item appear with radio.</p>

      <OrganismComponentExample :code="CODE_VIEW_RADIO_LIST_HORIZONTAL" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_RADIO_BASIC = `<ul class="list unmarker">
  <label class="list-item">
    <input type="radio" name="radio-basic" class="radio align-middle" />
    Default radio
  </label>
  <label class="list-item">
    <input type="radio" name="radio-basic" class="radio align-middle" checked />
    Checked radio
  </label>
  <label class="list-item" disabled>
    <input type="radio" name="radio-basic" class="radio align-middle" />
    Disabled radio
  </label>
</ul>
`;
const CODE_VIEW_RADIO_GROUP = `<div class="flex flex-wrap">
  <ul class="list unmarker">
    <label class="list-item">
      <input type="radio" name="radio-apple" class="radio align-middle" />
      Apple
    </label>
    <label class="list-item">
      <input type="radio" name="radio-apple" class="radio align-middle" checked />
      Apple
    </label>
    <label class="list-item" disabled>
      <input type="radio" name="radio-apple" class="radio align-middle" />
      Apple
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="radio" name="radio-pear" class="radio align-middle" />
      Pear
    </label>
    <label class="list-item">
      <input type="radio" name="radio-pear" class="radio align-middle" checked />
      Pear
    </label>
    <label class="list-item" disabled>
      <input type="radio" name="radio-pear" class="radio align-middle" />
      Pear
    </label>
  </ul>
  <ul class="list unmarker">
    <label class="list-item">
      <input type="radio" name="radio-orange" class="radio align-middle" />
      Orange
    </label>
    <label class="list-item">
      <input type="radio" name="radio-orange" class="radio align-middle" checked />
      Orange
    </label>
    <label class="list-item" disabled>
      <input type="radio" name="radio-orange" class="radio align-middle" />
      Orange
    </label>
  </ul>
</div>
`;
const CODE_VIEW_RADIO_FIELD_GROUP = `<div class="flex flex-col gap-2">
  <label class="field-group">
    <span class="addon">
      <input type="radio" class="radio" />
    </span>
    <div class="input">
      Default radio
    </div>
  </label>
  <label class="field-group">
    <div class="input">
      Checked radio
    </div>
    <span class="addon">
      <input type="radio" class="radio" checked />
    </span>
  </label>
</div>
`;

const CODE_VIEW_RADIO_LIST = `<ul class="list unmarker">
  <label class="list-item !flex gap-2">
    <input type="radio" name="radio-list" class="radio" checked />
    <div>
      <p class="font-bold">Delete</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
  <label class="list-item !flex gap-2">
    <input type="radio" name="radio-list" class="radio" />
    <div>
      <p class="font-bold">Archive</p>
      <p class="text-secondary">Notify me when this action happens.</p>
    </div>
  </label>
</ul>
`;

const CODE_VIEW_RADIO_LIST_VERTICAL = `<ul class="unmarker sm:w-64 list list-bordered group-col">
  <label class="list-item">
    <input type="radio" name="radio-list-vertical" class="radio align-middle mr-2" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item">
    <input type="radio" name="radio-list-vertical" class="radio align-middle mr-2" />
    Amanda Ketellyn
  </label>
  <label class="list-item">
    <input type="radio" name="radio-list-vertical" class="radio align-middle mr-2" />
    Thais Emilly
  </label>
</ul>
`;

const CODE_VIEW_RADIO_LIST_HORIZONTAL = `<ul class="unmarker sm:w-64 list list-bordered group-row">
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="radio" name="radio-list-horizontal" class="radio" checked />
    Christopher Gonçalves
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="radio" name="radio-list-horizontal" class="radio" />
    Amanda Ketellyn
  </label>
  <label class="list-item !flex gap-2 items-center whitespace-nowrap">
    <input type="radio" name="radio-list-horizontal" class="radio" />
    Thais Emilly
  </label>
</ul>
`;
</script>

<style scoped></style>

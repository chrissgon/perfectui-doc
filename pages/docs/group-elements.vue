<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Layout
      </template>
      <template #title>
        Group Elements
      </template>

      An easy way to deal with grouping elements.
    </MoleculeDocsHeader>

    <MoleculeDocsContent>
      <template #title>
        How it works
      </template>

      <p>
        To deal with grouping elements, PerfectUI provides the
        <AtomToken>.group-row</AtomToken>, <AtomToken>.group-col</AtomToken> and
        <AtomToken>.group-item</AtomToken> classes. These will be useful for
        dealing with unnecessary borders and rounding of elements.
      </p>

      <p>
        For some elements, the use of this class is mandatory, such as the
        <AtomToken>&lt;accordion&gt;</AtomToken>.
      </p>

      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview>
          Preview
        </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_ACCORDION_GROUP" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_ACCORDION_GROUP" />
        </template>
      </OrganismTabs>

      <AtomNoteWarn>
        If the children of the group have a class
        with<AtomToken>.item</AtomToken>, it is not necessary to add the class
        <AtomToken>.group-item</AtomToken>, as in the case of accordion.
      </AtomNoteWarn>

      <p>
        Other elements are optional, such as the
        <AtomToken>&lt;button&gt;</AtomToken>.
      </p>
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview>
          Preview
        </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_BUTTON_GROUP" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_BUTTON_GROUP" />
        </template>
      </OrganismTabs>

      <AtomNoteWarn>
        The buttons need the <AtomToken>.group-item</AtomToken> class to work, because they have no class <AtomToken>.item</AtomToken>.
      </AtomNoteWarn>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_ACCORDION_GROUP = `<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>First question</summary>
    <article>First answer</article>
  </details>
  <details class="accordion-item">
    <summary>Second question</summary>
    <article>Second answer</article>
  </details>
</div>
`;
const CODE_VIEW_BUTTON_GROUP = `<div class="group group-row">
  <button class="group-item btn btn-white">Left</button>
  <button class="group-item btn btn-white">Middle</button>
  <button class="group-item btn btn-white">Right</button>
</div>
`;
</script>

<style scoped></style>

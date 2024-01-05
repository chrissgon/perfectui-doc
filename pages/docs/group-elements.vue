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
        <AtomToken>.group-row</AtomToken>, <AtomToken>.group-col</AtomToken>,
        <AtomToken>.group-responsive</AtomToken> and
        <AtomToken>.group-item</AtomToken> classes. These will be useful for
        dealing with unnecessary borders and rounding of elements.
      </p>

      <p>
        For some elements, the use of this class is mandatory, such as the
        <AtomToken>&lt;accordion&gt;</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ACCORDION_GROUP" />

      <AtomNoteWarn>
        If the children of the group have a class
        with<AtomToken>.item</AtomToken>, it is not necessary to add the class
        <AtomToken>.group-item</AtomToken>, as in the case of accordion.
      </AtomNoteWarn>

      <p>
        Other elements are optional, such as the
        <AtomToken>&lt;button&gt;</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_GROUP" />

      <AtomNoteWarn>
        The buttons need the <AtomToken>.group-item</AtomToken> class to work,
        because they have no class <AtomToken>.item</AtomToken>.
      </AtomNoteWarn>
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title>
        Group responsive
      </template>
      <p>
        If you need the group to change automatically with the screen size,
        simply use <AtomToken>group-responsive</AtomToken>.
      </p>
      <p>
        For screens larger than <AtomToken>1024px</AtomToken>,
        <AtomToken>group-row</AtomToken> will be applied, for smaller screens
        <AtomToken>group-col</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_CARD_GROUP_RESPONSIVE" />
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
const CODE_VIEW_CARD_GROUP_RESPONSIVE = `<section class="group-responsive">
  <!-- card #1 -->
  <div class="card group-item">
    <img alt="Accordion Image" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
  <!-- card #2 -->
  <div class="card group-item">
    <img alt="Accordion Image" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
  <!-- card #3 -->
  <div class="card group-item">
    <img alt="Accordion Image" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
</section>
`;
</script>

<style scoped></style>

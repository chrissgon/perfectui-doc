<template>
  <div class="widget-response w-full">
    <MoleculeCodePreview
      class="w-full !p-0"
      :preview="CODE_VIEW_CARD_GROUP_RESPONSIVE"
    />
  </div>
</template>

<script setup lang="ts">
// data
const CODE_VIEW_CARD_GROUP_RESPONSIVE = `<div class="card">
  <img alt="Accordion Image" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
  <article class="card-content flex flex-col justify-between">
    <div>
      <h1 class="font-semibold text-xl mb-2">Card Title</h1>
      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
  </article>
</div>
`;
</script>

<style>
.widget-response{
  container-type: inline-size;
}
@container (min-width: 700px) {
  .card {
    display: flex;
  }
  .card > img {
    max-width: 20rem;
  }
}
</style>
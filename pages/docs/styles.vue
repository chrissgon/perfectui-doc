<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        General
      </template>
      <template #title>
        Styles
      </template>

      Pre-defined styles to use on any element.
    </MoleculeDocsHeader>

    <MoleculeDocsContent id="how-works">
      <template #title>
        How it works
      </template>

      <p>
        To deal with styling different elements, without duplicate code, Perfect
        UI provide general style classes to use with different elements like
        <AtomToken>badges</AtomToken>, <AtomToken>buttons</AtomToken>,
        <AtomToken>alerts</AtomToken> and etc.
      </p>

      <p>
        We provide the most commonly used style types, such as
        <AtomToken>solid</AtomToken>, <AtomToken>outline</AtomToken>,
        <AtomToken>soft</AtomToken>, <AtomToken>link</AtomToken>,
        <AtomToken>white</AtomToken>, <AtomToken>black</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_STYLE_TYPES" />

      <p>
        For each type, we provide the most commonly used variations, such as
        <AtomToken>primary</AtomToken>, <AtomToken>secondary</AtomToken>,
        <AtomToken>success</AtomToken>, <AtomToken>warn</AtomToken>,
        <AtomToken>error</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_STYLE_VARIANTS" />

      <p>
        To use it, simply add the class
        <AtomToken>style-[type]-[variation]</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_STYLE_COMBINATIONS" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_STYLE_TYPES = `
<button class="btn style-solid-primary">Solid</button>
<button class="btn style-outline-primary">Outline</button>
<button class="btn style-soft-primary">Soft</button>
<button class="btn style-link-primary">Link</button>
<button class="btn style-white">White</button>
<button class="btn style-black">Black</button>
`;

const CODE_VIEW_STYLE_VARIANTS = `
<button class="btn style-solid-primary">Primary</button>
<button class="btn style-solid-secondary">Secondary</button>
<button class="btn style-solid-success">Success</button>
<button class="btn style-solid-warn">Warn</button>
<button class="btn style-solid-error">Error</button>
`;
const CODE_VIEW_STYLE_COMBINATIONS = `
<button class="btn style-outline-primary">Primary</button>
<button class="btn style-outline-secondary">Secondary</button>
<button class="btn style-soft-success">Success</button>
<button class="btn style-soft-warn">Warn</button>
<button class="btn style-link-error">Error</button>
`;
</script>

<style scoped></style>

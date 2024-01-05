<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Base Components
      </template>
      <template #title>
        Buttons
      </template>

      Use different button styles for actions in forms, dialogs and more.
    </MoleculeDocsHeader>

    <!-- types -->
    <MoleculeDocsContent>
      <template #title>
        Types
      </template>
      <p>
        The most commonly used button styles, we provide
        <AtomToken>solid</AtomToken>, <AtomToken>outline</AtomToken>,
        <AtomToken>link</AtomToken>, <AtomToken>white</AtomToken> and
        <AtomToken>black</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_TYPES" />
    </MoleculeDocsContent>

    <!-- rounded -->
    <MoleculeDocsContent>
      <template #title>
        Rounded buttons
      </template>
      <p>
        Use the <AtomToken>.rounded-full</AtomToken> class to create rounded buttons.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_TYPES_ROUNDED" />
    </MoleculeDocsContent>

    <!-- solid -->
    <MoleculeDocsContent>
      <template #title>
        Solid buttons
      </template>
      <p>
        To create solid buttons, simply use the
        <AtomToken>.btn-solid-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_SOLID_COLORS" />
    </MoleculeDocsContent>

    <!-- outline -->
    <MoleculeDocsContent>
      <template #title>
        Outline buttons
      </template>
      <p>
        To create outline buttons, simply use the
        <AtomToken>.btn-outline-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_OUTLINE_COLORS" />
    </MoleculeDocsContent>

    <!-- link -->
    <MoleculeDocsContent>
      <template #title>
        Link buttons
      </template>
      <p>
        To create link buttons, simply use the
        <AtomToken>.btn-link-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_LINK_COLORS" />
    </MoleculeDocsContent>

    <!-- white / black -->
    <MoleculeDocsContent>
      <template #title>
        White/Black buttons
      </template>
      <p>
        To create white or black button, simply use the
        <AtomToken>.btn-white</AtomToken> or
        <AtomToken>.btn-black</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_WHITE_BLACK" />
    </MoleculeDocsContent>

    <!-- icons -->
    <MoleculeDocsContent>
      <template #title>
        Icons
      </template>
      <p>
        You can add icons from any library. In the example below we used
        <a
          href="https://icons.getbootstrap.com/"
          target="_blank"
          class="btn-link-primary"
        >
          Bootstrap Icons </a>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_ICON" />
    </MoleculeDocsContent>

    <!-- group -->
    <MoleculeDocsContent>
      <template #title>
        Button group
      </template>
      <p>
        You can group buttons using
        <NuxtLink
          class="btn-link-primary"
          to="/docs/group-elements"
        >
          Layout Group
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_GROUP" />
    </MoleculeDocsContent>

    <!-- disabled -->
    <MoleculeDocsContent>
      <template #title>
        Disabled
      </template>
      <p>
        Make buttons look inactive by adding the
        <AtomToken>disabled</AtomToken> boolean attribute to any
        <AtomToken>&lt;button&gt;</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_DISABLED" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_BUTTON_TYPES = `<button class="btn btn-solid-primary">Solid</button>
<button class="btn btn-outline-primary">Outline</button>
<button class="btn btn-link-primary">Link</button>
<button class="btn btn-white">White</button>
<button class="btn btn-black">Black</button>
`;
const CODE_VIEW_BUTTON_TYPES_ROUNDED = `<button class="btn btn-solid-primary rounded-full">Solid</button>
<button class="btn btn-outline-primary rounded-full">Outline</button>
<button class="btn btn-link-primary rounded-full">Link</button>
<button class="btn btn-white rounded-full">White</button>
<button class="btn btn-black rounded-full">Black</button>
`;
const CODE_VIEW_BUTTON_SOLID_COLORS = `<button class="btn btn-solid-primary">Primary</button>
<button class="btn btn-solid-secondary">Secondary</button>
<button class="btn btn-solid-success">Success</button>
<button class="btn btn-solid-warn">Warn</button>
<button class="btn btn-solid-error">Error</button>
`;
const CODE_VIEW_BUTTON_OUTLINE_COLORS = `<button class="btn btn-outline-primary">Primary</button>
<button class="btn btn-outline-secondary">Secondary</button>
<button class="btn btn-outline-success">Success</button>
<button class="btn btn-outline-warn">Warn</button>
<button class="btn btn-outline-error">Error</button>
`;

const CODE_VIEW_BUTTON_LINK_COLORS = `<button class="btn btn-link-primary">Primary</button>
<button class="btn btn-link-secondary">Secondary</button>
<button class="btn btn-link-success">Success</button>
<button class="btn btn-link-warn">Warn</button>
<button class="btn btn-link-error">Error</button>
`;

const CODE_VIEW_BUTTON_WHITE_BLACK = `<button class="btn btn-white">White</button>
<button class="btn btn-black">Black</button>
`;

const CODE_VIEW_BUTTON_ICON = `<button class="btn btn-solid-primary">Add to cart <i class="bi-basket2-fill"></i></button>
<button class="btn btn-white">Signup free <i class="bi-chevron-right"></i></button>
<button class="btn btn-solid-error"><i class="bi-heart-fill"></i></button>
`;

const CODE_VIEW_BUTTON_GROUP = `<div class="group group-row">
  <button class="group-item btn btn-white">Left</button>
  <button class="group-item btn btn-white">Middle</button>
  <button class="group-item btn btn-white">Right</button>
</div>
`;

const CODE_VIEW_BUTTON_DISABLED = `<button class="btn btn-solid-primary" disabled>Solid</button>
<button class="btn btn-outline-primary" disabled>Outline</button>
<button class="btn btn-link-primary" disabled>Link</button>
<button class="btn btn-white" disabled>White</button>
<button class="btn btn-black" disabled>Black</button>
`;
</script>

<style scoped></style>

<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Components
      </template>
      <template #title>
        Buttons
      </template>

      Use different button styles for actions in forms, dialogs and more.
    </MoleculeDocsHeader>

    <!-- types -->
    <MoleculeDocsContent id="types">
      <template #title>
        Types
      </template>
      <p>
        The most commonly used button styles, we provide
        <AtomToken>solid</AtomToken>, <AtomToken>outline</AtomToken>,
        <AtomToken>soft</AtomToken>, <AtomToken>link</AtomToken>,
        <AtomToken>white</AtomToken> and <AtomToken>black</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_TYPES" />
    </MoleculeDocsContent>

    <!-- rounded -->
    <MoleculeDocsContent id="rounded">
      <template #title>
        Rounded buttons
      </template>
      <p>
        Use the <AtomToken>.rounded-full</AtomToken> class to create rounded
        buttons.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_TYPES_ROUNDED" />
    </MoleculeDocsContent>

    <!-- solid -->
    <MoleculeDocsContent id="solid">
      <template #title>
        Solid buttons
      </template>
      <p>
        To create solid buttons, simply use the
        <AtomToken>.style-solid-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_SOLID_COLORS" />
    </MoleculeDocsContent>

    <!-- outline -->
    <MoleculeDocsContent id="outline">
      <template #title>
        Outline buttons
      </template>
      <p>
        To create outline buttons, simply use the
        <AtomToken>.style-outline-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_OUTLINE_COLORS" />
    </MoleculeDocsContent>

    <!-- soft -->
    <MoleculeDocsContent id="soft">
      <template #title>
        Soft buttons
      </template>
      <p>
        To create soft buttons, simply use the
        <AtomToken>.style-soft-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_SOFT_COLORS" />
    </MoleculeDocsContent>

    <!-- link -->
    <MoleculeDocsContent id="link">
      <template #title>
        Link buttons
      </template>
      <p>
        To create link buttons, simply use the
        <AtomToken>.style-link-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_LINK_COLORS" />
    </MoleculeDocsContent>

    <!-- white / black -->
    <MoleculeDocsContent id="white-black">
      <template #title>
        White/Black buttons
      </template>
      <p>
        To create white or black button, simply use the
        <AtomToken>.style-white</AtomToken> or
        <AtomToken>.style-black</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_WHITE_BLACK" />
    </MoleculeDocsContent>

    <!-- icons -->
    <MoleculeDocsContent id="icons">
      <template #title>
        Icons
      </template>
      <p>
        You can add icons from any library. In the example below we used
        <a
          href="https://icons.getbootstrap.com/"
          target="_blank"
          class="style-link-primary"
        >
          Bootstrap Icons </a>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_ICON" />
    </MoleculeDocsContent>

    <!-- group -->
    <MoleculeDocsContent id="group">
      <template #title>
        Button group
      </template>
      <p>
        You can group buttons using
        <NuxtLink
          class="style-link-primary"
          to="/docs/layout-group"
        >
          Layout Group
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BUTTON_GROUP" />
    </MoleculeDocsContent>

    <!-- disabled -->
    <MoleculeDocsContent id="disabled">
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
const CODE_VIEW_BUTTON_TYPES = `
<button class="btn style-solid-primary">Solid</button>
<button class="btn style-outline-primary">Outline</button>
<button class="btn style-soft-primary">Soft</button>
<button class="btn style-link-primary">Link</button>
<button class="btn style-white">White</button>
<button class="btn style-black">Black</button>
`;
const CODE_VIEW_BUTTON_TYPES_ROUNDED = `
<button class="btn style-solid-primary rounded-full">Solid</button>
<button class="btn style-outline-primary rounded-full">Outline</button>
<button class="btn style-soft-primary rounded-full">Soft</button>
<button class="btn style-link-primary rounded-full">Link</button>
<button class="btn style-white rounded-full">White</button>
<button class="btn style-black rounded-full">Black</button>
`;
const CODE_VIEW_BUTTON_SOLID_COLORS = `
<button class="btn style-solid-primary">Primary</button>
<button class="btn style-solid-secondary">Secondary</button>
<button class="btn style-solid-success">Success</button>
<button class="btn style-solid-warn">Warn</button>
<button class="btn style-solid-error">Error</button>
`;
const CODE_VIEW_BUTTON_OUTLINE_COLORS = `
<button class="btn style-outline-primary">Primary</button>
<button class="btn style-outline-secondary">Secondary</button>
<button class="btn style-outline-success">Success</button>
<button class="btn style-outline-warn">Warn</button>
<button class="btn style-outline-error">Error</button>
`;
const CODE_VIEW_BUTTON_SOFT_COLORS = `
<button class="btn style-soft-primary">Primary</button>
<button class="btn style-soft-secondary">Secondary</button>
<button class="btn style-soft-success">Success</button>
<button class="btn style-soft-warn">Warn</button>
<button class="btn style-soft-error">Error</button>
`;

const CODE_VIEW_BUTTON_LINK_COLORS = `
<button class="btn style-link-primary">Primary</button>
<button class="btn style-link-secondary">Secondary</button>
<button class="btn style-link-success">Success</button>
<button class="btn style-link-warn">Warn</button>
<button class="btn style-link-error">Error</button>
`;

const CODE_VIEW_BUTTON_WHITE_BLACK = `
<button class="btn style-white">White</button>
<button class="btn style-black">Black</button>
`;

const CODE_VIEW_BUTTON_ICON = `
<button class="btn style-solid-primary">Add to cart <i class="bi-basket2-fill"></i></button>
<button class="btn style-white">Signup free <i class="bi-chevron-right"></i></button>
<button class="btn style-solid-error"><i class="bi-heart-fill"></i></button>
`;

const CODE_VIEW_BUTTON_GROUP = `
<div class="group group-row">
  <button class="group-item btn style-white">Left</button>
  <button class="group-item btn style-white">Middle</button>
  <button class="group-item btn style-white">Right</button>
</div>
`;

const CODE_VIEW_BUTTON_DISABLED = `
<button class="btn style-solid-primary" disabled>Solid</button>
<button class="btn style-outline-primary" disabled>Outline</button>
<button class="btn style-link-primary" disabled>Link</button>
<button class="btn style-white" disabled>White</button>
<button class="btn style-black" disabled>Black</button>
`;
</script>

<style scoped></style>

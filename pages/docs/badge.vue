<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Components
      </template>
      <template #title>
        Badge
      </template>
      A visual indicator for a value or status descriptor for UI elements.
    </MoleculeDocsHeader>

    <!-- types -->
    <MoleculeDocsContent id="types">
      <template #title>
        Types
      </template>
      <p>
        The most commonly used badge styles, we provide
        <AtomToken>solid</AtomToken>, <AtomToken>outline</AtomToken>,
        <AtomToken>white</AtomToken> and <AtomToken>black</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_TYPES" />
    </MoleculeDocsContent>

    <!-- rounded -->
    <MoleculeDocsContent id="rounded">
      <template #title>
        Rounded badges
      </template>
      <p>
        Use the <AtomToken>.rounded-full</AtomToken> class to create rounded
        badges.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_TYPES_ROUNDED" />
    </MoleculeDocsContent>

    <!-- solid -->
    <MoleculeDocsContent id="solid">
      <template #title>
        Solid badges
      </template>
      <p>
        To create solid badges, simply use the
        <AtomToken>.badge-solid-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_SOLID_COLORS" />
    </MoleculeDocsContent>

    <!-- outline -->
    <MoleculeDocsContent id="outline">
      <template #title>
        Outline badges
      </template>
      <p>
        To create outline badges, simply use the
        <AtomToken>.badge-outline-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_OUTLINE_COLORS" />
    </MoleculeDocsContent>

    <!-- white / black -->
    <MoleculeDocsContent id="white-black">
      <template #title>
        White/Black badges
      </template>
      <p>
        To create white or black badge, simply use the
        <AtomToken>.badge-white</AtomToken> or
        <AtomToken>.badge-black</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_WHITE_BLACK" />
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
          class="btn-link-primary"
        >
          Bootstrap Icons </a>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_ICON" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_BADGE_TYPES = `<span class="badge badge-solid-primary">Solid</span>
<span class="badge badge-outline-primary">Outline</span>
<span class="badge badge-white">White</span>
<span class="badge badge-black">Black</span>
`;
const CODE_VIEW_BADGE_TYPES_ROUNDED = `<span class="badge badge-solid-primary rounded-full">Solid</span>
<span class="badge badge-outline-primary rounded-full">Outline</span>
<span class="badge badge-white rounded-full">White</span>
<span class="badge badge-black rounded-full">Black</span>
`;
const CODE_VIEW_BADGE_SOLID_COLORS = `<span class="badge badge-solid-primary">Primary</span>
<span class="badge badge-solid-secondary">Secondary</span>
<span class="badge badge-solid-success">Success</span>
<span class="badge badge-solid-warn">Warn</span>
<span class="badge badge-solid-error">Error</span>
`;
const CODE_VIEW_BADGE_OUTLINE_COLORS = `<span class="badge badge-outline-primary">Primary</span>
<span class="badge badge-outline-secondary">Secondary</span>
<span class="badge badge-outline-success">Success</span>
<span class="badge badge-outline-warn">Warn</span>
<span class="badge badge-outline-error">Error</span>
`;
const CODE_VIEW_BADGE_WHITE_BLACK = `<span class="badge badge-white">White</span>
<span class="badge badge-black">Black</span>
`;
const CODE_VIEW_BADGE_ICON = `<span class="badge badge-solid-error"><i class="bi-heart-fill"></i> Favorite</span>
<span class="badge badge-outline-warn">Best ranking <i class="bi-star-fill"></i></span>
<span class="badge badge-white">Recent viewed <i class="bi-eye-fill"></i></span>
`;
</script>

<style scoped></style>

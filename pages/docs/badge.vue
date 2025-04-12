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
        <AtomToken>soft</AtomToken>, <AtomToken>white</AtomToken> and
        <AtomToken>black</AtomToken>.
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
        <AtomToken>.style-solid-[variant]</AtomToken> class.
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
        <AtomToken>.style-outline-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_OUTLINE_COLORS" />
    </MoleculeDocsContent>

    <!-- soft -->
    <MoleculeDocsContent id="soft">
      <template #title>
        Soft badges
      </template>
      <p>
        To create soft badges, simply use the
        <AtomToken>.style-soft-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_SOFT_COLORS" />
    </MoleculeDocsContent>

    <!-- white / black -->
    <MoleculeDocsContent id="white-black">
      <template #title>
        White/Black badges
      </template>
      <p>
        To create white or black badge, simply use the
        <AtomToken>.style-white</AtomToken> or
        <AtomToken>.style-black</AtomToken> class.
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
          class="style-link-primary"
        >
          Bootstrap Icons
        </a>
        .
      </p>

      <OrganismComponentExample :code="CODE_VIEW_BADGE_ICON" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_BADGE_TYPES = `
<span class="badge style-solid-primary">Solid</span>
<span class="badge style-outline-primary">Outline</span>
<span class="badge style-soft-primary">Soft</span>
<span class="badge style-white">White</span>
<span class="badge style-black">Black</span>
`;
const CODE_VIEW_BADGE_TYPES_ROUNDED = `
<span class="badge style-solid-primary rounded-full">Solid</span>
<span class="badge style-outline-primary rounded-full">Outline</span>
<span class="badge style-soft-primary rounded-full">Soft</span>
<span class="badge style-white rounded-full">White</span>
<span class="badge style-black rounded-full">Black</span>
`;
const CODE_VIEW_BADGE_SOLID_COLORS = `
<span class="badge style-solid-primary">Primary</span>
<span class="badge style-solid-secondary">Secondary</span>
<span class="badge style-solid-success">Success</span>
<span class="badge style-solid-warn">Warn</span>
<span class="badge style-solid-error">Error</span>
`;
const CODE_VIEW_BADGE_OUTLINE_COLORS = `
<span class="badge style-outline-primary">Primary</span>
<span class="badge style-outline-secondary">Secondary</span>
<span class="badge style-outline-success">Success</span>
<span class="badge style-outline-warn">Warn</span>
<span class="badge style-outline-error">Error</span>
`;
const CODE_VIEW_BADGE_SOFT_COLORS = `
<span class="badge style-soft-primary">Primary</span>
<span class="badge style-soft-secondary">Secondary</span>
<span class="badge style-soft-success">Success</span>
<span class="badge style-soft-warn">Warn</span>
<span class="badge style-soft-error">Error</span>
`;
const CODE_VIEW_BADGE_WHITE_BLACK = `
<span class="badge style-white">White</span>
<span class="badge style-black">Black</span>
`;
const CODE_VIEW_BADGE_ICON = `
<span class="badge style-solid-error"><i class="bi-heart-fill"></i> Favorite</span>
<span class="badge style-outline-warn">Best ranking <i class="bi-star-fill"></i></span>
<span class="badge style-white">Recent viewed <i class="bi-eye-fill"></i></span>
`;
</script>

<style scoped></style>

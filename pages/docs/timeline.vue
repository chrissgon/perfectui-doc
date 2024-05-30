<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Base Components
      </template>
      <template #title>
        Timeline
      </template>

      The Timeline Component is designed to display events in chronological
      order, ideal for showcasing history, project milestones, or event
      sequences.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent>
      <template #title>
        Basic
      </template>

      <p>
        The timeline component has three main classes,
        <AtomToken>.timeline</AtomToken>, <AtomToken>.checkpoint</AtomToken>,
        <AtomToken>.checkpoint-icon</AtomToken>.
      </p>

      <div>
        <ul class="list !bg-transparent">
          <li class="list-item text-secondary">
            <AtomToken>.timeline</AtomToken>: Create a timeline. One timeline
            has multiple checkpoints.
          </li>
          <li class="list-item text-secondary">
            <AtomToken>.checkpoint</AtomToken>: Create a checkpoint.
          </li>
          <li class="list-item text-secondary">
            <AtomToken>.checkpoint-icon</AtomToken>: Define the checkpoint icon.
          </li>
        </ul>
      </div>

      <AtomNoteWarn>
        Everything inside the <AtomToken>.checkpoint</AtomToken> element that do
        not have the <AtomToken>.checkpoint-icon</AtomToken> class will be
        consider a <AtomToken>content</AtomToken>.
      </AtomNoteWarn>

      <OrganismComponentExample :code="CODE_VIEW_TIMELINE_BASIC" />
    </MoleculeDocsContent>

    <!-- types -->
    <MoleculeDocsContent>
      <template #title>
        Types
      </template>

      <p>
        We provide differents checkpoints styles, such as
        <AtomToken>solid</AtomToken>, <AtomToken>outline</AtomToken>,
        <AtomToken>link</AtomToken>, <AtomToken>white</AtomToken> and
        <AtomToken>black</AtomToken>.
      </p>

      <p>
        You can change the checkpoint style using differents classes in the
        <AtomToken>.checkpoint</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TIMELINE_TYPES" />
    </MoleculeDocsContent>

    <!-- solid -->
    <MoleculeDocsContent>
      <template #title>
        Solid checkpoints
      </template>

      <p>
        To create a solid checkpoint, simply use the
        <AtomToken>.checkpoint-solid-[variant]</AtomToken> classes.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TIMELINE_SOLID" />
    </MoleculeDocsContent>

    <!-- outline -->
    <MoleculeDocsContent>
      <template #title>
        Outline checkpoints
      </template>

      <p>
        To create a outline checkpoint, simply use the
        <AtomToken>.checkpoint-outline-[variant]</AtomToken> classes.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TIMELINE_OUTLINE" />
    </MoleculeDocsContent>

    <!-- link -->
    <MoleculeDocsContent>
      <template #title>
        Link checkpoints
      </template>

      <p>
        To create a link checkpoint, simply use the
        <AtomToken>.checkpoint-link-[variant]</AtomToken> classes.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TIMELINE_LINK" />
    </MoleculeDocsContent>

    <!-- white / black -->
    <MoleculeDocsContent>
      <template #title>
        White/Black checkpoints
      </template>
      <p>
        To create a white or black checkpoint, simply use the
        <AtomToken>.checkpoint-white</AtomToken> or
        <AtomToken>.checkpoint-black</AtomToken> classes.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TIMELINE_WHITE_BLACK" />
    </MoleculeDocsContent>

    <!-- horizontal -->
    <MoleculeDocsContent>
      <template #title>
        Horizontal
      </template>

      <p>
        To create horizontal timelines, simply add the
        <AtomToken>.group-row</AtomToken> class in the
        <AtomToken>.timeline</AtomToken> parent.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TIMELINE_HORIZONTAL" />
    </MoleculeDocsContent>

    <!-- responsive -->
    <MoleculeDocsContent>
      <template #title>
        Responsive
      </template>

      <p>
        Use
        <NuxtLink
          class="btn-link-primary"
          to="/docs/layout-group"
        >
          Layout Group
        </NuxtLink>
        to create responsible timelines.
      </p>
      <p>
        Simply add the <AtomToken>.group-responsive</AtomToken> class in the
        <AtomToken>.timeline</AtomToken> parent.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TIMELINE_RESPONSIVE" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_TIMELINE_BASIC = `<!-- timeline -->
<figure class="timeline">
  <!-- checkpoint -->
  <figcaption class="checkpoint checkpoint-link-error">
    <!-- checkpoint-icon -->
    <i class="checkpoint-icon bi-exclamation-circle-fill"></i>
    <!-- checkpoint content -->
    <article>
      <h4 class="font-bold">🐞 Release v5.2.0 quick bug fix</h4>
      <p class="text-secondary">
        Find more detailed insctructions
        <a href="#" class="btn-link-primary">here</a>.
      </p>
    </article>
  </figcaption>
</figure>
`;
const CODE_VIEW_TIMELINE_TYPES = `<!-- timeline -->
<figure class="timeline">
  <!-- checkpoint solid -->
  <figcaption class="checkpoint checkpoint-solid-success">
    <i class="checkpoint-icon bi-check-lg"></i>
    <article>
      <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
      <p class="text-secondary">
        Find more detailed insctructions
        <a href="#" class="btn-link-primary">here</a>.
      </p>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
  <!-- checkpoint outline -->
  <figcaption class="checkpoint checkpoint-outline-error">
    <i class="checkpoint-icon bi-exclamation-lg"></i>
    <article>
      <h4 class="font-bold">🐞 Release v5.2.0 quick bug fix</h4>
      <p class="badge badge-white mt-2">Kamilly Aldrey</p>
    </article>
  </figcaption>
  <!-- checkpoint link -->
  <figcaption class="checkpoint checkpoint-link-secondary">
    <i class="checkpoint-icon bi-dot !text-4xl"></i>
    <article>
      <h4 class="font-bold">Take a break ⛳️</h4>
      <p class="text-secondary">Just chill for now... 😉</p>
    </article>
  </figcaption>
  <!-- checkpoint white -->
  <figcaption class="checkpoint checkpoint-white">
    <i class="checkpoint-icon bi-cup-hot"></i>
    <article>
      <h4 class="font-bold">📦 Update "PerfectUI" packages</h4>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
  <!-- checkpoint black -->
  <figcaption class="checkpoint checkpoint-black">
    <i class="checkpoint-icon bi-bookmark-fill"></i>
    <article>
      <h4 class="font-bold">Feature fixed as a priority</h4>
      <p class="badge badge-white mt-2">Kamilly Aldrey</p>
    </article>
  </figcaption>
</figure>
`;

const CODE_VIEW_TIMELINE_SOLID = `<figure class="timeline">
  <figcaption class="checkpoint checkpoint-solid-primary">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-solid-success">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-solid-error">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-solid-warn">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
</figure>
`;
const CODE_VIEW_TIMELINE_OUTLINE = `<figure class="timeline">
  <figcaption class="checkpoint checkpoint-outline-primary">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-outline-success">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-outline-error">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-outline-warn">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
</figure>
`;
const CODE_VIEW_TIMELINE_LINK = `<figure class="timeline">
  <figcaption class="checkpoint checkpoint-link-primary">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-link-success">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-link-error">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-link-warn">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
</figure>
`;
const CODE_VIEW_TIMELINE_WHITE_BLACK = `<figure class="timeline">
  <figcaption class="checkpoint checkpoint-white">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
  <figcaption class="checkpoint checkpoint-black">
    <i class="checkpoint-icon bi-person-fill"></i>
    <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
  </figcaption>
</figure>
`;
const CODE_VIEW_TIMELINE_HORIZONTAL = `<!-- timeline -->
<figure class="timeline group-row min-w-[700px]">
  <!-- checkpoint solid -->
  <figcaption class="checkpoint checkpoint-solid-success">
    <i class="checkpoint-icon bi-check-lg"></i>
    <article>
      <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
      <p class="text-secondary">
        Find more detailed insctructions
        <a href="#" class="btn-link-primary">here</a>.
      </p>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
  <!-- checkpoint outline -->
  <figcaption class="checkpoint checkpoint-outline-error">
    <i class="checkpoint-icon bi-exclamation-lg"></i>
    <article>
      <h4 class="font-bold">🐞 Release v5.2.0 quick bug fix</h4>
      <p class="badge badge-white mt-2">Kamilly Aldrey</p>
    </article>
  </figcaption>
  <!-- checkpoint white -->
  <figcaption class="checkpoint checkpoint-white">
    <i class="checkpoint-icon bi-cup-hot"></i>
    <article>
      <h4 class="font-bold">📦 Update "PerfectUI" packages</h4>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
</figure>
`;
const CODE_VIEW_TIMELINE_RESPONSIVE = `<!-- timeline -->
<figure class="timeline group-responsive">
  <!-- checkpoint solid -->
  <figcaption class="checkpoint checkpoint-solid-success">
    <i class="checkpoint-icon bi-check-lg"></i>
    <article>
      <h4 class="font-bold">Created "PerfectUI in Vue" task</h4>
      <p class="text-secondary">
        Find more detailed insctructions
        <a href="#" class="btn-link-primary">here</a>.
      </p>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
  <!-- checkpoint outline -->
  <figcaption class="checkpoint checkpoint-outline-error">
    <i class="checkpoint-icon bi-exclamation-lg"></i>
    <article>
      <h4 class="font-bold">🐞 Release v5.2.0 quick bug fix</h4>
      <p class="badge badge-white mt-2">Kamilly Aldrey</p>
    </article>
  </figcaption>
  <!-- checkpoint white -->
  <figcaption class="checkpoint checkpoint-white">
    <i class="checkpoint-icon bi-cup-hot"></i>
    <article>
      <h4 class="font-bold">📦 Update "PerfectUI" packages</h4>
      <p class="badge badge-white mt-2">Amanda Ketellyn</p>
    </article>
  </figcaption>
</figure>
`;
</script>

<style scoped></style>

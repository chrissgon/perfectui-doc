<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Components
      </template>
      <template #title>
        List
      </template>

      Create engaging lists using Perfect UI, a powerful tool for styling
      ordered and unordered elements, enhancing readability, and user
      experience.
    </MoleculeDocsHeader>

    <MoleculeDocsContent id="list-type">
      <template #title>
        Setting the list type
      </template>

      <p>
        To create bulleted or numeric lists, use the
        <AtomToken>&lt;ul&gt;</AtomToken> or
        <AtomToken>&lt;ol&gt;</AtomToken> tag with
        <AtomToken>.list</AtomToken> class.
      </p>

      <p>Use the <AtomToken>.list-item</AtomToken> for the children.</p>

      <!-- list disc -->
      <OrganismComponentExample :code="CODE_VIEW_LIST_UL" />

      <!-- list decimal -->
      <OrganismComponentExample :code="CODE_VIEW_LIST_OL" />

      <p>
        Use the <AtomToken>.unmarker</AtomToken> class to create unmarked lists.
      </p>
      <!-- list none -->
      <OrganismComponentExample :code="CODE_VIEW_LIST_UNMARKER" />
    </MoleculeDocsContent>

    <!-- custom marker -->
    <MoleculeDocsContent id="custom-marker">
      <template #title>
        Custom marker
      </template>

      <p>
        To use customs markers, simply add <AtomToken>.marker</AtomToken> class
        in <AtomToken>.list-item</AtomToken> element.
      </p>
      <OrganismComponentExample :code="CODE_VIEW_LIST_CUSTOM_MARKER" />
    </MoleculeDocsContent>

    <!-- list bordered -->
    <MoleculeDocsContent id="list-bordered">
      <template #title>
        List bordered
      </template>

      <p>
        To create bordered lists, simply use the
        <AtomToken>.list-bordered</AtomToken> class with
        <NuxtLink
          class="btn-link-primary"
          to="/docs/layout-group"
        >
          Layout Group
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_LIST_BORDERED" />
    </MoleculeDocsContent>

    <!-- list hoverable -->
    <MoleculeDocsContent id="list-hoverable">
      <template #title>
        List hoverable
      </template>

      <p>
        To create hoverable lists, simply use the
        <AtomToken>.list-hoverable</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_LIST_HOVERABLE" />
    </MoleculeDocsContent>

    <!-- list striped -->
    <MoleculeDocsContent id="list-striped">
      <template #title>
        List striped
      </template>

      <p>
        To create striped lists, simply use the
        <AtomToken>.list-striped</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_LIST_STRIPED" />
    </MoleculeDocsContent>

    <!-- icons -->
    <MoleculeDocsContent id="icons">
      <template #title>
        Icons
      </template>

      <p>
        You can add icons from any library. In the example below was used
        <a
          href="https://icons.getbootstrap.com/"
          target="_blank"
          class="btn-link-primary"
        >
          Bootstrap Icons </a>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_LIST_ICON" />
    </MoleculeDocsContent>

    <!-- active/disabled -->
    <MoleculeDocsContent id="active-disabled">
      <template #title>
        Active / Disabled
      </template>

      <p>
        Use the class <AtomToken>.active</AtomToken> to indicate an active
        element.
      </p>
      <p>
        Use the <AtomToken>disabled</AtomToken> attribute to indicate a disabled
        item.
      </p>
      <p>
        Use <AtomToken>&lt;a&gt;</AtomToken> to create list group items with
        cursor pointer.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_LIST_STATE" />
    </MoleculeDocsContent>

    <!-- horizontal -->
    <MoleculeDocsContent id="horizontal">
      <template #title>
        Horizontal
      </template>

      <p>
        To create horizontal lists, simply use the list classes with
        <NuxtLink
          class="btn-link-primary"
          to="/docs/layout-group"
        >
          Layout Group
        </NuxtLink>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_LIST_HORIZONTAL" />
    </MoleculeDocsContent>

    <!-- badge -->
    <MoleculeDocsContent id="badge">
      <template #title>
        Badges
      </template>

      <p>
        Add badges to any list group item to show unread counts, activity, and
        more.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_LIST_BADGE" />
    </MoleculeDocsContent>

    <!-- invoice -->
    <MoleculeDocsContent id="invoice">
      <template #title>
        Invoice
      </template>

      <p>A simple list group example with a highlighted footer.</p>

      <OrganismComponentExample :code="CODE_VIEW_LIST_INVOICE" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_LIST_UL = `
<ul class="list">
  <li class="list-item">
    Now this is a story all about how, my life got flipped turned upside
    down
  </li>
  <li class="list-item">
    And I like to take a minute and sit right here
  </li>
  <li class="list-item">
    I'll tell you how I became the prince of a town called Bel-Air
  </li>
</ul>
`;
const CODE_VIEW_LIST_OL = `<ol class="list">
  <li class="list-item">
    Now this is a story all about how, my life got flipped turned upside
    down
  </li>
  <li class="list-item">
    And I like to take a minute and sit right here
  </li>
  <li class="list-item">
    I'll tell you how I became the prince of a town called Bel-Air
  </li>
</ol>
`;
const CODE_VIEW_LIST_UNMARKER = `<ul class="unmarker list">
  <li class="list-item">
    Now this is a story all about how, my life got flipped turned upside
    down
  </li>
  <li class="list-item">
    And I like to take a minute and sit right here
  </li>
  <li class="list-item">
    I'll tell you how I became the prince of a town called Bel-Air
  </li>
</ul>
`;
const CODE_VIEW_LIST_CUSTOM_MARKER = `<div class="flex flex-wrap">
  <ul class="unmarker list">
    <li class="list-item">
      <span class="marker bi-check text-success"></span>
      FAQ
    </li>
    <li class="list-item">
      <span class="marker bi-check text-success"></span>
      License
    </li>
    <li class="list-item">
      <span class="marker bi-check text-success"></span>
      Terms & Conditions
    </li>
  </ul>
  <ul class="unmarker list">
    <li class="list-item">
      <span class="marker bi-check-circle text-success"></span>
      FAQ
    </li>
    <li class="list-item">
      <span class="marker bi-check-circle text-success"></span>
      License
    </li>
    <li class="list-item">
      <span class="marker bi-check-circle text-success"></span>
      Terms & Conditions
    </li>
  </ul>
  <ul class="unmarker list">
    <li class="list-item">
      <span class="marker bi-check-circle-fill text-success"></span>
      FAQ
    </li>
    <li class="list-item">
      <span class="marker bi-check-circle-fill text-success"></span>
      License
    </li>
    <li class="list-item">
      <span class="marker bi-check-circle-fill text-success"></span>
      Terms & Conditions
    </li>
  </ul>
</div>
`;

const CODE_VIEW_LIST_BORDERED = `<ul class="unmarker sm:w-64 list list-bordered group-col">
  <li class="list-item">
    Profile
  </li>
  <li class="list-item">
    Settings
  </li>
  <li class="list-item">
    Newsletter
  </li>
</ul>
`;

const CODE_VIEW_LIST_STATE = `<ul class="unmarker sm:w-64 list list-bordered group-col">
  <a class="list-item active">
    <i class="bi-bell"></i>
    Newsletter
  </a>
  <a class="list-item" disabled>
    <i class="bi-cloud-download"></i>
    Downloads
  </a>
  <a class="list-item">
    <i class="bi-people"></i>
    Team Account
  </a>
</ul>
`;

const CODE_VIEW_LIST_HOVERABLE = `<ul class="unmarker sm:w-64 list list-bordered list-hoverable group-col">
  <a class="list-item">
    Newsletter
  </a>
  <a class="list-item">
    Downloads
  </a>
  <a class="list-item">
    Team Account
  </a>
</ul>
`;

const CODE_VIEW_LIST_STRIPED = `<ul class="unmarker sm:w-64 list list-bordered list-striped group-col">
  <li class="list-item">
    Newsletter
  </li>
  <li class="list-item">
    Downloads
  </li>
  <li class="list-item">
    Profile
  </li>
  <li class="list-item">
    Settings
  </li>
  <li class="list-item">
    Team Account
  </li>
</ul>
`;

const CODE_VIEW_LIST_ICON = `<ul class="unmarker sm:w-64 list list-bordered group-col">
  <li class="list-item">
    <i class="bi-bell"></i>
    Newsletter
  </li>
  <li class="list-item">
    <i class="bi-cloud-download"></i>
    Downloads
  </li>
  <li class="list-item">
    <i class="bi-people"></i>
    Team Account
  </li>
</ul>
`;

const CODE_VIEW_LIST_HORIZONTAL = `<ul class="unmarker w-fit list list-bordered list-hoverable group-row">
  <a class="list-item">
    <i class="bi-bell"></i>
    Newsletter
  </a>
  <a class="list-item">
    <i class="bi-cloud-download"></i>
    Downloads
  </a>
  <a class="list-item">
    <i class="bi-people"></i>
    Team Account
  </a>
</ul>
`;
const CODE_VIEW_LIST_BADGE = `<ul class="unmarker sm:w-64 list list-bordered list-hoverable group-col">
  <a class="list-item">
    <span>
      <i class="bi-bell"></i>
      Profile
    </span>
    <span class="badge badge-solid-primary float-right">New</span>
  </a>
  <a class="list-item">
    <i class="bi-cloud-download"></i>
    Downloads
    <span class="badge badge-solid-primary rounded-full float-right">2</span>
  </a>
  <a class="list-item">
    <i class="bi-people"></i>
    Team Account
    <span class="badge badge-solid-primary rounded-full float-right">99+</span>
  </a>
</ul>
`;
const CODE_VIEW_LIST_INVOICE = `<ul class="unmarker sm:w-64 list list-bordered group-col">
  <li class="list-item">
    <p>
      Payment to Front
      <span class="float-right">$264.00</span>
    </p>
    <hr class="my-2" />
    <p>
      Tax fee
      <span class="float-right">$52.8</span>
    </p>
  </li>
  <li class="list-item bg-secondary">
    Amount paid
    <span class="float-right">$316.8</span>
  </li>
</ul>
`;
</script>

<style scoped></style>

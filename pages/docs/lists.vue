<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Base Components
      </template>
      <template #title>
        Lists
      </template>

      Create engaging lists using Perfect UI, a powerful tool for styling
      ordered and unordered elements, enhancing readability, and user
      experience.
    </MoleculeDocsHeader>

    <MoleculeDocsContent>
      <template #title>
        Setting the list style type
      </template>

      <p>
        To create bulleted or numeric lists, use the
        <AtomToken>.list-disc</AtomToken> and
        <AtomToken>.list-decimal</AtomToken> utilities. Use the
        <AtomToken>.list-item</AtomToken> in children.
      </p>

      <!-- list disc -->
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview>
          Preview
        </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_DISC" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_DISC" />
        </template>
      </OrganismTabs>

      <!-- list decimal -->
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview>
          Preview
        </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_DECIMAL" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_DECIMAL" />
        </template>
      </OrganismTabs>

      <!-- list none -->
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview>
          Preview
        </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_NONE" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_NONE" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- custom marker -->
    <MoleculeDocsContent>
      <template #title>
        Custom marker
      </template>

      <p>
        To use customs markers, simply add <AtomToken>.marker</AtomToken> class
        in <AtomToken>.list-item</AtomToken> element.
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
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_CUSTOM_MARKER" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_CUSTOM_MARKER" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- list bordered -->
    <MoleculeDocsContent>
      <template #title>
        List bordered
      </template>

      <p>
        To create bordered lists, simply use the
        <AtomToken>.list-bordered</AtomToken> class with
        <NuxtLink
          class="btn-link-primary"
          to="/docs/group-elements"
        >
          Layout Group
        </NuxtLink>.
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
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_BORDERED" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_BORDERED" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- states -->
    <MoleculeDocsContent>
      <template #title>
        States
      </template>

      <p>
        Use the class <AtomToken>.active</AtomToken> to indicate an active
        element.
      </p>
      <p>
        Use <AtomToken>&lt;a&gt;</AtomToken> to create list group items with
        pointer cursor.
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
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_STATE" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_STATE" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- list hoverable -->
    <MoleculeDocsContent>
      <template #title>
        List hoverable
      </template>

      <p>
        To create hoverable lists, simply use the
        <AtomToken>.list-hoverable</AtomToken> class.
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
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_HOVERABLE" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_HOVERABLE" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- list striped -->
    <MoleculeDocsContent>
      <template #title>
        List striped
      </template>

      <p>
        To create striped lists, simply use the
        <AtomToken>.list-striped</AtomToken> class.
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
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_STRIPED" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_STRIPED" />
        </template>
      </OrganismTabs>
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

      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview>
          Preview
        </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_ICON" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_ICON" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- horizontal -->
    <MoleculeDocsContent>
      <template #title>
        Horizontal
      </template>

      <p>
        To create horizontal lists, simply use the list classes with
        <NuxtLink
          class="btn-link-primary"
          to="/docs/group-elements"
        >
          Layout Group
        </NuxtLink>.
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
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_HORIZONTAL" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_HORIZONTAL" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- badge -->
    <MoleculeDocsContent>
      <template #title>
        Badges
      </template>

      <p>
        Add badges to any list group item to show unread counts, activity, and
        more.
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
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_BADGE" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_BADGE" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- invoice -->
    <MoleculeDocsContent>
      <template #title>
        Invoice
      </template>

      <p>A simple list group example with a highlighted footer.</p>

      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview>
          Preview
        </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_LIST_INVOICE" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_LIST_INVOICE" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_LIST_DISC = `<ul class="list list-disc !bg-transparent">
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
const CODE_VIEW_LIST_DECIMAL = `<ul class="list list-decimal !bg-transparent">
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
const CODE_VIEW_LIST_NONE = `<ul class="list !bg-transparent">
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
  <ul class="list !bg-transparent">
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
  <ul class="list !bg-transparent">
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
  <ul class="list !bg-transparent">
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

const CODE_VIEW_LIST_BORDERED = `<ul class="sm:w-64 list list-bordered group-col">
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

const CODE_VIEW_LIST_STATE = `<ul class="sm:w-64 list list-bordered group-col">
  <a class="list-item active">
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

const CODE_VIEW_LIST_HOVERABLE = `<ul class="sm:w-64 list list-bordered list-hoverable group-col">
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

const CODE_VIEW_LIST_STRIPED = `<ul class="sm:w-64 list list-bordered list-striped group-col">
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

const CODE_VIEW_LIST_ICON = `<ul class="sm:w-64 list list-bordered group-col">
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

const CODE_VIEW_LIST_HORIZONTAL = `<ul class="w-fit list list-bordered list-hoverable group-row">
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
const CODE_VIEW_LIST_BADGE = `<ul class="sm:w-64 list list-bordered list-hoverable group-col">
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
const CODE_VIEW_LIST_INVOICE = `<ul class="sm:w-64 list list-bordered group-col">
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

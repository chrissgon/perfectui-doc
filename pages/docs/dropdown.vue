<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Components
      </template>
      <template #title>
        Dropdown
      </template>

      Toggle contextual overlays for displaying lists of links and more. Combine
      with
      <NuxtLink
        class="btn-link-primary text-base"
        to="/docs/list"
      >
        Lists
      </NuxtLink>
      and other elements to create powerfull dropdowns.
    </MoleculeDocsHeader>

    <AtomNoteWarnJS />

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>

      <p>
        The dropdown component has two main classes,
        <AtomToken>.dropdown-trigger</AtomToken>,
        <AtomToken>.dropdown</AtomToken> and <AtomToken>.ignore</AtomToken>.
      </p>

      <div>
        <ul class="list">
          <li class="list-item text-secondary">
            <AtomToken>.dropdown-trigger</AtomToken>: Indicates the element that
            will trigger the dropdown.
          </li>
          <li class="list-item text-secondary">
            <AtomToken>.dropdown</AtomToken>: The dropdown container.
          </li>
          <li class="list-item text-secondary">
            <AtomToken>.ignore</AtomToken>: Ignore the click event on element,
            so the dropdown will not be closed.
          </li>
        </ul>
      </div>

      <AtomNoteWarn>
        The <AtomToken>.dropdown</AtomToken> should be placed inside of
        <AtomToken>.dropdown-trigger</AtomToken>, since it has parent-child
        relation.
      </AtomNoteWarn>

      <OrganismComponentExample
        :code="CODE_VIEW_DROPDOWN_BASIC"
        overflow
      />
    </MoleculeDocsContent>

    <!-- dividers -->
    <MoleculeDocsContent id="dividers">
      <template #title>
        Dividers
      </template>

      <p>The default dropdown menu with dividers.</p>

      <OrganismComponentExample
        :code="CODE_VIEW_DROPDOWN_DIVIDERS"
        overflow
      />
    </MoleculeDocsContent>

    <!-- icons -->
    <MoleculeDocsContent id="icons">
      <template #title>
        Icons / Badges
      </template>

      <p>
        You can add icons or badges. In the example below was used
        <a
          href="https://icons.getbootstrap.com/"
          target="_blank"
          class="btn-link-primary"
        >
          Bootstrap Icons </a>.
      </p>

      <OrganismComponentExample
        :code="CODE_VIEW_DROPDOWN_ICONS"
        overflow
      />
    </MoleculeDocsContent>

    <!-- title -->
    <MoleculeDocsContent id="title">
      <template #title>
        Title
      </template>

      <p>The default dropdown menu with title.</p>

      <OrganismComponentExample
        :code="CODE_VIEW_DROPDOWN_TITLE"
        overflow
      />
    </MoleculeDocsContent>

    <!-- directions -->
    <MoleculeDocsContent id="directions">
      <template #title>
        Directions
      </template>

      <p>
        The <AtomToken>.dropdown</AtomToken> element has the bottom direction by
        default, but you can also use <AtomToken>.dropdown-right</AtomToken>,
        <AtomToken>.dropdown-left</AtomToken> and
        <AtomToken>.dropdown-top</AtomToken> directions.
      </p>

      <OrganismComponentExample
        :code="CODE_VIEW_DROPDOWN_DIRECTIONS"
        overflow
      />
    </MoleculeDocsContent>

    <!-- center/end -->
    <MoleculeDocsContent id="center-end">
      <template #title>
        Center / End aligns
      </template>

      <p>
        Add <AtomToken>.dropdown-center</AtomToken> class to align the dropdown
        to the center.
      </p>

      <OrganismComponentExample
        :code="CODE_VIEW_DROPDOWN_CENTER"
        overflow
      />
      
      <p>
        Add <AtomToken>.dropdown-end</AtomToken> class to align the dropdown
        to the end.
      </p>

      <OrganismComponentExample
        :code="CODE_VIEW_DROPDOWN_END"
        overflow
      />
    </MoleculeDocsContent>

    <!-- complex -->
    <MoleculeDocsContent id="complex">
      <template #title>
        Complex
      </template>

      <p>You can combine the dropdown element with many other. Be creative!</p>

      <OrganismComponentExample
        :code="CODE_VIEW_DROPDOWN_COMPLEX"
        overflow
      />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
// data
const CODE_VIEW_DROPDOWN_BASIC = `<!-- dropdown trigger -->
<button class="dropdown-trigger btn btn-white">
  Dropdown
  <i class="bi-chevron-down"></i>
  <!-- dropdown -->
  <div class="dropdown">
    <!-- ignore -->
    <label class="field-group ignore">
      <input class="input" type="text" placeholder="Search">
    </label>
    <ul class="unmarker w-64 list list-hoverable">
      <li class="list-item">Profile</li>
      <li class="list-item">Settings</li>
      <li class="list-item">Newsletter</li>
    </ul>
  </div>
</button>
`;

const CODE_VIEW_DROPDOWN_DIVIDERS = `<!-- dropdown trigger -->
<button class="dropdown-trigger btn btn-white">
  Dropdown
  <i class="bi-chevron-down"></i>
  <!-- dropdown -->
  <div class="dropdown">
    <ul class="unmarker w-64 list list-hoverable">
      <li class="list-item">Newsletter</li>
      <li class="list-item">Purchases</li>
      <hr class="my-2">
      <li class="list-item">Upgrade License</li>
      <hr class="my-2">
      <li class="list-item text-error">Sign Out</li>
    </ul>
  </div>
</button>
`;
const CODE_VIEW_DROPDOWN_ICONS = `<!-- dropdown trigger -->
<button class="dropdown-trigger btn btn-white">
  Dropdown
  <i class="bi-chevron-down"></i>
  <!-- dropdown -->
  <div class="dropdown">
    <ul class="unmarker w-64 list list-hoverable">
      <li class="list-item">
        <i class="bi-bell"></i>
        Newsletter
        <span class="badge badge-solid-primary float-right">New</span>
      </li>
      <li class="list-item">
        <i class="bi-cloud-download"></i>
        Downloads
        <span class="badge badge-solid-primary rounded-full float-right">
          2
        </span>
      </li>
      <li class="list-item">
        <i class="bi-people"></i>
        Team Account
      </li>
    </ul>
  </div>
</button>
`;
const CODE_VIEW_DROPDOWN_TITLE = `<!-- dropdown trigger -->
<button class="dropdown-trigger btn btn-white">
  Dropdown
  <i class="bi-chevron-down"></i>
  <!-- dropdown -->
  <div class="dropdown">
    <ul class="unmarker w-64 list list-hoverable">
      <span class="list-item" disabled>Settings</span>
      <li class="list-item">
        <i class="bi-bell"></i>
        Newsletter
        <span class="badge badge-solid-primary float-right">New</span>
      </li>
      <li class="list-item">
        <i class="bi-cloud-download"></i>
        Downloads
        <span class="badge badge-solid-primary rounded-full float-right">
          2
        </span>
      </li>
      <hr class="my-2" />
      <span class="list-item" disabled>Account</span>
      <li class="list-item">
        <i class="bi-people"></i>
        Team Account
      </li>
    </ul>
  </div>
</button>
`;
const CODE_VIEW_DROPDOWN_DIRECTIONS = `
<div class="flex flex-wrap gap-2">
  <!-- dropdown bottom -->
  <button class="dropdown-trigger btn btn-white">
    Bottom
    <i class="bi-chevron-down"></i>
    <div class="dropdown">
      <ul class="unmarker list list-hoverable">
        <li class="list-item">Profile</li>
        <li class="list-item">Settings</li>
        <li class="list-item">Newsletter</li>
      </ul>
    </div>
  </button>
  <!-- dropdown top -->
  <button class="dropdown-trigger btn btn-white">
    Top
    <i class="bi-chevron-up"></i>
    <div class="dropdown dropdown-top">
      <ul class="unmarker list list-hoverable">
        <li class="list-item">Profile</li>
        <li class="list-item">Settings</li>
        <li class="list-item">Newsletter</li>
      </ul>
    </div>
  </button>
  <!-- dropdown left -->
  <button class="dropdown-trigger btn btn-white">
    <i class="bi-chevron-left"></i>
    Left
    <div class="dropdown dropdown-left">
      <ul class="unmarker list list-hoverable">
        <li class="list-item">Profile</li>
        <li class="list-item">Settings</li>
        <li class="list-item">Newsletter</li>
      </ul>
    </div>
  </button>
  <!-- dropdown right -->
  <button class="dropdown-trigger btn btn-white">
    Right
    <i class="bi-chevron-right"></i>
    <div class="dropdown dropdown-right">
      <ul class="unmarker list list-hoverable">
        <li class="list-item">Profile</li>
        <li class="list-item">Settings</li>
        <li class="list-item">Newsletter</li>
      </ul>
    </div>
  </button>
</div>
`;
const CODE_VIEW_DROPDOWN_CENTER = `
<button class="dropdown-trigger btn btn-white">
  Center align
  <i class="bi-chevron-down"></i>
  <div class="dropdown dropdown-right dropdown-center">
    <ul class="unmarker list list-hoverable">
      <li class="list-item">Profile</li>
      <li class="list-item">Settings</li>
      <li class="list-item">Newsletter</li>
    </ul>
  </div>
</button>
`;
const CODE_VIEW_DROPDOWN_END = `
<button class="dropdown-trigger btn btn-white">
  End align
  <i class="bi-chevron-down"></i>
  <div class="dropdown dropdown-right dropdown-end">
    <ul class="unmarker list list-hoverable">
      <li class="list-item">Profile</li>
      <li class="list-item">Settings</li>
      <li class="list-item">Newsletter</li>
    </ul>
  </div>
</button>
`;
const CODE_VIEW_DROPDOWN_COMPLEX = `<div class="group group-row">
  <button class="group-item btn btn-white">Dropdown</button>
  <!-- dropdown trigger -->
  <button class="dropdown-trigger group-item btn btn-white">
    <i class="bi-chevron-up"></i>
    <!-- dropdown -->
    <div class="dropdown dropdown-top dropdown-center">
      <label class="field-group ignore mb-2">
        <i class="addon bi-search"></i>
        <input class="input" type="text" placeholder="Search" />
      </label>
      <ul class="list list-hoverable unmarker">
        <span class="list-item" disabled>Settings</span>
        <li class="list-item active">
          <i class="bi-bell"></i>
          Newsletter
          <span class="badge badge-solid-primary float-right">New</span>
        </li>
        <li class="list-item">
          <i class="bi-cloud-download"></i>
          Downloads
          <span
            class="badge badge-solid-primary rounded-full float-right"
          >
            2
          </span>
        </li>
        <hr class="my-2" />
        <span class="list-item" disabled>Account</span>
        <li class="list-item">
          <i class="bi-people"></i>
          Team Account
        </li>
        <hr class="my-2" />
        <li class="list-item" disabled>Preferences</li>
        <label class="list-item !flex gap-2">
          <input type="checkbox" class="switch !h-fit" />
          <div>
            <p class="font-bold">Darkmode</p>
            <p class="text-secondary">Define dark mode as default.</p>
          </div>
        </label>
      </ul>
    </div>
  </button>
</div>
`;
</script>

<style scoped></style>

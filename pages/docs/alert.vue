<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Components
      </template>
      <template #title>
        Alerts
      </template>

      Alerts are essential components for highlighting important information on
      web pages. They effectively capture user attention for notifications,
      warnings, or updates.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>
      <p>
        To create alert, simply use a combination of classes, adding the
        <AtomToken>.card</AtomToken>, <AtomToken>.card-content</AtomToken>,
        <AtomToken>.style-[type]-[variant]</AtomToken> classes to some element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ALERT_BASIC" />
    </MoleculeDocsContent>

    <!-- types -->
    <MoleculeDocsContent id="types">
      <template #title>
        Types
      </template>
      <p>
        The most commonly used alert styles, we provide
        <AtomToken>solid</AtomToken>, <AtomToken>outline</AtomToken>,
        <AtomToken>link</AtomToken>, <AtomToken>white</AtomToken> and
        <AtomToken>black</AtomToken>.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ALERT_TYPES" />
    </MoleculeDocsContent>

    <!-- solid -->
    <MoleculeDocsContent id="solid">
      <template #title>
        Solid alerts
      </template>
      <p>
        To create solid alerts, simply use the
        <AtomToken>.style-solid-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ALERT_SOLID_COLORS" />
    </MoleculeDocsContent>

    <!-- outline -->
    <MoleculeDocsContent id="outline">
      <template #title>
        Outline alerts
      </template>
      <p>
        To create outline alerts, simply use the
        <AtomToken>.style-outline-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ALERT_OUTLINE_COLORS" />
    </MoleculeDocsContent>

    <!-- soft -->
    <MoleculeDocsContent id="soft">
      <template #title>
        Soft alerts
      </template>
      <p>
        To create soft alerts, simply use the
        <AtomToken>.style-soft-[variant]</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ALERT_SOFT_COLORS" />
    </MoleculeDocsContent>

    <!-- white / black -->
    <MoleculeDocsContent id="white-black">
      <template #title>
        White/Black alerts
      </template>
      <p>
        To create white or black alerts, simply use the
        <AtomToken>.style-white</AtomToken> or
        <AtomToken>.style-black</AtomToken> class.
      </p>
      <OrganismComponentExample :code="CODE_VIEW_ALERT_WHITE_BLACK" />
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

      <OrganismComponentExample :code="CODE_VIEW_ALERT_ICONS" />
    </MoleculeDocsContent>

    <!-- description -->
    <MoleculeDocsContent id="description">
      <template #title>
        With description
      </template>
      <p>
        Alerts can also contain additional HTML elements like headings,
        paragraphs and icons.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ALERT_DESCRIPTION" />
    </MoleculeDocsContent>

    <!-- list -->
    <MoleculeDocsContent id="list">
      <template #title>
        With list
      </template>
      <p>Similarly you can use lists.</p>

      <OrganismComponentExample :code="CODE_VIEW_ALERT_LIST" />
    </MoleculeDocsContent>

    <!-- actions -->
    <MoleculeDocsContent id="actions">
      <template #title>
        Actions
      </template>
      <p>You can use alerts with action buttons.</p>

      <OrganismComponentExample :code="CODE_VIEW_ALERT_ACTIONS" />
    </MoleculeDocsContent>

    <!-- positions -->
    <MoleculeDocsContent id="positions">
      <template #title>
        Positions
      </template>
      <p>
        You can position the alert using the <AtomToken>.float</AtomToken>,
        <AtomToken>.float-right</AtomToken> and
        <AtomToken>.float-top</AtomToken> classes.
      </p>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_ALERT_BASIC = `
<article class="card card-content style-solid-primary">
  The data you requested is ready!
</article>
`;
const CODE_VIEW_ALERT_TYPES = `
<article class="card card-content style-solid-primary">
  Solid alert. The data you requested is ready!
</article>
<article class="card card-content style-outline-primary">
  Outline alert. The data you requested is ready!
</article>
<article class="card card-content style-soft-primary">
  Soft alert. The data you requested is ready!
</article>
<article class="card card-content style-white">
  White alert. The data you requested is ready!
</article>
<article class="card card-content style-black">
  Black alert. The data you requested is ready!
</article>
`;

const CODE_VIEW_ALERT_SOLID_COLORS = `
<article class="card card-content style-solid-primary">
  Solid primary alert. The data you requested is ready!
</article>
<article class="card card-content style-solid-secondary">
  Solid secondary alert. The data you requested is ready!
</article>
<article class="card card-content style-solid-success">
  Solid success alert. The data you requested is ready!
</article>
<article class="card card-content style-solid-warn">
  Solid warn alert. The data you requested is ready!
</article>
<article class="card card-content style-solid-error">
  Solid error alert. The data you requested is ready!
</article>
`;
const CODE_VIEW_ALERT_OUTLINE_COLORS = `
<article class="card card-content style-outline-primary">
  Outline primary alert. The data you requested is ready!
</article>
<article class="card card-content style-outline-secondary">
  Outline secondary alert. The data you requested is ready!
</article>
<article class="card card-content style-outline-success">
  Outline success alert. The data you requested is ready!
</article>
<article class="card card-content style-outline-warn">
  Outline warn alert. The data you requested is ready!
</article>
<article class="card card-content style-outline-error">
  Outline error alert. The data you requested is ready!
</article>
`;
const CODE_VIEW_ALERT_SOFT_COLORS = `
<article class="card card-content style-soft-primary">
  Soft primary alert. The data you requested is ready!
</article>
<article class="card card-content style-soft-secondary">
  Soft secondary alert. The data you requested is ready!
</article>
<article class="card card-content style-soft-success">
  Soft success alert. The data you requested is ready!
</article>
<article class="card card-content style-soft-warn">
  Soft warn alert. The data you requested is ready!
</article>
<article class="card card-content style-soft-error">
  Soft error alert. The data you requested is ready!
</article>
`;
const CODE_VIEW_ALERT_WHITE_BLACK = `
<article class="card card-content style-white">
  White alert. The data you requested is ready!
</article>
<article class="card card-content style-black">
  Black alert. The data you requested is ready!
</article>
`;

const CODE_VIEW_ALERT_ICONS = `
<article class="card card-content style-soft-primary">
  <i class="bi-info-circle-fill mr-2"></i>
  Perfect UI is a lightweight and customizable library!
</article>
<article class="card card-content style-soft-secondary">
  <i class="bi-dash-circle-fill mr-2"></i>
  Some features maybe is not available.
</article>
<article class="card card-content style-soft-success">
  <i class="bi-check-circle-fill mr-2"></i>
  The data you requested is ready!
</article>
<article class="card card-content style-soft-warn">
  <i class="bi-exclamation-triangle-fill mr-2"></i>
  Cannot connect to the database.
</article>
<article class="card card-content style-soft-error">
  <i class="bi-x-circle-fill mr-2"></i>
  A problem has been occurred while submitting your data.
</article>
`;
const CODE_VIEW_ALERT_DESCRIPTION = `
<article class="card card-content style-soft-warn">
  <i class="bi-exclamation-triangle-fill mr-2"></i>
  <span class="font-semibold"> Cannot connect to the database. </span>
  <p class="text-secondary ml-6">
    We are unable to save any progress at this time.
  </p>
</article>
`;
const CODE_VIEW_ALERT_LIST = `
<article class="card card-content style-outline-error">
  <i class="bi-x-circle-fill mr-2"></i>
  <span class="font-semibold">
    A problem has been occurred while submitting your data.
  </span>
  <ul class="ml-10 mt-2">
    <li class="text-secondary">
      This username is already in use.
    </li>
    <li class="text-secondary">
      Email field can't be empty.
    </li>
    <li class="text-secondary">
      Please enter a valid phone number.
    </li>
  </ul>
</article>
`;
const CODE_VIEW_ALERT_ACTIONS = `
<article class="card card-content style-white">
  <i class="bi-info-circle-fill text-theme mr-2"></i>
  <span class="font-semibold text-theme">
    YouTube would like you to send notifications
  </span>
  <p class="ml-6 my-2">
    Notifications may include alerts, sounds and icon badges. These can be
    configured in Settings.
  </p>
  <div class="ml-6 mt-4">
    <button class="style-link-secondary mr-4">
      Don't allow
    </button>
    <button class="style-link-primary">
      Allow
    </button>
  </div>
</article>
`;
</script>

<style>
.card.card-content:not(:first-child) {
  margin-top: 5px;
}
</style>

<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle> Forms </template>
      <template #title> Field Group </template>
      Easily extend fields by adding text, buttons, icons and more.
    </MoleculeDocsHeader>

    <!-- complex -->
    <MoleculeDocsContent>
      <template #title> Complex fields </template>
      <p>
        You can use the <AtomToken>.field-group</AtomToken> class to create
        complex forms with states, buttons, icons and others.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_FIELD_GROUP_COMPLEX" />
    </MoleculeDocsContent>

    <!-- label/message -->
    <MoleculeDocsContent>
      <template #title> Label/Message </template>

      <p>
        To create a field with label and message, simply add
        <AtomToken>label</AtomToken> and
        <AtomToken>message</AtomToken> properties.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_FIELD_GROUP_BASIC" />
    </MoleculeDocsContent>

    <!-- addon -->
    <MoleculeDocsContent>
      <template #title> Addon </template>

      <p>
        To extend a field with a text or icon, simply add
        <AtomToken>.addon</AtomToken> class inside
        <AtomToken>.field-group</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_FIELD_GROUP_ADDON" />
    </MoleculeDocsContent>

    <!-- states -->
    <MoleculeDocsContent>
      <template #title> States </template>

      <p>
        To set a field state, simply add
        <AtomToken>.field-group-success</AtomToken>,
        <AtomToken>.field-group-warn</AtomToken> or
        <AtomToken>.field-group-error</AtomToken> class in the
        <AtomToken>.field-group</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_FIELD_GROUP_STATES" />
    </MoleculeDocsContent>

    <!-- mixed -->
    <MoleculeDocsContent>
      <template #title> Mixed </template>

      <p>You can create a more efficient field with mixed types.</p>
      <p>
        To create a field with mixed types, simply add one or more
        <AtomToken>.input</AtomToken> inside
        <AtomToken>.field-group</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_FIELD_GROUP_MIXED" />
    </MoleculeDocsContent>

    <!-- buttons -->
    <MoleculeDocsContent>
      <template #title> Buttons </template>
      <p>
        To create a field with action buttons, simply add
        <AtomToken>.group-row</AtomToken> class in the
        <AtomToken>.field-group</AtomToken> element.
      </p>
      <p>After, add a button with <AtomToken>.group-item</AtomToken> class.</p>

      <OrganismComponentExample :code="CODE_VIEW_FIELD_GROUP_BUTTON" />
    </MoleculeDocsContent>

    <!-- disabled -->
    <MoleculeDocsContent>
      <template #title> Disabled </template>
      <p>
        Make fields look inactive by adding the
        <AtomToken>disabled</AtomToken> boolean attribute to any
        <AtomToken>.field-group</AtomToken> or
        <AtomToken>.input</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_FIELD_GROUP_DISABLED" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_FIELD_GROUP_COMPLEX = `<form class="flex flex-col gap-3">
  <!-- name -->
  <label
    class="field-group field-group-error"
    data-label="Full Name"
    data-message="Field required"
  >
    <select class="input !max-w-fit">
      <option>Mr.</option>
      <option>Ms.</option>
      <option>Miss.</option>
    </select>
    <input class="input" placeholder="First Name" />
    <input class="input" placeholder="Surname Name" />
  </label>
  <!-- birth -->
  <label class="field-group" data-label="Birth" data-message="Optional">
    <i class="addon bi-calendar-week"></i>
    <input class="input" type="date" />
  </label>
  <!-- email -->
  <label
    class="field-group group-row field-group-success"
    data-label="Email"
    data-message="Code sended"
  >
    <i class="addon bi-check-circle-fill text-success"></i>
    <input type="text" class="input" value="email.example" />
    <span class="addon">@</span>
    <select class="input">
      <option>gmail.com</option>
      <option>outlook.com</option>
      <option>hotmail.com</option>
    </select>
    <button class="group-item btn btn-solid-primary">Send Code</button>
  </label>
</form>
`;
const CODE_VIEW_FIELD_GROUP_BASIC = `<label class="field-group" data-label="Label" data-message="Some message">
  <input class="input">
</label>
`;
const CODE_VIEW_FIELD_GROUP_ADDON = `<label class="field-group" data-label="Price" data-message="Required">
  <i class="addon bi-bank"></i>
  <input class="input" type="number">
  <span class="addon">R$</span>
</label>
`;
const CODE_VIEW_FIELD_GROUP_STATES = `<form class="flex flex-col gap-3">
  <!-- default -->
  <label class="field-group" data-label="Label" data-message="Some message">
    <input class="input" placeholder="Default" />
  </label>
  <!-- success -->
  <label
    class="field-group field-group-success"
    data-label="Label"
    data-message="Operation successfully"
  >
    <input class="input" placeholder="Success" />
  </label>
  <!-- warning -->
  <label
    class="field-group field-group-warn"
    data-label="Label"
    data-message="Fill with attention"
  >
    <input class="input" placeholder="Warning" />
  </label>
  <!-- error -->
  <label
    class="field-group field-group-error"
    data-label="Label"
    data-message="This field is invalid"
  >
    <input class="input" placeholder="Error" />
  </label>
</form>
`;
const CODE_VIEW_FIELD_GROUP_MIXED = `<form class="flex flex-col gap-3">
  <!-- social -->
  <label class="field-group" data-label="Social Profile" data-message="Optional">
    <select class="input !max-w-fit">
      <option>Linkedin</option>
      <option>Behance</option>
      <option>Github</option>
    </select>
    <input
      type="text"
      class="input"
      placeholder="https://www.example.com/your-profile"
    />
  </label>
  <!-- range dates -->
  <label class="field-group" data-label="Between Dates">
    <input type="date" class="input" />
    <span class="addon">to</span>
    <input type="date" class="input" />
  </label>
  <!-- enable option -->
  <label class="field-group" data-label="Enable Option">
    <span class="addon">
      <input type="checkbox" class="switch" checked />
    </span>
    <input
      type="text"
      class="input"
      placeholder="You could control this field by switch"
    />
  </label>
  <label class="field-group" data-label="About me">
    <textarea class="input" placeholder="Write a short description"></textarea>
  </label>
</form>
`;
const CODE_VIEW_FIELD_GROUP_BUTTON = `<div class="card">
  <article class="card-content">
    <h4 class="text-lg text-center mb-4">
      You want to subscribe in our newsletter?
    </h4>
    <label class="field-group group-row">
      <input
        type="email"
        class="input"
        placeholder="Your email"
      >
      <button class="btn btn-solid-primary group-item">Subscribe</button>
    </label>
  </article>
</div>
`;
const CODE_VIEW_FIELD_GROUP_DISABLED = `<form class="flex flex-col gap-3">
  <!-- field group disabled -->
  <label
    class="field-group"
    data-label="Payment method"
    data-message="Not Allowed"
    disabled
  >
    <span class="addon">Credit Card</span>
    <input
      type="text"
      class="input"
      placeholder="Number"
    >
    <input
      type="month"
      class="input"
      placeholder="Expiration Date"
    >
    <input
      type="text"
      class="input"
      placeholder="CCV"
    >
  </label>
  <!-- input disabled -->
  <label
    class="field-group"
    data-label="Country/City"
  >
    <select class="input">
      <option>Brazil</option>
      <option>Ireland</option>
    </select>
    <select
      class="input"
      disabled
    >
      <option>Select city by country</option>
    </select>
  </label>
</form>
`;
</script>

<style scoped></style>

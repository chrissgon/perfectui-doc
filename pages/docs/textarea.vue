<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Forms
      </template>
      <template #title>
        Textarea
      </template>

      A textarea is an element on a webpage that you can type into.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent>
      <template #title>
        Basic
      </template>

      <p>
        To create textareas, simply add the
        <AtomToken>.input</AtomToken> class to the
        <AtomToken>textarea</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TEXTAREA_BASIC" />
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title>
        Placeholder
      </template>

      <p>Basic textarea with placeholder.</p>
      <OrganismComponentExample :code="CODE_VIEW_TEXTAREA_PLACEHOLDER" />
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title>
        Label/Message
      </template>

      <p>
        You can use
        <NuxtLink
          class="btn-link-primary"
          to="/docs/field-group"
        >
          Field Group
        </NuxtLink>
        with <AtomToken>textarea</AtomToken> to create complex elements.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TEXTAREA_PLACEHOLDER_LABEL" />
    </MoleculeDocsContent>

    <MoleculeDocsContent>
      <template #title>
        Simple usage
      </template>

      <p>
        A textarea example with copy button, character counter, label and
        message.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_TEXTAREA_USAGE" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_TEXTAREA_BASIC = `<textarea class="input"></textarea>`;
const CODE_VIEW_TEXTAREA_PLACEHOLDER = `<textarea
  class="input"
  placeholder="This is placeholder"
></textarea>
`;
const CODE_VIEW_TEXTAREA_PLACEHOLDER_LABEL = `<label
  class="field-group field-group-error"
  data-label="Observation"
  data-message="Required"
>
  <textarea
    class="input"
    placeholder="Let your observation"
  ></textarea>
  <span class="addon bi-pencil-fill"></span>
</label>
`;
const CODE_VIEW_TEXTAREA_USAGE = `<label
  class="field-group"
  data-label="Leave your question"
  data-message="We'll get back to you soon."
>
  <div class="input input-group relative">
    <textarea
      type="text"
      id="message"
      class="input w-full h-full"
      placeholder="Say hi, we'll be happy to chat with you"
    ></textarea>
    <i class="btn bi bi-clipboard"></i>
    <span id="counter" class="badge absolute -top-3 -right-3">0/100</span>
  </div>
  <span class="addon bi-pencil-fill"></span>
</label>`;
</script>

<style scoped></style>

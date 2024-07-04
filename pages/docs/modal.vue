<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Components
      </template>
      <template #title>
        Modal
      </template>

      Use modal to add dialogs to your site for lightboxes, user notifications,
      or completely custom content.
    </MoleculeDocsHeader>

    <AtomNoteWarnJS />

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>

      <p>
        Modal component uses the
        <NuxtLink
          class="btn-link-primary"
          to="/docs/card"
        >
          Card
        </NuxtLink>
        component.
      </p>

      <p>
        To create a modal, simply add <AtomToken>.modal</AtomToken> class at
        <AtomToken>dialog</AtomToken> element.
      </p>

      <p>
        Uses the
        <NuxtLink
          class="btn-link-primary"
          to="/docs/card"
        >
          Card
        </NuxtLink>
        component to create the modal content.
      </p>

      <AtomNoteWarn>
        <p>
          To show or hide the modal, change the
          <AtomToken>open</AtomToken> attribute at
          <AtomToken>dialog</AtomToken> element.
        </p>
        <p>You can do that with Perfect UI or any other way.</p>
      </AtomNoteWarn>
      <p>
        To open a modal with Perfect UI, use the
        <AtomToken>data-modal</AtomToken> attribute, providing a modal ID.
      </p>

      <p>
        To close a modal with Perfect UI, use the
        <AtomToken>data-autoclose</AtomToken> attribute.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_MODAL_BASIC" />
    </MoleculeDocsContent>

    <!-- static -->
    <MoleculeDocsContent id="static-backdrop">
      <template #title>
        Static Backdrop
      </template>

      <p>
        When backdrop is set to static, the modal will not close when clicking
        outside it.
      </p>
      <p>
        To create a static backdrop modal, simply add the
        <AtomToken>.static-backdrop</AtomToken> in the
        <AtomToken>.modal</AtomToken> element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_MODAL_STATIC" />
    </MoleculeDocsContent>

    <!-- scrollable -->
    <MoleculeDocsContent id="scrollable">
      <template #title>
        Scrolling behavior
      </template>

      <p>
        Modal dialogs differ in width, whereas height is determined by the content. Once it reaches a certain threshold, the body content will scroll while the header and footer remain fixed until the bottom of the modal dialog is reached.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_MODAL_SCROLL" />
    </MoleculeDocsContent>

    <!-- toggle -->
    <MoleculeDocsContent id="toggle">
      <template #title>
        Toggle between modals
      </template>

      <p>Toggle between two separate modals.</p>

      <OrganismComponentExample :code="CODE_VIEW_MODAL_TOGGLE" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_MODAL_BASIC = `
<button class="btn btn-solid-primary" data-modal="modal-basic">
  Open modal
</button>
<dialog class="modal" id="modal-basic">
  <div class="card w-96">
    <header class="card-header bg-secondary text-secondary">
      <span>Modal title</span>
      <a class="bi bi-x-lg float-right btn-link-secondary" data-autoclose></a>
    </header>
    <hr />
    <article class="card-content flex flex-col gap-2">
      Modal content
    </article>
    <hr />
    <footer class="card-header flex gap-2 justify-end">
      <button class="btn btn-link-error" data-autoclose>Close</button>
      <button class="btn btn-solid-primary">Save changes</button>
    </footer>
  </div>
</dialog>
`;
const CODE_VIEW_MODAL_STATIC = `
<button class="btn btn-solid-primary" data-modal="modal-static">
  Open modal
</button>
<dialog class="modal static-backdrop" id="modal-static">
  <div class="card w-96">
    <header class="card-header bg-secondary text-secondary">
      <span>Modal title</span>
      <a class="bi bi-x-lg float-right btn-link-secondary" data-autoclose></a>
    </header>
    <hr />
    <article class="card-content flex flex-col gap-2">
      Modal content
    </article>
    <hr />
    <footer class="card-header flex gap-2 justify-end">
      <button class="btn btn-link-error" data-autoclose>Close</button>
      <button class="btn btn-solid-primary">Save changes</button>
    </footer>
  </div>
</dialog>
`;
const CODE_VIEW_MODAL_SCROLL = `
<button class="btn btn-solid-primary" data-modal="modal-scroll">
  Open modal
</button>
<dialog class="modal" id="modal-scroll">
  <div class="card w-96">
    <header class="card-header bg-secondary text-secondary">
      <span>Modal title</span>
      <a
        class="bi bi-x-lg float-right btn-link-secondary"
        data-autoclose
      ></a>
    </header>
    <hr />
    <article class="card-content">
      <h2 class="text-lg font-bold">Be bold</h2>
      <p>
        Motivate teams to do their best work. Offer best practices to get
        users going in the right direction. Be bold and offer just enough
        help to get the work started, and then get out of the way. Give
        accurate information so users can make educated decisions. Know your
        user's struggles and desired outcomes and give just enough
        information to let them get where they need to go.
      </p>

      <h2 class="text-lg font-bold">Be optimistic</h2>
      <p>
        Focusing on the details gives people confidence in our products.
        Weave a consistent story across our fabric and be diligent about
        vocabulary across all messaging by being brand conscious across
        products to create a seamless flow across all the things. Let people
        know that they can jump in and start working expecting to find a
        dependable experience across all the things. Keep teams in the loop
        about what is happening by informing them of relevant features,
        products and opportunities for success. Be on the journey with them
        and highlight the key points that will help them the most - right
        now. Be in the moment by focusing attention on the important bits
        first.
      </p>

      <h2 class="text-lg font-bold">Be practical, with a wink</h2>
      <p>
        Keep our own story short and give teams just enough to get moving.
        Get to the point and be direct. Be concise - we tell the story of
        how we can help, but we do it directly and with purpose. Be on the
        lookout for opportunities and be quick to offer a helping hand. At
        the same time realize that nobody likes a nosy neighbor. Give the
        user just enough to know that something awesome is around the corner
        and then get out of the way. Write clear, accurate, and concise text
        that makes interfaces more usable and consistent - and builds trust.
        We strive to write text that is understandable by anyone, anywhere,
        regardless of their culture or language so that everyone feels they
        are part of the team.
      </p>
    </article>
    <hr />
    <footer class="card-header flex gap-2 justify-end">
      <button class="btn btn-link-error" data-autoclose>Close</button>
      <button class="btn btn-solid-primary">Save changes</button>
    </footer>
  </div>
</dialog>
`
const CODE_VIEW_MODAL_TOGGLE = `
<button class="btn btn-solid-primary" data-modal="modal-toggle">
  Open first modal
</button>
<dialog class="modal" id="modal-toggle">
  <div class="card w-96">
    <header class="card-header bg-secondary text-secondary">
      <span>Modal 1</span>
      <a class="bi bi-x-lg float-right btn-link-secondary" data-autoclose></a>
    </header>
    <hr />
    <article class="card-content flex flex-col gap-2">
      Show a second modal and hide this one with the button below.
    </article>
    <hr />
    <footer class="card-header flex gap-2 justify-end">
      <button class="btn btn-link-error" data-autoclose>Close</button>
      <button class="btn btn-solid-primary" data-modal="modal-toggle2">Open second modal</button>
    </footer>
  </div>
</dialog>
<dialog class="modal" id="modal-toggle2">
  <div class="card w-96">
    <header class="card-header bg-secondary text-secondary">
      <span>Modal 2</span>
      <a class="bi bi-x-lg float-right btn-link-secondary" data-autoclose></a>
    </header>
    <hr />
    <article class="card-content flex flex-col gap-2">
      Hide this modal and show the first with the button below.
    </article>
    <hr />
    <footer class="card-header flex gap-2 justify-end">
      <button class="btn btn-link-error" data-autoclose>Close</button>
      <button class="btn btn-solid-primary" data-modal="modal-toggle">Back to first</button>
    </footer>
  </div>
</dialog>
`;
</script>

<style scoped>
</style>

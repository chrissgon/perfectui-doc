<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle> Base Components </template>
      <template #title> Card </template>

      Cards provide a flexible and extensible content container with multiple
      variants and options.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent>
      <template #title> Basic </template>
      <p>
        A basic card containing a title, content and an extra corner content.
        Cards assume no specific width to start, so they'll be 100% wide unless
        otherwise stated.
      </p>
      <p>To create cards, simply add the <AtomToken>.card</AtomToken> class.</p>
      <p>
        You can use <AtomToken>.card-content</AtomToken> class for the content,
        <AtomToken>.card-header</AtomToken> class for the header and the
        <AtomToken>&lt;hr&gt;</AtomToken> tag for the dividers.
      </p>

      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_CARD_BASIC" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_CARD_BASIC" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- content types -->
    <MoleculeDocsContent>
      <template #title> Content Types </template>
      <p>
        Cards support a wide variety of content, including images, text, list
        groups, links, and more. Below are examples of what's supported.
      </p>
    </MoleculeDocsContent>

    <!-- simple body -->
    <MoleculeDocsContent>
      <template #title> Simple Body </template>
      <p>
        You can use <AtomToken>.card-content</AtomToken> class to create a
        simple body example with text.
      </p>
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_CARD_SIMPLE_BODY" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_CARD_SIMPLE_BODY" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- simple card -->
    <MoleculeDocsContent>
      <template #title> Simple Card </template>
      <p>
        You can add others elements in the
        <AtomToken>.card-content</AtomToken> parent.
      </p>
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_CARD_SIMPLE_CARD" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_CARD_SIMPLE_CARD" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- header / footer -->
    <MoleculeDocsContent>
      <template #title> Header / Footer </template>
      <p>
        You can use <AtomToken>.card-header</AtomToken> and
        <AtomToken>&lt;hr&gt;</AtomToken> tag to create a header or footer.
      </p>
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_CARD_HEADER" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_CARD_HEADER" />
        </template>
      </OrganismTabs>
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_CARD_FOOTER" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_CARD_FOOTER" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- horizontal -->
    <MoleculeDocsContent>
      <template #title> Horizontal </template>
      <p>
        Using a combination of grid and utility classes, cards can be made
        horizontal in a mobile-friendly and responsive way.
      </p>
      <p>
        To create a horizontal card, simply add
        <AtomToken>display: flex</AtomToken> in the
        <AtomToken>.card</AtomToken> parent.
      </p>
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview :preview="CODE_VIEW_CARD_SIMPLE_HORIZONTAL" />
        </template>
        <template #code>
          <MoleculeCodeView :input="CODE_VIEW_CARD_SIMPLE_HORIZONTAL" />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>

    <!-- card group -->
    <MoleculeDocsContent>
      <template #title> Card Group </template>
      <p>
        Use
        <NuxtLink class="btn-link-primary" to="/docs/group-elements">
          Layout Group
        </NuxtLink>
        to render cards as a single, attached element with equal width and
        height columns.
      </p>
      <!-- <p>
        To create a horizontal card, simply add
        <AtomToken>display: flex</AtomToken> in the
        <AtomToken>.card</AtomToken> parent.
      </p> -->
      <OrganismTabs :tabs="['preview', 'code']">
        <template #hpreview> Preview </template>
        <template #hcode>
          <AtomIconHTML />
          HTML
        </template>
        <template #preview>
          <MoleculeCodePreview
            class="max-lg:hidden"
            :preview="CODE_VIEW_CARD_GROUP_ROW"
          />
          <MoleculeCodePreview
            class="lg:hidden"
            :preview="CODE_VIEW_CARD_GROUP_COL"
          />
        </template>
        <template #code>
          <MoleculeCodeView
            class="max-lg:hidden"
            :input="CODE_VIEW_CARD_GROUP_ROW"
          />
          <MoleculeCodeView
            class="lg:hidden"
            :input="CODE_VIEW_CARD_GROUP_COL"
          />
        </template>
      </OrganismTabs>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_CARD_BASIC = `<div class="card">
  <header class="card-header flex justify-between gap-2">
    Header
    <i class="bi-three-dots-vertical"></i>
  </header>
  <hr>
  <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=300&q=80">  
  <article class="card-content flex flex-col gap-2">
    <h1 class="font-semibold text-xl">Card Title</h1>
    <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button class="btn btn-solid-primary w-fit">Some action</button>
  </article>
</div>
`;
const CODE_VIEW_CARD_SIMPLE_BODY = `<div class="card">  
  <article class="card-content">
    This is some text within a card body.
  </article>
</div>
`;
const CODE_VIEW_CARD_SIMPLE_CARD = `<div class="card">  
  <article class="card-content flex flex-col gap-2">
    <h1 class="font-semibold text-xl">Card Title</h1>
    <h4 class="text-secondary">Card Subtitle</h4>
    <p>This is some text within a card body.</p>
    <p>
      <button class="btn-link-primary">
        Card link
        <i class="bi-chevron-right"></i>
      </button>
    </p>
  </article>
</div>
`;
const CODE_VIEW_CARD_HEADER = `<div class="card">
  <header class="card-header bg-secondary text-secondary">Featured</header>
  <hr>
  <article class="card-content flex flex-col gap-2">
    <h1 class="font-semibold text-xl">Card Title</h1>
    <p>With supporting text below as a natural lead-in to additional content.</p>
    <p>
      <button class="btn-link-primary">
        Card link
        <i class="bi-chevron-right"></i>
      </button>
    </p>
  </article>
</div>
`;
const CODE_VIEW_CARD_FOOTER = `<div class="card">
  <article class="card-content flex flex-col gap-2">
    <h1 class="font-semibold text-xl">Card Title</h1>
    <p>With supporting text below as a natural lead-in to additional content.</p>
    <p>
      <button class="btn-link-primary">
        Card link
        <i class="bi-chevron-right"></i>
      </button>
    </p>
  </article>
  <hr>
  <header class="card-header bg-secondary text-secondary text-xs">Last updated 5 mins ago</header>
</div>
`;
const CODE_VIEW_CARD_SIMPLE_HORIZONTAL = `<div class="card lg:flex">
  <img class="lg:max-w-xs" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80">
  <article class="card-content flex flex-col justify-between">
    <div>
      <h1 class="font-semibold text-xl mb-2">Card Title</h1>
      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
  </article>
</div>
`;
const CODE_VIEW_CARD_GROUP_ROW = `<section class="group-row">
  <!-- card #1 -->
  <div class="card group-item">
    <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
  <!-- card #2 -->
  <div class="card group-item">
    <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
  <!-- card #3 -->
  <div class="card group-item">
    <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
</section>
`;
const CODE_VIEW_CARD_GROUP_COL = `<section class="group-col">
  <!-- card #1 -->
  <div class="card group-item">
    <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
  <!-- card #2 -->
  <div class="card group-item">
    <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
  <!-- card #3 -->
  <div class="card group-item">
    <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80">
    <article class="card-content flex flex-col justify-between">
      <div>
        <h1 class="font-semibold text-xl mb-2">Card Title</h1>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <p class="text-xs text-secondary mt-8">Last updated 5 mins ago</p>
    </article>
  </div>
</section>
`;
</script>

<style scoped></style>

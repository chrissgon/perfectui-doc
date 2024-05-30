<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Base Components
      </template>
      <template #title>
        Accordion
      </template>

      Build vertically collapsing accordions.
    </MoleculeDocsHeader>

    <!-- basic -->
    <MoleculeDocsContent>
      <template #title>
        Basic
      </template>
      <p>
        To create accordions, simply add the
        <AtomToken>.accordion</AtomToken> class to the
        <AtomToken>details</AtomToken> parent element.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ACCORDION_BASIC" />
    </MoleculeDocsContent>

    <!-- bordered -->
    <MoleculeDocsContent>
      <template #title>
        Bordered
      </template>
      <p>
        To create bordered accordions, simply add the
        <AtomToken>.accordion-bordered</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ACCORDION_BORDERED" />
    </MoleculeDocsContent>

    <!-- accented -->
    <MoleculeDocsContent>
      <template #title>
        Accented
      </template>
      <p>
        To create accented accordions when opened, simply add the
        <AtomToken>.accordion-accented</AtomToken> class.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ACCORDION_ACCENTED" />
    </MoleculeDocsContent>

    <!-- nested -->
    <MoleculeDocsContent>
      <template #title>
        Nested
      </template>
      <p>
        To create nested accordions, simply add the
        <AtomToken>.accordion</AtomToken> element inside the
        <AtomToken>article</AtomToken> of another.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ACCORDION_NESTED" />

      <p>
        For basic accordions you can use the
        <AtomToken>.accordion-aligned</AtomToken> class to align the arrows to
        the right.
      </p>

      <OrganismComponentExample :code="CODE_VIEW_ACCORDION_NESTED_ALIGNED" />

      <p>You can mix the variants to create complex accordions.</p>

      <OrganismComponentExample :code="CODE_VIEW_ACCORDION_COMPLEX" />
    </MoleculeDocsContent>

    <!-- icon -->
    <MoleculeDocsContent>
      <template #title>
        Custom Arrow
      </template>
      <p>
        To create accordions with custom arrows, simply create an element with
        the class <AtomToken>.accordion-icon</AtomToken> inside
        <AtomToken>summary</AtomToken>.
      </p>
      <p>
        To define a custom arrow when the accordion is
        <AtomToken>open</AtomToken>, simply create an element with
        <AtomToken>.accordion-icon.open</AtomToken> class.
      </p>
      <p>If you leave the element empty, there will be no arrow.</p>

      <OrganismComponentExample :code="CODE_VIEW_ACCORDION_ICON" />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const ACCORDION_TEXT =
  "This is the body of the accordion item. It is hidden by default, until you expand it with a click.";

const CODE_VIEW_ACCORDION_BASIC = `<div class="accordion group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
</div>
`;

const CODE_VIEW_ACCORDION_BORDERED = `<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
</div>
`;

const CODE_VIEW_ACCORDION_ACCENTED = `<div class="accordion accordion-bordered accordion-accented group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
</div>
`;

const CODE_VIEW_ACCORDION_NESTED = `<!-- mainly accordion -->
<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>
      <!-- nested accordion -->
      <div class="accordion group-col">
        <details class="accordion-item">
          <summary>Accordion #1</summary>
          <article>${ACCORDION_TEXT}</article>
        </details>
        <details class="accordion-item">
          <summary>Accordion #2</summary>
          <article>
            <!-- nested accordion -->
            <div class="accordion group-col">
              <details class="accordion-item">
                <summary>Accordion #1</summary>
                <article>${ACCORDION_TEXT}</article>
              </details>
            </div>
          </article>
        </details>
      </div>
    </article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
</div>
`;

const CODE_VIEW_ACCORDION_COMPLEX = `<!-- mainly accordion -->
<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>
      <!-- nested accordion -->
      <div class="accordion accordion-bordered accordion-accented group-col">
        <details class="accordion-item">
          <summary>Accordion #1</summary>
          <article>This is the body of the accordion item. It is hidden by defaultuntil you expand it with a click.</article>
        </details>
        <details class="accordion-item">
          <summary>Accordion #2</summary>
          <article>
            <!-- nested accordion -->
            <div class="accordion accordion-bordered group-col">
              <details class="accordion-item">
                <summary>Accordion #1</summary>
                <article>This is the body of the accordion item. It is hidden bdefault, until you expand it with a click.</article>
              </details>
              <details class="accordion-item">
                <summary>Accordion #2</summary>
                <article>This is the body of the accordion item. It is hidden bdefault, until you expand it with a click.</article>
              </details>
            </div>
          </article>
        </details>
      </div>
    </article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>This is the body of the accordion item. It is hidden by default, untiyou expand it with a click.</article>
  </details>
</div>
`;

const CODE_VIEW_ACCORDION_NESTED_ALIGNED = `<!-- mainly accordion -->
<div class="accordion accordion-bordered accordion-aligned group-col">
  <details class="accordion-item">
    <summary>Accordion #1</summary>
    <article>
      <!-- nested accordion -->
      <div class="accordion accordion-aligned group-col">
        <details class="accordion-item">
          <summary>Accordion #1</summary>
          <article>${ACCORDION_TEXT}</article>
        </details>
        <details class="accordion-item">
          <summary>Accordion #2</summary>
          <article>
            <!-- nested accordion -->
            <div class="accordion accordion-aligned group-col">
              <details class="accordion-item">
                <summary>Accordion #1</summary>
                <article>${ACCORDION_TEXT}</article>
              </details>
            </div>
          </article>
        </details>
      </div>
    </article>
  </details>
  <details class="accordion-item">
    <summary>Accordion #2</summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
</div>
`;

const CODE_VIEW_ACCORDION_ICON = `<div class="accordion accordion-bordered group-col">
  <details class="accordion-item">
    <summary>
      # Custom arrow
      <!-- custom arrow -->
      <i class="accordion-icon bi-plus-circle"></i>
      <i class="accordion-icon open bi-dash-circle"></i>
    </summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
  <details class="accordion-item">
    <summary>
      # Empty arrow
      <!-- empty arrow -->
      <i class="accordion-icon"></i>
    </summary>
    <article>${ACCORDION_TEXT}</article>
  </details>
</div>
`;
</script>

<style scoped></style>

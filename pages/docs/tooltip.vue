<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Components
      </template>
      <template #title>
        Tooltip
      </template>

      Tooltip is a floating, non-actionable label used to explain a user
      interface element or feature.
    </MoleculeDocsHeader>

    <AtomNoteWarnJS />

    <!-- basic -->
    <MoleculeDocsContent id="basic">
      <template #title>
        Basic
      </template>

      <p>
        Tooltip are meant to be exactly that, a hint or tip on what a tool or
        other interaction does. They are meant to clarify or help you use the
        content that they hover over, not add additional content:
      </p>

      <p>
        To create a tooltip, simply add the
        <AtomToken>.tooltip</AtomToken> class.
      </p>

      <p>
        Provide the tooltip text through the
        <AtomToken>tooltip</AtomToken> attribute.
      </p>

      <OrganismComponentExample
        :code="CODE_VIEW_TOOLTIP_BASIC"
        overflow
      />

      <AtomNoteWarn>
        <p>
          The <AtomToken>.tooltip</AtomToken> class uses pseudo elements
          <AtomToken>::before</AtomToken> and <AtomToken>::after</AtomToken> to
          works.
        </p>
        <p>
          Make sure you use it with an element that does not use pseudo classes
          as well.
        </p>
      </AtomNoteWarn>
    </MoleculeDocsContent>

    <!-- directions -->
    <MoleculeDocsContent id="directions">
      <template #title>
        Directions
      </template>

      <p>
        The tooltip has the top direction by default, but you can also use
        <AtomToken>.tooltip-right</AtomToken>,
        <AtomToken>.tooltip-left</AtomToken> and
        <AtomToken>.tooltip-bottom</AtomToken> directions.
      </p>

      <OrganismComponentExample
        :code="CODE_VIEW_TOOLTIP_DIRECTIONS"
        overflow
      />
    </MoleculeDocsContent>

    <!-- white / black -->
    <MoleculeDocsContent id="white-black">
      <template #title>
        White/Black tooltips
      </template>
      <p>
        The tooltip has <AtomToken>.tooltip-white</AtomToken> class by default,
        but if you want use the black style, simply use the
        <AtomToken>.style-black</AtomToken> class.
      </p>

      <OrganismComponentExample
        :code="CODE_VIEW_TOOLTIP_WHITE_BLACK"
        overflow
      />
    </MoleculeDocsContent>

    <!-- usage -->
    <MoleculeDocsContent id="usage">
      <p>
        Tooltip are typically only visible on hover, for that reason if you need
        to be able to read the content while interacting with other parts of the
        page then a tooltip will not work.
      </p>
      <template #title>
        Simple usage
      </template>

      <OrganismComponentExample
        :code="CODE_VIEW_TOOLTIP_USAGE"
        overflow
      />
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
const CODE_VIEW_TOOLTIP_BASIC = `<button
  class="btn style-white tooltip"
  data-tooltip="More details here"
>
  Tooltip
  <i class="bi-question-circle"></i>
</button>
`;
const CODE_VIEW_TOOLTIP_DIRECTIONS = `<div class="grid grid-cols-3 gap-y-2 gap-x-2 max-w-60 mx-auto w-fit">
  <button
    class="tooltip btn style-white rounded-full col-start-2 w-10 !px-2"
    data-tooltip="Tooltip on top"
  >
    <i class="bi-chevron-up"></i>
  </button>
  <button
    class="tooltip tooltip-left btn style-white rounded-full col-start-1 w-10 !px-2"
    data-tooltip="Tooltip on left"
  >
    <i class="bi-chevron-left"></i>
  </button>
  <button
    class="tooltip tooltip-right btn style-white rounded-full col-start-3 w-10 !px-2"
    data-tooltip="Tooltip on right"
  >
    <i class="bi-chevron-right"></i>
  </button>
  <button
    class="tooltip tooltip-bottom btn style-white rounded-full col-start-2 w-10 !px-2"
    data-tooltip="Tooltip on bottom"
  >
    <i class="bi-chevron-down"></i>
  </button>
</div>
`;
const CODE_VIEW_TOOLTIP_WHITE_BLACK = `<div class="flex flex-col gap-2 w-fit">
  <button
    class="btn style-white tooltip tooltip-right"
    data-tooltip="More details here"
  >
    White Tooltip
  </button>
  
  <button
    class="btn style-white tooltip tooltip-black tooltip-right"
    data-tooltip="More details here"
  >
    Black Tooltip
  </button>
</div>
`;
const CODE_VIEW_TOOLTIP_USAGE = `<div class="card">
  <article class="card-content">
    <ul class="list unmarker">
      <li class="list-item !flex justify-between">
        <header>
          <h4 class="text-base font-medium">
            Christopher Gonçalves
          </h4>
          <small class="text-secondary text-xs">
            christopher@gmail.com
          </small>
        </header>

        <button
          class="btn"
          disabled
        >
          Guest <i class="bi-chevron-down"></i>
        </button>
      </li>
      <li class="list-item !flex justify-between">
        <header>
          <h4 class="text-base font-medium">
            Amanda Ketellyn
          </h4>
          <small class="text-secondary text-xs">amanda@gmail.com</small>
        </header>

        <button
          class="btn"
          disabled
        >
          Guest <i class="bi-chevron-down"></i>
        </button>
      </li>
    </ul>
  </article>

  <hr>

  <footer class="card-content !px-8">
    The public share <a
      href="#"
      class="text-theme"
    >link settings</a>
    <span
      class="tooltip"
      data-tooltip="The public share link allows people to view the project without giving access to full collaboration features."
    >
      <i class="bi-question-circle"></i>
    </span>
  </footer>
</div>
`;
</script>

<style scoped></style>

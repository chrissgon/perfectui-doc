<template>
  <!-- Every Markdown table: the library's table, scrolling inside its own box (migration-guide
       design, NFR-1, EDGE-5). -->
  <div class="prose-table">
    <table class="pui-table">
      <slot />
    </table>
  </div>
</template>

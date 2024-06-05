<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Customization
      </template>
      <template #title>
        Define your own color palette
      </template>

      Perfect UI allows you to define your own color palette, automatically
      adjusting all components to it.
    </MoleculeDocsHeader>

    <!-- how it works -->
    <MoleculeDocsContent>
      <template #title>
        How it works
      </template>

      <p>
        To better adapt to your visual identity, Perfect UI provides the
        <AtomToken>setThemeColor</AtomToken> method that allows you to define
        your color palette, setting it as the default for the entire
        application.
      </p>
      <!-- tabs -->
      <OrganismTabs>
        <template #header>
          <AtomIconTS />
          index.ts
        </template>
        <MoleculeCodeView
          :input="CODE_VIEW_USING_SET_THEME_COLOR"
          lang="ts"
        />
      </OrganismTabs>

      <p>
        The <AtomToken>setThemeColor</AtomToken> method expects to receive an
        object that satisfies the <AtomToken>IThemeColor</AtomToken> interface.
      </p>

      <AtomNoteWarn>
        To satisfy the interface, you need to enter a shade from 50 to 950 in
        RGB!
      </AtomNoteWarn>

      <OrganismTabs>
        <template #header>
          <AtomIconTS />
          index.d.ts
        </template>
        <MoleculeCodeView
          :input="CODE_VIEW_TYPES"
          lang="ts"
        />
      </OrganismTabs>
    </MoleculeDocsContent>
  </MoleculeDocsSection>
</template>

<script setup lang="ts">
// data
const CODE_VIEW_USING_SET_THEME_COLOR = `import { setThemeColor } from "@chrissgon/perfectui"

const palette = {
  50: "240, 250, 255",
  100: "223, 244, 255",
  200: "184, 235, 255",
  300: [121, 220, 255],
  400: [52, 204, 254],
  500: [7, 182, 240],
  600: [0, 146, 205],
  700: [0, 116, 166],
  800: [3, 98, 137],
  900: [9, 81, 113],
  950: [6, 51, 75],
}

setThemeColor(palette)`;

const CODE_VIEW_TYPES = `export interface IThemeColor {
    50: number[] | string;
    100: number[] | string;
    200: number[] | string;
    300: number[] | string;
    400: number[] | string;
    500: number[] | string;
    600: number[] | string;
    700: number[] | string;
    800: number[] | string;
    900: number[] | string;
    950: number[] | string;
}`;
</script>

<style scoped></style>

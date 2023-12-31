<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Installation
      </template>
      <template #title>
        Typescript friendly
      </template>

      Perfect UI is fully typed, developed in Typescript. All the methods and
      interfaces are available for use.
    </MoleculeDocsHeader>

    <MoleculeDocsContent>
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
}
export declare function setThemeColor(colors: IThemeColor): void;
export declare function setMode(theme?: "system" | "dark" | "light"): void;
`;
</script>

<style scoped></style>

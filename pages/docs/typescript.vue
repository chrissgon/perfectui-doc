<template>
  <MoleculeDocsSection>
    <MoleculeDocsHeader>
      <template #subtitle>
        Getting Started
      </template>
      <template #title>
        Typescript friendly
      </template>

      Perfect UI is fully typed, developed in Typescript. All the methods and
      interfaces are available for use.
    </MoleculeDocsHeader>

    <!-- types -->
    <MoleculeDocsContent id="types">
      <template #title>
        Types
      </template>
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
const CODE_VIEW_TYPES = `
export interface IThemeColor {
    50: number[];
    100: number[];
    200: number[];
    300: number[];
    400: number[];
    500: number[];
    600: number[];
    700: number[];
    800: number[];
    900: number[];
    950: number[];
}
export interface IFunctions {
    Accordion: () => void;
    Checkbox: () => void;
    Dropdown: () => void;
    setMode: (theme?: "system" | "dark" | "light") => void;
    setThemeColor: (colors: IThemeColor) => void;
}
export declare function Checkbox(): void;
export declare function Accordion(): void;
export declare function Dropdown(): void;
export declare function setThemeColor(colors: IThemeColor): void;
export declare function setMode(theme?: "system" | "dark" | "light"): void;
export declare function loadFunctions(): IFunctions;
`;
</script>

<style scoped></style>

<template>
  <OrganismTabs :tabs="['preview', 'code']">
    <template #hpreview>
      Preview
    </template>
    <template #hcode>
      <AtomIconHTML />
      HTML
    </template>
    <template #preview>
      <MoleculeCodePreview :preview="code" />
    </template>
    <template #code>
      <MoleculeCodeView :input="code" />
    </template>
  </OrganismTabs>
</template>

<script setup lang="ts">
interface IProps {
  code: string;
}
defineProps<IProps>();
</script>

<style scoped></style>

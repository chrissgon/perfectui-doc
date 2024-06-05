<template>
  <div class="card border-warn !bg-transparent">
    <article class="flex gap-3 !px-6 card-content">
      <i class="bi-exclamation-triangle-fill text-amber-500" />

      <div class="whitespace-break-spaces">
        <p class="text-amber-500 mb-2 font-semibold">
          <template v-if="!titled">
            Attention needed
          </template>
          <slot name="title" />
        </p>
        <slot />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
// props
interface IProps{
  titled?: boolean
}
defineProps<IProps>()
</script>

<style scoped>
.list {
  background-color: rgb(var(--backgroundSecondary));
}
</style>

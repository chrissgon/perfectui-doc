<template>
  <div class="card flex max-sm:flex-col">
    <div class="overflow-hidden max-sm:max-h-36 max-h-[300px] flex justify-center items-center">
      <img
        src="https://tailwindcss.com/_next/static/media/classic-utility-jacket.82031370.jpg"
        class="sm:max-w-64"
      />
    </div>
    <article class="card-content flex flex-col flex-1 gap-4 !p-6">
      <h4 class="text-lg font-bold whitespace-nowrap">
        Classic Utility Jacket
        <div
          class="btn btn-white rounded-full !p-0 float-right w-10 h-10 -mt-2"
        >
          <AtomDarkMode class="w-full h-full mt-0.5" />
        </div>
      </h4>

      <div>
        <span class="badge badge-white">In stock</span>
        <span class="text-base font-bold text-success float-right">$110.00</span>
      </div>

      <div>
        <button class="btn btn-black">
          XS
        </button>
        <button class="btn">
          S
        </button>
        <button class="btn">
          M
        </button>
        <button class="btn">
          L
        </button>
        <button class="btn">
          XL
        </button>
      </div>

      <hr class="my-2" />

      <div class="flex max-sm:flex-wrap gap-2">
        <button class="btn btn-black">
          Buy now
        </button>
        <button class="btn btn-white">
          Add to bag
        </button>
        <button class="btn btn-solid-error sm:ml-4">
          <i class="bi-heart-fill"></i>
        </button>
      </div>

      <p class="text-secondary">
        Free shipping
      </p>
    </article>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
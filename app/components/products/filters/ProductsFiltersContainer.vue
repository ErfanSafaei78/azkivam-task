<template>
  <aside
    class="max-lg:hidden w-1/5 h-max min-h-max bg-white rounded-xl border border-solid border-stone-500 overflow-y-auto"
  >
    <LazyProductsFilters />
  </aside>
  <div
    class="lg:hidden w-full flex items-center px-4 py-2 bg-white rounded-xl border border-solid border-stone-300"
  >
    <button
      class="w-[100px] h-12 rounded-xl bg-white hover:bg-neutral-100 text-neutral-900 border border-solid border-neutral-300 flex items-center justify-center px-3 py-2"
      @click="showModal = true"
    >
      فیلتر‌ها
    </button>
  </div>
  <LazyBaseModal v-model="showModal">
    <LazyProductsFilters />
  </LazyBaseModal>
</template>

<script lang="ts" setup>
const showModal = ref(false);
</script>

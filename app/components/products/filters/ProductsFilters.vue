<template>
  <section class="flex flex-col w-full gap-8 p-4">
    <div class="flex items-center justify-between gap-2">
      <h3 class="text-lg font-semibold">فیلتر‌ها</h3>
      <span
        v-if="hasAnyFilters"
        class="cursor-pointer text-gray-500 hover:text-gray-700 text-lg"
        @click="$router.push({ name: 'products', query: {}, params: {} })"
        >x</span
      >
    </div>
    <div class="flex flex-col w-full gap-6">
      <ProductsFiltersCategories />
      <hr >
      <ProductsFiltersMerchants />
    </div>
  </section>
</template>

<script lang="ts" setup>
const route = useRoute();
const hasAnyFilters = computed(
  () => route.query.merchantIds || route.params.categoryId
);
</script>

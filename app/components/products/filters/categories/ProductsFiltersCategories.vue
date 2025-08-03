<template>
  <span class="font-medium">دسته‌بندی‌ها</span>
  <div
    v-if="fetchStatus === 'success'"
    class="flex flex-col gap-6 text-neutral-800"
  >
    <ProductsFiltersCategoriesItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
    />
  </div>
  <div v-else-if="fetchStatus === 'pending'" class="flex flex-col gap-2">
    <span
      v-for="n in 4"
      :key="n"
      class="w-full h-6 bg-gray-200 animate-pulse"
    />
  </div>
  <span
    v-else-if="fetchStatus === 'error'"
    class="text-red-500 cursor-pointer text-sm"
    @click="() => refreshCategories()"
  >
    خطا در بارگذاری دسته‌بندی‌ها
    <span class="underline">تلاش مجدد</span>
  </span>
</template>

<script lang="ts" setup>
import { servicesGeneral } from "~/services/general";

const config = useRuntimeConfig();

const {
  data: categories,
  status: fetchStatus,
  refresh: refreshCategories,
} = await useAsyncData<Category[]>("categories", async () => {
  const rowCategories = await $fetch<FilterResponse<Category>>(
    servicesGeneral.categories,
    {
      baseURL: config.public.baseUrl,
    }
  );
  return buildCategoryTree(rowCategories.data || []);
});

function buildCategoryTree(categories: Category[]): Category[] {
  if (categories.length === 0) return [];

  const map = new Map();
  const roots: Category[] = [];

  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] });
  });

  map.forEach((cat) => {
    if (cat.parent) {
      const parent = map.get(cat.parent);
      if (parent) {
        parent.children.push(cat);
      }
    } else {
      roots.push(cat);
    }
  });

  return roots;
}
</script>

<template>
  <main
    class="flex-1 flex flex-col gap-2 bg-white rounded-3xl border border-solid border-stone-300"
  >
    <div v-if="fetchStatus === 'error'">
      <p class="text-red-500">مشکلی در بارگذاری محصولات پیش آمد</p>
    </div>
    <div
      v-else-if="products.length"
      ref="productsContainer"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="w-full flex flex-col gap-4 border border-solid border-stone-300 p-4 hover:shadow-lg"
      >
        <NuxtImg
          v-slot="{ src, isLoaded, imgAttrs }"
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full self-center aspect-square object-cover"
          custom
        >
          <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

          <div
            v-else
            class="w-full aspect-square bg-gray-300 rounded animate-pulse"
          />
        </NuxtImg>
        <span class="text-neutral-700 max-h-12 line-clamp-2">{{
          product.name
        }}</span>
        <div class="flex flex-col gap-3">
          <span class="text-neutral-500 text-xs">شروع قیمت از:</span>
          <div class="flex items-start gap-1">
            <span class="text-neutral-700 text-lg font-extrabold">
              {{ product.minPrice?.toLocaleString() }}
            </span>
            <span class="text-xs">تومان</span>
          </div>
        </div>
      </div>
    </div>
    <span
      v-if="fetchStatus === 'success' && !products.length"
      class="w-full text-center p-4"
    >
      هیچ محصولی یافت نشد
    </span>
    <span v-if="fetchStatus === 'pending'" class="w-full text-center p-4">
      در حال بارگذاری...
    </span>
  </main>
</template>

<script lang="ts" setup>
import { useSyncedQueryState } from "~/composables/useSyncedQueryState";
import { servicesGeneral } from "~/services/general";

const config = useRuntimeConfig();
const route = useRoute();
const infiniteScroll = useInfiniteScroll();

const categoryId = route.params.categoryId
  ? Number(route.params.categoryId)
  : undefined;

const PAGE_SIZE = 12;

const productsContainer = ref<HTMLElement | null>(null);

const products = ref<Product[]>([]);
const totalItems = ref<number | null>(null);

const { page, merchantIds } = useSyncedQueryState<{
  page: number;
  merchantIds: number[] | undefined;
}>(
  {
    page: 1,
    merchantIds: undefined,
  },
  {
    page: (value) => {
      if (value === undefined) return 1;
      return Array.isArray(value) ? Number(value[0]) : Number(value);
    },
    merchantIds: (value) => {
      if (value === undefined) return undefined;
      return Array.isArray(value) ? value.map(Number) : [Number(value)];
    },
  }
);

const hasMore = computed(
  () => totalItems.value != null && totalItems.value > products.value.length
);

const {
  data: productData,
  status: fetchStatus,
} = await useAsyncData(
  `products-${page.value}-${JSON.stringify(merchantIds.value)}-${categoryId}`,
  async () =>
    await $fetch<ProductListResponse>(servicesGeneral.products(categoryId), {
      method: "POST",
      baseURL: config.public.baseUrl,
      query: {
        size: PAGE_SIZE,
        page: page.value,
      },
      body: {
        merchantIds: merchantIds.value,
      },
    }),
  {
    watch: [page],
    lazy: true,
  }
);

watch(
  productData,
  (newData) => {
    products.value = [...(products.value || []), ...(newData?.data || [])];
    totalItems.value = newData?.totalItems || null;
    nextTick(observeInfiniteScroll);
  },
  { immediate: true }
);

watch(productsContainer, observeInfiniteScroll);

function observeInfiniteScroll() {
  infiniteScroll.observeLastChild(
    productsContainer,
    () => {
      if (fetchStatus.value === "success" && hasMore.value) page.value += 1;
    },
    hasMore
  );
}

watch(merchantIds, (newVal, oldVal) => {
  if(JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
  products.value = [];
  page.value = 1;

  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

onUnmounted(() => {
  infiniteScroll.unObserve();
});
</script>

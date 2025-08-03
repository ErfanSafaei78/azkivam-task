<template>
  <span class="font-medium">فروشگاه‌ها</span>
  <div
    v-if="fetchStatus === 'success'"
    class="flex flex-col gap-6 text-neutral-800"
  >
    <ProductsFiltersMerchantsSearch v-model="searchQuery" />

    <div class="flex flex-col gap-6 overflow-y-auto max-h-40">
      <ProductsFiltersMerchantsItem
        v-for="merchant in filteredMerchants"
        :key="merchant.id"
        :merchant="merchant"
        :is-selected="merchantIds?.includes(merchant.id) || false"
        @change="handleSelect(merchant.id)"
      />
    </div>
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
    @click="() => refreshMerchants()"
  >
    خطا در بارگذاری فروشگاه‌ها
    <span class="underline">تلاش مجدد</span>
  </span>
</template>

<script lang="ts" setup>
import { servicesGeneral } from "~/services/general";

const config = useRuntimeConfig();
const { merchantIds } = useSyncedQueryState<{
  merchantIds: number[] | undefined;
}>(
  {
    merchantIds: undefined,
  },
  {
    merchantIds: (value) => {
      if (value === undefined) return undefined;
      return Array.isArray(value) ? value.map(Number) : [Number(value)];
    },
  }
);
const searchQuery = ref("");

const filteredMerchants = computed(() => {
  const searchResult =
    merchantsData.value?.filter((merchant) =>
      merchant.name.includes(searchQuery.value)
    ) || [];

  return [
    ...searchResult.filter(
      (merchant) => merchantIds.value?.includes(merchant.id) || false
    ),
    ...searchResult.filter(
      (merchant) => !merchantIds.value?.includes(merchant.id) || false
    ),
  ];
});

const {
  data: merchantsData,
  status: fetchStatus,
  refresh: refreshMerchants,
} = await useAsyncData<Merchant[]>("merchants", async () => {
  const rowMerchants = await $fetch<FilterResponse<Merchant>>(
    servicesGeneral.merchants,
    {
      baseURL: config.public.baseUrl,
    }
  );
  return rowMerchants.data;
});

function handleSelect(id: number) {
  id = Number(id);

  if (!merchantIds.value || merchantIds.value.length === 0) {
    merchantIds.value = [id];
  } else {
    if (merchantIds.value.includes(id))
      merchantIds.value.splice(merchantIds.value.indexOf(id), 1);
    else merchantIds.value.push(id);
  }

  if (merchantIds.value?.length === 0) merchantIds.value = undefined;
}
</script>

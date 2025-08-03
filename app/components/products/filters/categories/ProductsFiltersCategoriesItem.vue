<template>
  <div class="flex items-center gap-2 cursor-pointer">
    <span
      class="hover:text-neutral-600"
      :class="{ 'text-bold text-neutral-900 underline': isCategoryPage }"
      @click="$router.push(`/products/${category.id}/${category.slug}`)"
    >
      {{ category.name }}
    </span>
    <NuxtImg
      v-if="category.children?.length"
      src="/icons/arrow-up.svg"
      width="28"
      class="transition-transform duration-500"
      :class="{ 'rotate-180': !isToggled }"
      loading="lazy"
      @click="isToggled = !isToggled"
    />
  </div>

  <div
    class="flex flex-col gap-6 text-sm text-neutral-500 pr-4 max-h-0 overflow-hidden transition-all duration-500 ease-in-out"
    :class="{
      'max-h-[999px]': category.children?.length && isToggled,
    }"
  >
    <ProductsFiltersCategoriesItem
      v-for="child in category.children"
      :key="child.id"
      :category="child"
      @toggle="onChildToggled"
    />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const props = defineProps<{
  category: Category;
}>();
const emit = defineEmits(["toggle"]);

const isInitiallyToggled = computed(
  () =>
  Number(route.params.categoryId) === props.category.id ||
  props.category.children?.some(
    (child) => child.id === Number(route.params.categoryId)
  ) || false
);

if(isInitiallyToggled.value) emit("toggle")

const isToggled = ref<boolean>(isInitiallyToggled.value);

const isCategoryPage = computed(
  () => Number(route.params.categoryId) === props.category.id
);

function onChildToggled() {
  isToggled.value = true;
  emit("toggle");
}
</script>

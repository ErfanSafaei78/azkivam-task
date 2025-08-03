<template>
  <div
    class="w-full flex items-center justify-between gap-2 bg-neutral-100 border border-gray-400 rounded-lg p-2 relative"
  >
    <input
      :value="modelValue"
      type="text"
      placeholder="جستجوی فروشگاه"
      class="flex-1 max-w-[80%] border-none bg-transparent outline-none placeholder:text-sm placeholder:text-gray-400"
      @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement)?.value)"
    >
    <NuxtImg
      src="/icons/search.svg"
      alt="Search"
      width="20"
      height="20"
      loading="lazy"
      class="absolute left-2"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: string;
}>();
defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

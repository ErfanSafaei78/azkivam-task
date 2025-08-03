<template>
  <div class="flex items-center gap-2">
    <div
      class="relative w-5 h-5 border-2 border-solid border-gray-400 rounded-md cursor-pointer"
      :class="{ 'bg-gray-400': modelValue, 'bg-transparent': !modelValue }"
      @click="() => $emit('update:modelValue', !modelValue)"
    >
      <NuxtImg
        v-if="modelValue"
        src="/icons/check.svg"
        alt="Checked"
        width="100%"
        height="100%"
        class="absolute inset-0"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  modelValue: boolean;
}>();
defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();
</script>

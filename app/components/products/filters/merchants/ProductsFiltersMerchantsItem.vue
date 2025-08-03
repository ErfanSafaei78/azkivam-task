<template>
  <div class="flex items-center gap-2">
    <BaseCheckbox
      :model-value="isSelected"
      @update:model-value="$emit('change')"
    />
    <span :class="{ 'font-bold': isSelected }">{{ merchant.name }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  merchant: Merchant;
  isSelected: boolean;
}>();
defineEmits(["change"]);
</script>

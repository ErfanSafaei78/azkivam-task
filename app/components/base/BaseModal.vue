<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click="$emit('update:modelValue', false)"
      >
        <div
          class="bg-white rounded-2xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto shadow-xl relative"
          @click.stop
        >
          <button
            class="absolute top-2 left-2 text-gray-500 hover:text-gray-700 p-2"
            @click="$emit('update:modelValue', false)"
          >
            ✕
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

defineEmits(["update:modelValue"]);
</script>

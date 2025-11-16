<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <a-input
      :value="modelValue"
      @update:value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      :prefix="prefix"
      :suffix="suffix"
      :size="size"
      :status="error ? 'error' : ''"
      class="w-full"
    />
    <div v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  type?: string
  prefix?: string
  suffix?: string
  size?: 'large' | 'middle' | 'small'
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

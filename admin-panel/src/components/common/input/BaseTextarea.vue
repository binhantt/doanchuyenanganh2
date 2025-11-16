<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <a-textarea
      :value="modelValue"
      @update:value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxLength"
      :show-count="showCount"
      :auto-size="autoSize"
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
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  showCount?: boolean
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

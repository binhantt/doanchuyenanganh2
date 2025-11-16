<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <a-select
      :value="modelValue"
      @update:value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :disabled="disabled"
      :mode="mode"
      :show-search="showSearch"
      :allow-clear="allowClear"
      :options="options"
      :filter-option="filterOption"
      :status="error ? 'error' : ''"
      class="w-full"
    />
    <div v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

defineProps<{
  modelValue?: string | number | string[] | number[]
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  mode?: 'multiple' | 'tags'
  showSearch?: boolean
  allowClear?: boolean
  options: Option[]
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number | string[] | number[]]
}>()

const filterOption = (input: string, option: Option) => {
  return option.label.toLowerCase().includes(input.toLowerCase())
}
</script>

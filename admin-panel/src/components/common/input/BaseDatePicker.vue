<template>
  <div class="mb-4">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <a-date-picker
      v-if="!range"
      :value="modelValue"
      @update:value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :disabled="disabled"
      :format="format"
      :show-time="showTime"
      :disabled-date="disabledDate"
      :status="error ? 'error' : ''"
      class="w-full"
    />
    <a-range-picker
      v-else
      :value="modelValue"
      @update:value="$emit('update:modelValue', $event)"
      :placeholder="placeholder"
      :disabled="disabled"
      :format="format"
      :show-time="showTime"
      :disabled-date="disabledDate"
      :status="error ? 'error' : ''"
      class="w-full"
    />
    <div v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dayjs } from 'dayjs'

defineProps<{
  modelValue?: Dayjs | [Dayjs, Dayjs]
  label?: string
  placeholder?: string | [string, string]
  disabled?: boolean
  required?: boolean
  format?: string
  showTime?: boolean
  range?: boolean
  disabledDate?: (current: Dayjs) => boolean
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: Dayjs | [Dayjs, Dayjs]]
}>()
</script>

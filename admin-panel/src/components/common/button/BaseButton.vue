<template>
  <a-button
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :danger="danger"
    :ghost="ghost"
    :block="block"
    :html-type="htmlType"
    @click="$emit('click', $event)"
    :class="customClass"
  >
    <component v-if="icon" :is="icon" class="mr-1" />
    <slot />
  </a-button>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  size?: 'large' | 'middle' | 'small'
  loading?: boolean
  disabled?: boolean
  danger?: boolean
  ghost?: boolean
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  icon?: Component
  customClass?: string
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

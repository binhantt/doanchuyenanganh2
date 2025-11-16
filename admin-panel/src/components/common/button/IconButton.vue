<template>
  <a-button
    :type="type"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :danger="danger"
    :shape="shape"
    @click="$emit('click', $event)"
    :class="customClass"
  >
    <component :is="icon" />
  </a-button>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  icon: Component
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  size?: 'large' | 'middle' | 'small'
  loading?: boolean
  disabled?: boolean
  danger?: boolean
  shape?: 'circle' | 'round'
  customClass?: string
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

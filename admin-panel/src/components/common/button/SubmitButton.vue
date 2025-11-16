<template>
  <a-button
    type="primary"
    html-type="submit"
    :size="size"
    :loading="loading"
    :disabled="disabled"
    :block="block"
    class="bg-pinkPrimary hover:bg-pinkDark"
    @click="$emit('click', $event)"
  >
    <slot>Lưu</slot>
  </a-button>
</template>

<script setup lang="ts">
defineProps<{
  size?: 'large' | 'middle' | 'small'
  loading?: boolean
  disabled?: boolean
  block?: boolean
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <a-modal
    :open="open"
    :title="title"
    :width="width"
    :footer="footer"
    :mask-closable="maskClosable"
    :closable="closable"
    @cancel="$emit('cancel')"
    @ok="$emit('ok')"
  >
    <template v-if="$slots.header" #title>
      <slot name="header" />
    </template>
    
    <slot />
    
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </a-modal>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
  width?: string | number
  footer?: null | boolean
  maskClosable?: boolean
  closable?: boolean
}>()

defineEmits<{
  cancel: []
  ok: []
}>()
</script>

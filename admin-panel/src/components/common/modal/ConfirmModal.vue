<template>
  <a-modal
    :open="open"
    :title="title"
    :ok-text="okText"
    :cancel-text="cancelText"
    :ok-type="okType"
    :confirm-loading="loading"
    @cancel="$emit('cancel')"
    @ok="$emit('ok')"
  >
    <p>{{ content }}</p>
  </a-modal>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
  content: string
  okText?: string
  cancelText?: string
  okType?: 'primary' | 'danger'
  loading?: boolean
}>()

defineEmits<{
  cancel: []
  ok: []
}>()
</script>

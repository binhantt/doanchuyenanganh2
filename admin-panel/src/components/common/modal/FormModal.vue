<template>
  <a-modal
    :open="open"
    :title="title"
    :width="width"
    :footer="null"
    :mask-closable="false"
    @cancel="$emit('cancel')"
  >
    <a-form
      :model="formData"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      @finish="$emit('submit', formData)"
    >
      <slot :form-data="formData" />
      
      <div class="flex justify-end gap-2 mt-6 pt-4 border-t">
        <a-button @click="$emit('cancel')">
          Hủy
        </a-button>
        <a-button type="primary" html-type="submit" :loading="loading">
          {{ submitText }}
        </a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title: string
  formData: any
  width?: string | number
  loading?: boolean
  submitText?: string
}>()

defineEmits<{
  cancel: []
  submit: [data: any]
}>()
</script>

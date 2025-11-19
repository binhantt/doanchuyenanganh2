<template>
  <a-form
    :model="formData"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    @finish="$emit('submit', formData)"
  >
    <a-form-item label="Mã giảm giá" required>
      <base-input
        v-model="formData.code"
        placeholder="VD: SUMMER2024"
        :error="errors.code"
      />
    </a-form-item>

    <a-form-item label="Tiêu đề" required>
      <base-input
        v-model="formData.title"
        placeholder="VD: Giảm giá mùa hè"
        :error="errors.title"
      />
    </a-form-item>

    <a-form-item label="Mô tả" required>
      <base-textarea
        v-model="formData.description"
        placeholder="Mô tả chi tiết về chương trình giảm giá"
        :rows="3"
        :error="errors.description"
      />
    </a-form-item>

    <a-form-item label="Loại giảm giá" required>
      <a-radio-group v-model:value="formData.discountType">
        <a-radio value="percentage">Phần trăm (%)</a-radio>
        <a-radio value="fixed">Số tiền cố định (VNĐ)</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="Giá trị giảm" required>
      <base-input
        v-model.number="formData.discountValue"
        type="number"
        :placeholder="formData.discountType === 'percentage' ? 'VD: 20 (%)' : 'VD: 500000 (VNĐ)'"
        :error="errors.discountValue"
      />
      <span class="text-gray-500 text-sm">
        {{ formData.discountType === 'percentage' ? 'Nhập % giảm giá (0-100)' : 'Nhập số tiền giảm' }}
      </span>
    </a-form-item>

    <a-form-item label="Giảm tối đa" v-if="formData.discountType === 'percentage'">
      <base-input
        v-model.number="formData.maxDiscount"
        type="number"
        placeholder="VD: 5000000"
      />
      <span class="text-gray-500 text-sm">Số tiền giảm tối đa (để trống nếu không giới hạn)</span>
    </a-form-item>

    <a-form-item label="Đơn hàng tối thiểu">
      <base-input
        v-model.number="formData.minOrderAmount"
        type="number"
        placeholder="VD: 10000000"
      />
      <span class="text-gray-500 text-sm">Giá trị đơn hàng tối thiểu để áp dụng</span>
    </a-form-item>

    <a-form-item label="Ngày bắt đầu" required>
      <base-date-picker
        v-model="startDateValue"
        show-time
        format="DD/MM/YYYY HH:mm"
        placeholder="Chọn ngày bắt đầu"
      />
    </a-form-item>

    <a-form-item label="Ngày kết thúc" required>
      <base-date-picker
        v-model="endDateValue"
        show-time
        format="DD/MM/YYYY HH:mm"
        placeholder="Chọn ngày kết thúc"
      />
    </a-form-item>

    <a-form-item label="Trạng thái">
      <a-switch v-model:checked="formData.isActive" />
      <span class="ml-2 text-gray-600">
        {{ formData.isActive ? 'Hoạt động' : 'Không hoạt động' }}
      </span>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 6, span: 18 }">
      <a-space>
        <a-button @click="$emit('cancel')">Hủy</a-button>
        <submit-button :loading="loading">
          {{ isEdit ? 'Cập nhật' : 'Tạo mới' }}
        </submit-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import BaseInput from '@/components/common/input/BaseInput.vue'
import BaseTextarea from '@/components/common/input/BaseTextarea.vue'
import BaseDatePicker from '@/components/common/input/BaseDatePicker.vue'
import SubmitButton from '@/components/common/button/SubmitButton.vue'
import type { PromotionFormData } from '../types/promotion.types'
import dayjs, { Dayjs } from 'dayjs'

const props = defineProps<{
  initialData?: PromotionFormData
  loading?: boolean
  isEdit?: boolean
}>()

const emit = defineEmits<{
  submit: [data: PromotionFormData]
  cancel: []
}>()

const formData = ref<PromotionFormData>({
  code: '',
  title: '',
  description: '',
  discountType: 'percentage',
  discountValue: 0,
  maxDiscount: undefined,
  minOrderAmount: undefined,
  startDate: new Date().toISOString(),
  endDate: dayjs().add(30, 'day').toISOString(),
  isActive: true
})

const errors = ref<Record<string, string>>({})

// Convert string dates to Dayjs for date pickers
const startDateValue = computed({
  get: () => formData.value.startDate ? dayjs(formData.value.startDate) : dayjs(),
  set: (val: Dayjs) => {
    formData.value.startDate = val.toISOString()
  }
})

const endDateValue = computed({
  get: () => formData.value.endDate ? dayjs(formData.value.endDate) : dayjs().add(30, 'day'),
  set: (val: Dayjs) => {
    formData.value.endDate = val.toISOString()
  }
})

watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = { ...newData }
  }
}, { immediate: true })

// Auto-generate code from title
watch(() => formData.value.title, (newTitle) => {
  if (!props.isEdit && newTitle) {
    formData.value.code = newTitle
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/gi, 'D')
      .replace(/[^A-Z0-9]+/g, '')
      .substring(0, 20)
  }
})
</script>

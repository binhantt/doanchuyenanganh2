<template>
  <div class="mb-6">
    <div 
      class="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow mb-4"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex items-center gap-3">
        <div class="text-lg font-semibold text-gray-700">
          Thống kê gói dịch vụ
        </div>
        <div class="text-sm text-gray-500">
          ({{ totalPackages }} gói)
        </div>
      </div>
      <div class="text-pinkPrimary transition-transform" :class="{ 'rotate-180': isExpanded }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="isExpanded" class="overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <pink-card class="text-center">
            <div class="text-2xl font-bold pink-gradient-text">{{ totalPackages }}</div>
            <div class="text-gray-500 text-sm mt-1">Tổng gói</div>
          </pink-card>
          
          <pink-card class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ activePackages }}</div>
            <div class="text-gray-500 text-sm mt-1">Đang hoạt động</div>
          </pink-card>
          
          <pink-card class="text-center">
            <div class="text-2xl font-bold text-yellow-600">{{ popularPackages }}</div>
            <div class="text-gray-500 text-sm mt-1">Phổ biến</div>
          </pink-card>
          
          <pink-card class="text-center">
            <div class="text-2xl font-bold text-pinkPrimary">{{ formatCurrency(averagePrice) }}</div>
            <div class="text-gray-500 text-sm mt-1">Giá trung bình</div>
          </pink-card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import { formatCurrency } from '@/utils/formatDate'
import type { Package } from '../types/package.types'

const props = defineProps<{
  packages: Package[]
}>()

const isExpanded = ref(true)

const totalPackages = computed(() => props.packages.length)
const activePackages = computed(() => props.packages.filter(p => p.isActive).length)
const popularPackages = computed(() => props.packages.filter(p => p.isPopular).length)
const averagePrice = computed(() => {
  if (props.packages.length === 0) return 0
  const total = props.packages.reduce((sum, p) => sum + p.price, 0)
  return Math.round(total / props.packages.length)
})
</script>

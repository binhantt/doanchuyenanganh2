<template>
  <div class="mb-6">
    <div 
      class="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow mb-4"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex items-center gap-3">
        <div class="text-lg font-semibold text-gray-700">
          Thống kê sản phẩm
        </div>
        <div class="text-sm text-gray-500">
          ({{ totalProducts }} sản phẩm)
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
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <pink-card class="text-center">
            <div class="text-2xl font-bold pink-gradient-text">{{ totalProducts }}</div>
            <div class="text-gray-500 text-sm mt-1">Tổng sản phẩm</div>
          </pink-card>
          
          <pink-card 
            v-for="category in categoryStats" 
            :key="category.value"
            class="text-center cursor-pointer hover:shadow-lg transition-shadow"
            @click="$emit('filter-category', category.value)"
          >
            <div class="text-2xl font-bold text-pinkPrimary">{{ category.count }}</div>
            <div class="text-gray-500 text-sm mt-1">{{ category.label }}</div>
          </pink-card>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PinkCard from '@/components/common/card/PinkCard.vue'
import { PRODUCT_CATEGORIES } from '../types/product.types'
import type { Product } from '../types/product.types'

const props = defineProps<{
  products: Product[]
}>()

const emit = defineEmits<{
  'filter-category': [category: string]
}>()

const isExpanded = ref(true)

const totalProducts = computed(() => props.products.length)

const categoryStats = computed(() => {
  return PRODUCT_CATEGORIES.map(category => {
    const count = props.products.filter(p => p.category === category.value).length
    return {
      ...category,
      count
    }
  })
})
</script>

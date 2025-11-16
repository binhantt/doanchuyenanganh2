<template>
  <a-card 
    :class="[
      'pink-card',
      hoverable && 'pink-card-hoverable',
      gradient && 'pink-gradient-bg'
    ]"
    :bordered="bordered"
  >
    <template v-if="$slots.title || title" #title>
      <div class="flex items-center gap-2">
        <component v-if="icon" :is="icon" class="text-pinkPrimary text-xl" />
        <span class="font-semibold text-pinkDark">
          <slot name="title">{{ title }}</slot>
        </span>
      </div>
    </template>
    
    <template v-if="$slots.extra" #extra>
      <slot name="extra" />
    </template>
    
    <slot />
  </a-card>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  title?: string
  icon?: Component
  hoverable?: boolean
  gradient?: boolean
  bordered?: boolean
}>()
</script>

<style scoped>
.pink-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.pink-card-hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 77, 138, 0.25);
}

.pink-card :deep(.ant-card-head) {
  background: linear-gradient(135deg, #FFF0F6 0%, #FFE5F0 100%);
  border-bottom: 2px solid #FFB3CF;
}

.pink-card :deep(.ant-card-body) {
  padding: 20px;
}
</style>

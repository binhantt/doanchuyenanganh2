<template>
  <div class="flex flex-col items-center justify-center min-h-[400px]">
    <a-empty description="Trang đang được phát triển">
      <template #image>
        <inbox-outlined style="font-size: 64px; color: #FF4D8A;" />
      </template>
    </a-empty>
  </div>
</template>

<script setup lang="ts">
import { InboxOutlined } from '@ant-design/icons-vue'
</script>

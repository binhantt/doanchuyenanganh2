import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import type { Pagination } from '@/types/Pagination'

export function usePagination(initialPage: number = 1, initialLimit: number = 10) {
  const page = ref(initialPage)
  const limit = ref(initialLimit)
  const total = ref(0)

  const totalPages = computed(() => Math.ceil(total.value / limit.value))

  const pagination = computed<Pagination>(() => ({
    page: page.value,
    limit: limit.value,
    total: total.value,
    totalPages: totalPages.value
  }))

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const setLimit = (newLimit: number) => {
    limit.value = newLimit
    page.value = 1
  }

  const setTotal = (newTotal: number) => {
    total.value = newTotal
  }

  const reset = () => {
    page.value = initialPage
    limit.value = initialLimit
    total.value = 0
  }

  return {
    page,
    limit,
    total,
    totalPages,
    pagination,
    setPage,
    setLimit,
    setTotal,
    reset
  }
}

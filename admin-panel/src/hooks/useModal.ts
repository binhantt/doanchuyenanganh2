import { ref } from 'vue'

export function useModal() {
  const visible = ref(false)
  const loading = ref(false)

  const open = () => {
    visible.value = true
  }

  const close = () => {
    visible.value = false
    loading.value = false
  }

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  return {
    visible,
    loading,
    open,
    close,
    setLoading
  }
}

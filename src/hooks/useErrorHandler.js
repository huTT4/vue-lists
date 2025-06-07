import { ref, computed } from 'vue'

export function useErrorHandler() {
  const errorText = ref(null)
  const isThereError = computed(() => !!errorText.value)

  return {
    errorText,
    isThereError
  }
}

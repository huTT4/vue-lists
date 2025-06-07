<script setup lang="ts">
import { onMounted, ref } from 'vue'

const emits = defineEmits(['close'])
defineProps({
  text: String,
})

const isActive = ref(false)

const close = () => {
  isActive.value = false
  setTimeout(() => emits('close'), 300)
}

onMounted(() => {
  requestAnimationFrame(() => (isActive.value = true))
  setTimeout(close, 3000)
})
</script>

<template>
  <div class="error" :class="{ active: isActive }">{{ text }}</div>
</template>

<style scoped>
.error {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 100%);
  background-color: #ffffff31;
  padding: 50px;
  border-radius: var(--radius);
  font-size: 20px;
  transition: var(--smooth);
}

.error.active {
  transform: translate(-50%, 10px);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import ListCards from './ListCards.vue'
import ListCategory from './ListCategory.vue'

defineProps({
  category: String,
  items: Array,
})

const isActive = ref(false)
const isAnimating = ref(false)

const toggleActive = async () => {
  isAnimating.value = !isAnimating.value
  if (isActive.value) {
    setTimeout(() => {
      isActive.value = false
    }, 10)
  }
  isActive.value = !isActive.value
}
</script>

<template>
  <li>
    <ListCategory
      :category="category"
      :isAnimating="isAnimating"
      @toggleActive="toggleActive"
      @added="isActive = true"
    />
    <Transition name="slide">
      <ListCards v-if="isActive" :items="items" :category="category" />
    </Transition>
  </li>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease-out;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
</style>

<script setup>
import { useListsStore } from '../stores/lists.store'
import ListTop from './ListTop.vue'
import ListBottom from './ListBottom.vue'

const store = useListsStore()
</script>

<template>
  <div class="lists">
    <ListTop />
    <ListBottom v-if="store.isThereLists" />
    <p v-else class="lists-else">Ничего нет...</p>
  </div>
</template>

<style scoped>
.lists {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  padding-top: 50px;
}

.lists-else {
  font-size: 32px;
}
</style>

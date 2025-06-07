<script setup lang="ts">
import { useListsStore } from '../stores/lists.store'
import ListCard from './ListCard.vue'

defineProps({
  items: Array,
  category: String,
})

const store = useListsStore()
</script>

<template>
  <ul class="list-cards" v-if="store.isThereItems(category)">
    <ListCard
      v-for="item in items"
      :key="item"
      :text="item"
      :category="category"
    />
  </ul>
  <p class="list-cards__else" v-else>Ничего нет...</p>
</template>

<style scoped>
.list-cards {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.list-cards__else {
  margin-top: 10px;
  width: 450px;
  text-align: center;
  font-size: 18px;
}
</style>

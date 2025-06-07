<script setup lang="ts">
import { useListsStore } from '../stores/lists.store'
import ListItem from './ListItem.vue'

const store = useListsStore()
</script>

<template>
  <ul class="lists-bottom">
    <ListItem
      v-for="list in store.lists"
      :key="list.title"
      :category="list.title"
      :items="list.items"
    />
  </ul>
</template>

<style scoped>
.lists-bottom {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

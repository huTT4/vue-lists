<script setup lang="ts">
import Error from './Ui/Error.vue'
import Modal from './Ui/Modal.vue'
import { useErrorHandler } from '../hooks/useErrorHandler'
import { useAppLogic } from '../hooks/useAppLogic'

const props = defineProps({
  category: String,
  text: String,
})

const { errorText, isThereError } = useErrorHandler()
const { isEditing, isClosing, deleteItem, editItem } = useAppLogic(
  errorText,
  props
)
</script>

<template>
  <Teleport to="body">
    <Error v-if="isThereError" :text="errorText" @close="errorText = null" />
  </Teleport>

  <Teleport to="body">
    <Modal
      v-if="isEditing"
      :isClosing="isClosing"
      @action="editItem"
      @close="isEditing = false"
      type="editItem"
    />
  </Teleport>

  <li class="list-card">
    <p class="list-card__text">{{ text }}</p>
    <div class="icons">
      <!-- Delete -->
      <svg
        @click="deleteItem"
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24px"
        height="24px"
      >
        <path
          d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"
        />
      </svg>
      <!-- Edit -->
      <svg
        @click="isEditing = true"
        class="icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 21H12"
          stroke="#d4d4d4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </li>
</template>

<style scoped>
.list-card {
  color: var(--text);
  border: 1px solid var(--border);
  background-color: var(--bgItem);
  border-radius: var(--radius);
  padding: 10px;
  font-size: 18px;
  width: 450px;
  display: flex;
  justify-content: space-between;
}

.list-card__text {
  line-height: 1.5;
}
</style>

<script setup lang="ts">
import Btn from './Ui/Btn.vue'
import Error from './Ui/Error.vue'
import Modal from './Ui/Modal.vue'
import { useErrorHandler } from '../hooks/useErrorHandler'
import { useAppLogic } from '../hooks/useAppLogic'

const { errorText, isThereError } = useErrorHandler()
const { isAdding, isClosing, addNewCategory } = useAppLogic(errorText)
</script>

<template>
  <Teleport to="body">
    <Error v-if="isThereError" :text="errorText" @close="errorText = null" />
  </Teleport>

  <Teleport to="body">
    <Modal
      v-if="isAdding"
      :isClosing="isClosing"
      @action="addNewCategory"
      @close="isAdding = false"
      type="addCategory"
    />
  </Teleport>

  <div class="lists-top">
    <h1>LISTS</h1>
    <Btn @click="isAdding = true">Добавить новую категорию</Btn>
  </div>
</template>

<style scoped>
.lists-top {
  display: flex;
  align-items: center;
  gap: 25px;
}

.lists-top button {
  background-color: #383838;
}

.lists-top button:hover {
  background-image: linear-gradient(
    90deg,
    rgba(66, 66, 66, 0) 0%,
    rgba(66, 66, 66, 1) 100%
  );
}
</style>

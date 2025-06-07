<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import Btn from '../Ui/Btn.vue'

const props = defineProps({
  isClosing: Boolean,
  category: String,
  type: String,
})
const emits = defineEmits(['action', 'close'])

const text = ref('')

const action = () => {
  if (text.value.trim().length) {
    emits('action', text.value)
  }
}

// Focus
const inputRef = ref(null)
onMounted(() => inputRef.value.focus())

// Smooth
const isActive = ref(false)
onMounted(() => (isActive.value = true))

const close = () => {
  isActive.value = false
  setTimeout(() => emits('close'), 175)
}

watch(
  () => props.isClosing,
  (closing) => {
    if (closing) close()
  }
)

const title = computed(() => {
  switch (props.type) {
    case 'addCategory':
      return 'Добавление новой категории'
    case 'addItem':
      return `Добавление нового поля в категорию: <span style="color: #ffa600">${props.category}</span>`
    case 'editCategory':
      return 'Редактирование названия категории'
    default:
      return 'Редактирование поля'
  }
})

const btnText = computed(() =>
  props.type === 'editCategory' || props.type === 'editItem'
    ? 'Изменить'
    : 'Добавить'
)
</script>

<template>
  <div @click="close" class="overlay" :class="{ active: isActive }"></div>
  <form class="modal" :class="{ active: isActive }" @submit.prevent="action">
    <h3 class="modal-title" v-html="title"></h3>
    <input ref="inputRef" class="modal-input" type="text" v-model="text" />
    <Btn>{{ btnText }}</Btn>
  </form>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgb(0, 0, 0);
  opacity: 0;
  transition: var(--smooth);
}

.overlay.active {
  opacity: 0.4;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: var(--bgModal);
  position: absolute;
  left: 50%;
  top: 20%;
  padding: 15px;
  border-radius: var(--radius);
  transition: var(--smooth);
  opacity: 0.5;
  transform: translate(-50%) scale(0.8);
  max-width: 400px;
}

.modal.active {
  opacity: 1;
  transform: translate(-50%) scale(1);
}

.modal-title {
  margin-bottom: 5px;
  font-size: 24px;
  line-height: 130%;
}

.modal-input {
  background-color: var(--bgInputModal);
  color: var(--text);
  font-size: inherit;
  font-family: inherit;
  border: none;
  padding: 10px 15px;
  width: 100%;
  border-radius: var(--radius);
}

.modal-input {
  background-color: var(--bgInputModal);
}

.modal-input:focus {
  outline: 2px dashed;
  outline-color: rgba(255, 255, 255, 0.205);
}
</style>

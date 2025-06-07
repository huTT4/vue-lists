<script setup lang="ts">
import Error from './Ui/Error.vue'
import Modal from './Ui/Modal.vue'
import { useErrorHandler } from '../hooks/useErrorHandler'
import { useAppLogic } from '../hooks/useAppLogic'

const props = defineProps({
  category: String,
  isAnimating: Boolean,
})

const emits = defineEmits(['toggle-active', 'added'])
const toggleActive = () => emits('toggle-active')

const { errorText, isThereError } = useErrorHandler()
const {
  isAdding,
  isClosing,
  isEditing,
  addNewItem,
  deleteCategory,
  editCategory,
} = useAppLogic(errorText, props, emits)
</script>

<template>
  <!-- Modal Error -->
  <Teleport to="body">
    <Error v-if="isThereError" :text="errorText" @close="errorText = null" />
  </Teleport>

  <!-- Edit Name Category -->
  <Teleport to="body">
    <Modal
      v-if="isEditing"
      :isClosing="isClosing"
      @action="editCategory"
      @close="isEditing = false"
      type="editCategory"
    />
  </Teleport>

  <!-- Add Item In Category -->
  <Teleport to="body">
    <Modal
      v-if="isAdding"
      :isClosing="isClosing"
      :category="category"
      @action="addNewItem"
      @close="isAdding = false"
      type="addItem"
    />
  </Teleport>

  <div class="category-wrapper">
    <div @click="toggleActive" class="category">
      <p>{{ category }}</p>
      <svg
        class="category-arrow"
        :class="{ active: isAnimating }"
        id="blue_copy"
        style="enable-background: new 0 0 100 100"
        version="1.1"
        viewBox="0 0 100 100"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g id="Layer_4_copy">
          <path
            d="M31.356,25.677l38.625,22.3c1.557,0.899,1.557,3.147,0,4.046l-38.625,22.3c-1.557,0.899-3.504-0.225-3.504-2.023V27.7   C27.852,25.902,29.798,24.778,31.356,25.677z"
          />
          <path
            d="M69.981,47.977l-38.625-22.3c-0.233-0.134-0.474-0.21-0.716-0.259l37.341,21.559c1.557,0.899,1.557,3.147,0,4.046   l-38.625,22.3c-0.349,0.201-0.716,0.288-1.078,0.301c0.656,0.938,1.961,1.343,3.078,0.699l38.625-22.3   C71.538,51.124,71.538,48.876,69.981,47.977z"
          />
          <path
            d="M31.356,25.677l38.625,22.3c1.557,0.899,1.557,3.147,0,4.046   l-38.625,22.3c-1.557,0.899-3.504-0.225-3.504-2.023V27.7C27.852,25.902,29.798,24.778,31.356,25.677z"
            style="fill: none; stroke: #000000; stroke-miterlimit: 10"
          />
        </g>
      </svg>
    </div>
    <div class="icons">
      <!-- Add -->
      <svg
        @click="isAdding = true"
        class="icon"
        version="1.1"
        id="Layer_1"
        xmlns:x="&ns_extend;"
        xmlns:i="&ns_ai;"
        xmlns:graph="&ns_graphs;"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        enable-background="new 0 0 24 24"
        xml:space="preserve"
      >
        <g>
          <g>
            <g>
              <path
                d="M12,24c-3.2,0-6.2-1.2-8.5-3.5c-4.7-4.7-4.7-12.3,0-17C5.8,1.2,8.8,0,12,0s6.2,1.2,8.5,3.5c4.7,4.7,4.7,12.3,0,17
				C18.2,22.8,15.2,24,12,24z M12,2C9.3,2,6.8,3,4.9,4.9C1,8.8,1,15.2,4.9,19.1C6.8,21,9.3,22,12,22s5.2-1,7.1-2.9
				c3.9-3.9,3.9-10.2,0-14.1C17.2,3,14.7,2,12,2z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M12,18c-0.6,0-1-0.4-1-1V7c0-0.6,0.4-1,1-1s1,0.4,1,1v10C13,17.6,12.6,18,12,18z"
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d="M17,13H7c-0.6,0-1-0.4-1-1s0.4-1,1-1h10c0.6,0,1,0.4,1,1S17.6,13,17,13z"
              />
            </g>
          </g>
        </g>
      </svg>
      <!-- Delete -->
      <svg
        @click="deleteCategory"
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
  </div>
</template>

<style scoped>
.category-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 5px;
}

.category {
  width: 450px;
  color: var(--text);
  border: 1px solid var(--border);
  background-color: var(--bgCategory);
  border-radius: var(--radius);
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
}

.category-arrow {
  width: 32px;
  fill: #fff;
  transform: rotate(-90deg);
  transition: var(--smooth);
}

.category-arrow.active {
  transform: rotate(90deg);
}
</style>

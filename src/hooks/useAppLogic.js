import { ref } from 'vue'
import { useListsStore } from '../stores/lists.store'


export function useAppLogic(errorText, props, emits) {
  const store = useListsStore()

  const isAdding = ref(false)
  const isClosing = ref(false)
  const isEditing = ref(false)

  // Category logic

  const addNewCategory = (newCategory) => {
    isClosing.value = true
    setTimeout(() => (isClosing.value = false), 10)

    try {
      store.addNewCategory(newCategory)
    } catch (error) {
      errorText.value = error.message
    }
  }

  const deleteCategory = () => {
    store.deleteCategory(props.category)
  }

  const editCategory = (newName) => {
    isClosing.value = true
    setTimeout(() => (isClosing.value = false), 10)

    try {
      store.editCategoryName(props.category, newName)
    } catch (error) {
      errorText.value = error.message
    }
  }

  // Items logic

  const addNewItem = (newItem) => {
    isClosing.value = true
    setTimeout(() => (isClosing.value = false), 10)

    try {
      store.addItemInCategory(newItem, props.category)
      emits('added')
    } catch (error) {
      errorText.value = error.message
    }
  }

  const deleteItem = () => {
    store.removeItemFromCategory(props.category, props.text)
  }

  const editItem = (newItemName) => {
    isClosing.value = true
    setTimeout(() => (isClosing.value = false), 10)

    try {
      store.editItemInCategory(props.category, newItemName, props.text)
    } catch (error) {
      errorText.value = error.message
    }
  }

  return {
    isAdding,
    isClosing,
    isEditing,
    addNewCategory,
    deleteCategory,
    editCategory,
    addNewItem,
    deleteItem,
    editItem
  }
}

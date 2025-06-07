import { defineStore } from 'pinia'

const defaultValue = {
  lists: JSON.parse(localStorage.getItem('lists')) || []
}

export const useListsStore = defineStore('lists', {
  state: () => defaultValue,
  getters: {
    isThereLists: (state) => !!state.lists?.length,
    isThereItems: (state) => (category) => {
      const list = state.lists.find(list => list.title === category)
      return list.items.length
    }
  },
  actions: {
    update() {
      localStorage.setItem('lists', JSON.stringify(this.lists))
    },
    addItemInCategory(newItem, category) {
      const list = this.lists.find(list => list.title === category)

      if (list.items.includes(newItem)) {
        throw new Error(`Такое поле в этой категории уже существует`)
      }

      list.items.push(newItem)
      this.update()
    },
    removeItemFromCategory(category, text) {
      const list = this.lists.find(list => list.title === category)
      list.items = list.items.filter(item => item !== text)
      this.update()
    },
    editItemInCategory(category, newItemName, oldItemName) {
      const list = this.lists.find(list => list.title === category)

      if (oldItemName === newItemName) return
      if (list.items.includes(newItemName)) {
        throw new Error('Такое поле в этой категории уже существует')
      }

      const idx = list.items.indexOf(oldItemName)
      list.items[idx] = newItemName
      this.update()
    },
    addNewCategory(newCategory) {
      if (this.lists.some(list => list.title === newCategory)) {
        throw new Error('Категория с таким именем уже существует')
      }

      this.lists.push({
        title: newCategory,
        items: []
      })
      this.update()
    },
    deleteCategory(category) {
      this.lists = this.lists.filter(list => list.title !== category)
      this.update()
    },
    editCategoryName(category, newName) {
      if (category === newName) return
      if (this.lists.some(list => list.title === newName)) {
        throw new Error('Категория с таким именем уже существует')
      }

      const list = this.lists.find(list => list.title === category)
      list.title = newName
      this.update()
    },
  }
})

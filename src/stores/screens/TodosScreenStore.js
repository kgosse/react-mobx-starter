import { Store } from 'libx'
import { observable, action, computed } from 'mobx'

// Most of this is plain MobX.
export default class TodosScreenStore extends Store {
  @observable loading = false
  @observable filter = 'ALL'
  @observable text = ''

  @computed
  get todos() {
    // Stores have access to the root store.
    const { todoStore } = this.rootStore
    const { todos } = todoStore
    // Fun fact: collections implement a few Lodash functions,
    // like `filter`, `map` and more.
    switch (this.filter) {
      case 'COMPLETED':
        return todos.filter(x => x.completed)
      case 'INCOMPLETE':
        return todos.filter(x => !x.completed)
      default:
        return todos.slice() // coerce to array
    }
  }

  @action
  setText(text) {
    this.text = text
  }

  @action
  setLoading(loading) {
    this.loading = loading
  }

  @action
  setFilter(filter) {
    this.filter = filter
  }

  // Called by the UI whenever it wants to activate
  // this state from scratch.
  activate() {
    this.setLoading(true)
    this.setText('') // clear the text on activate.
    this.rootStore.todoStore.fetchTodos().then(() => this.setLoading(false))
  }

  addTodo() {
    const text = this.text
    this.setText('') // clear the text
    return this.rootStore.todoStore.addNewTodo(text)
  }

  toggle(todo) {
    this.rootStore.todoStore.toggleCompleted(todo.id, !todo.completed)
  }
}
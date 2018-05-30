class RootStore {
  constructor() {
    // We're gonna need 3 stores.
    // Each store wants a reference to the root store
    // so they can talk to each other, as well as pass it
    // along to our `Todo` and `User` instances.
    this.todoStore = new TodoStore({ rootStore: this })
    this.userStore = new UserStore({ rootStore: this })
    // used for UI state
    this.todosScreenStore = new TodosScreenStore({ rootStore: this })
  }
}

// And we're ready!
const rootStore = new RootStore()
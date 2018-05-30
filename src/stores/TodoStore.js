import { Store } from 'libx';
import Todo from '../models/Todo';

export default class TodoStore extends Store {
  // This is the most powerful part of LibX: Models and Collections.
  // Whenever a `Todo` model is created, the `rootStore` is passed to it.
  todos = this.collection({
    // Whenever we try to add stuff to this collection,
    // transform it to a Todo model.
    model: Todo
  })

  // Fetch todos from our server.
  fetchTodos() {
    return (
      fetch('/api/todos')
        .then(r => r.json())
        // `set` is a MobX action, no need to wrap it.
        // Also, it does not care about `this` context.
        .then(this.todos.set)
        .catch(e => {
          this.todos.set([]);
        })
    )
  }

  addNewTodo(text) {
    return fetch('/api/todos', {
      method: 'post',
      body: JSON.stringify({
        text
      })
    })
      .then(r => r.json())
      .then(this.todos.set) // resolves to a Todo model.
  }

  toggleCompleted(id, completed) {
    return (
      fetch(`/api/todos/${id}`, {
        method: 'patch',
        body: JSON.stringify({
          completed
        })
      })
        .then(r => r.json())
        // resolves to our existing Todo model, because
        // when `set` is called, it recognizes the `id` and sets
        // the new values on the existing todo. Magical!
        .then(this.todos.set)
    )
  }
}
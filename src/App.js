import React, { Component } from 'react';
import { observer } from 'mobx-react'

//components

//styles
import './App.scss';

//modules

@observer
class App extends Component {
  get store() {
    return this.props.rootStore.todosScreenStore
  }

  componentWillMount() {
    this.store.activate()
  }

  render() {
    if (this.store.loading) {
      return <div>Loading todos, please hold...</div>
    }

    return (
      <div>
        <input
          type="text"
          value={this.store.text}
          placeholder="What needs to be done?"
          onChange={e => this.store.setText(e.target.value)}
        />
        <button onClick={() => this.store.addTodo()}>Add</button>
        <ul>
          {this.store.todos.map(todo => (
            <li key={todo.id} onClick={() => this.store.toggle(todo)}>
              <p>
                {todo.text}
                {todo.completed && <span> (COMPLETED)</span>}
              </p>
              <p>- created by {todo.creator.name}</p>
            </li>
          ))}
        </ul>
        <select
          value={this.store.filter}
          onChange={e => this.store.setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="COMPLETED">Completed</option>
          <option value="INCOMPLETE">Incomplete</option>
        </select>
      </div>
    )
  }
}

export default App;

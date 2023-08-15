import React from 'react'
import logo from '/src/logo.svg'
import { TodoList } from './components/TodoList'

export type TodoItemType = {
  id: number
  text: string
  complete: boolean
  update_at: Date
  completed_at: Date
}

export function App() {
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <TodoList />
      </main>
      <footer>
        <p>
          <img src={logo} height="42" alt="logo" />
        </p>
        <p>React project by &copy; 2020 Suncoast Developers Guild</p>
      </footer>
    </div>
  )
}

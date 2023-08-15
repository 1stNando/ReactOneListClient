import React from 'react'
import logo from './logo.svg'
import { TodoList } from './pages/TodoList'
import { Route, Routes } from 'react-router-dom'
import { TodoItemPage } from './pages/TodoItemPage'

export type TodoItemType = {
  id: number | undefined
  text: string
  complete: boolean
  updated_at: Date | undefined
  created_at: Date | undefined
}

export function App() {
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <Routes>
          <Route path="/">
            <TodoList />
          </Route>
          <Route path="/items/:id">
            <TodoItemPage />
          </Route>
          <Route path="*">
            <p>Ooops, that URL not found! 404 </p>
          </Route>
        </Routes>
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

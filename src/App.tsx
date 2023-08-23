import React from 'react'
import logo from './logo.svg'
import { Route, Routes } from 'react-router-dom'
import { TodoList } from './pages/TodoList'
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
          <>
            <Route path="/" element={<TodoList />}></Route>
            <Route path="/items/:id" element={<TodoItemPage />}>
              Details of an item here!
            </Route>
            <Route path="*">
              <p>Oops, that URL not found! 404 </p>
            </Route>
          </>
        </Routes>
      </main>
      <footer>
        <p>
          <img src={logo} height="42" alt="logo" />
        </p>
        <p>React project by &copy; and Fernando.</p>
      </footer>
    </div>
  )
}

import React from 'react'
import logo from './logo.svg'
import { TodoList } from './pages/TodoList'
import { Route, Switch } from 'react-router-dom'

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
        <Switch>
          <Route path="/">
            <TodoList />
          </Route>
          <Route path="*">
            <p>Ooops that URL not found! 404 </p>
          </Route>
        </Switch>
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

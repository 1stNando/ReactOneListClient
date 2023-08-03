import React, { useState } from 'react'
import logo from '/src/logo.svg'

export function App() {
  // Step 2, after static implementation, set the state.
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: 'Do a thing', complete: false },
    { id: 2, text: 'Do something else', complete: false },
    { id: 3, text: 'Do a third thing', complete: false },
    { id: 4, text: 'Remind me about the important thing', complete: false },
  ])
  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <ul>
          <li>Do a thing</li>
          <li>Do something else</li>
          <li>Do a third thing</li>
          <li>Remind me about the important thing</li>
          <li>The important things are the important things</li>
        </ul>
        <form>
          <input type="text" placeholder="Whats up?" />
        </form>
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

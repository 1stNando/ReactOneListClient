import React, { useEffect, useState } from 'react'
import logo from '/src/logo.svg'
import axios from 'axios'

// This is a data driven React App.
export function App() {
  // Step 2, after static implementation, set the state.
  const [todoItems, setTodoItems] = useState([])

  // useEffect has a non-async function
  useEffect(function () {
    // Our async function inside!
    async function fetchListOfItems() {
      console.log('this runs when the component first mounts')
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=cohort26'
      )

      if (response.status === 200) {
        setTodoItems(response.data)
      }
    }
    //
    fetchListOfItems()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>
      <main>
        <ul>
          {todoItems.map(function (todoItem) {
            return (
              <li
                key={todoItem.id}
                className={todoItem.complete ? 'completed' : undefined}
              >
                {todoItem.text}
              </li>
            )
          })}
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

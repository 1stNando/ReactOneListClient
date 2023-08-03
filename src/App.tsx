import React, { useEffect, useState } from 'react'
import logo from '/src/logo.svg'
import axios from 'axios'

type TodoItemType = {
  id: number
  text: string
  complete: boolean
  update_at: Date
  completed_at: Date
}

export function App() {
  // Step 2, after static implementation, set the state.
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  // 2nd state to set. Manages input text from user.
  const [newTodoText, setNewTodoText] = useState('')

  // useEffect has a non-async function, Loads our data ONCE.
  useEffect(function () {
    // Our async function inside!
    async function fetchListOfItems() {
      console.log('this runs when the component first mounts')
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=cohort25'
      )

      if (response.status === 200) {
        setTodoItems(response.data)
        // Adds ability for input text to go away after pressing enter.New item and clear.
        setNewTodoText('')
      }
    }
    //
    fetchListOfItems()
    // Don't forget empty array!
  }, [])

  async function handleCreateNewTodoItem() {
    const body = {
      item: { text: newTodoText },
    }
    console.log(`Time to create a todo: ${newTodoText}`)
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=cohort25',
      body
    )
    if (response.status === 201) {
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=cohort25'
      )

      if (response.status === 200) {
        setTodoItems(response.data)
        // Adds ability for input text to go away after pressing enter.New item and clear.
        setNewTodoText('')
      }
    }
  }

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
        {/* <Form> enables on submit "enter". Subtle but important for input. All forms by default want to be submitted. We need somewhere to submit to... */}
        <form
          onSubmit={function (event) {
            // This says, please form don't do your usual behavior to avoid re-render.
            // I will tell you what to do
            event.preventDefault()
            handleCreateNewTodoItem()
          }}
        >
          <input
            type="text"
            placeholder="Whats up?"
            value={newTodoText}
            onChange={function (event) {
              setNewTodoText(event.target.value)
            }}
          />
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

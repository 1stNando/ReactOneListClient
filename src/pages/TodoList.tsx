import React, { useState } from 'react'
import axios from 'axios'
import { TodoItem } from '../components/TodoItemProps'
import { TodoItemType } from '../App'
import { useQuery } from 'react-query'
//import { TodoItemType } from '../App'

async function getTodos() {
  const response = await axios.get<TodoItemType[]>(
    'https://one-list-api.herokuapp.com/items?access_token=cohort25'
  )
  return response.data
}

export function TodoList() {
  const { data: todoItems = [], refetch } = useQuery('todos', getTodos)

  // Step 2, after static implementation, set the state.
  //const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  // 2nd state to set. Manages input text from user.
  const [newTodoText, setNewTodoText] = useState('')

  // function loadAllTheItems() {
  //   // Our async function inside!Coffee16oz
  //   async function fetchListOfItems() {
  //     const response = await axios.get(
  //       'https://one-list-api.herokuapp.com/items?access_token=cohort25'
  //     )

  //     if (response.status === 200) {
  //       setTodoItems(response.data)
  //       // Adds ability for input text to go away after pressing enter.New item and clear.
  //       setNewTodoText('')
  //     }
  //   }
  //   fetchListOfItems()
  // }

  // Don't forget empty array!
  // useEffect has a non-async function, Loads our data ONCE.
  // useEffect(loadAllTheItems, [])

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
      refetch()

      // This illustrates how to get data back completely instead of appending.
      // const response = await axios.get(
      //   'https://one-list-api.herokuapp.com/items?access_token=cohort25'
      // )

      // if (response.status === 200) {
      //   setTodoItems(response.data)
      //   // Adds ability for input text to go away after pressing enter.New item and clear.
      //   setNewTodoText('')
      // }
    }
  }

  return (
    <React.Fragment>
      <ul>
        {todoItems.map(function (todoItem) {
          return (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              reloadItems={() => refetch}
            />
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
          placeholder="What's on your mind?"
          value={newTodoText}
          onChange={function (event) {
            setNewTodoText(event.target.value)
          }}
        />
      </form>
    </React.Fragment>
  )
}

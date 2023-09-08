import React, { useState } from 'react'
import axios from 'axios'
import { TodoItem } from '../components/TodoItem'
import { TodoItemType } from '../App'
import { useMutation, useQuery } from 'react-query'
//import { TodoItemType } from '../App'

async function getTodos() {
  const response = await axios.get<TodoItemType[]>(
    'https://one-list-api.herokuapp.com/items?access_token=cohort25'
  )
  return response.data
}

// Mutation of data. Part 1.
async function createNewTodoItem(newTodoText: string) {
  const response = await axios.post(
    'https://one-list-api.herokuapp.com/items?access_token=cohort25',
    { item: { text: newTodoText } }
  )
  return response
}

export function TodoList() {
  const { data: todoItems = [], refetch: refetchTodos } = useQuery(
    'todos',
    () => getTodos()
  )

  // Mutation of data, part 2. useMutation hook, that calls the mutation function createNewTodoItem. This way we have a "mutation object" which can be called elsewhere.
  const todoItemMutation = useMutation(
    (newTodoText: string) => createNewTodoItem(newTodoText),
    {
      // options
      onSuccess: function () {
        refetchTodos()

        setNewTodoText('')
      },
      onError: function () {
        // Do something
      },
    }
  )

  // Step 2, after static implementation, set the state.
  //const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  // 2nd state to set. Manages input text from user.
  const [newTodoText, setNewTodoText] = useState('')

  return (
    <React.Fragment>
      <ul>
        {todoItems.map(function (todoItem) {
          return (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              reloadItems={() => refetchTodos()}
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

          todoItemMutation.mutate(newTodoText)
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

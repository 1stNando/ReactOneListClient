import React, { useState } from 'react'
import { TodoItem } from '../components/TodoItem'
import { useMutation, useQuery } from 'react-query'
import { createNewTodoItem, getTodos } from '../api.ts/api'
//import { TodoItemType } from '../App'

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

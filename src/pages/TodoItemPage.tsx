import React from 'react'
import { useParams, useNavigate } from 'react-router'
import { TodoItemType } from '../App'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { deleteOneTodo, getOneTodo } from '../api.ts/api'

// Null Object Pattern
const EmptyTodoItem: TodoItemType = {
  id: undefined,
  text: '',
  complete: false,
  updated_at: undefined,
  created_at: undefined,
}
export function TodoItemPage() {
  // Define the structure of the params. It is an object with one Key named id which is a string.
  const history = useNavigate()

  const params = useParams<{ id: string }>()

  const { data: todoItem = EmptyTodoItem, isLoading } = useQuery(
    ['todo', params.id],
    () => getOneTodo(params.id)
  )

  const deleteMutation = useMutation((id: string) => deleteOneTodo(id), {
    onSuccess: function () {
      // Send the user back to the homepage
      history.push('/')
    },
  })
  // Since the default state has an id that is undefined
  // render NOTHING until there is an id -- that only happens
  // once we load from the API.
  if (isLoading) {
    return null
  }

  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
      {/* <p>Created: {todoItem.created_at}</p>
      <p>Updated: {todoItem.updated_at}</p> */}
      <button
        onClick={function () {
          deleteMutation.mutate(params.id)
        }}
      >
        Delete
      </button>
    </div>
  )
}

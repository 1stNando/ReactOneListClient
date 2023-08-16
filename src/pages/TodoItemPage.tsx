import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router'
import { TodoItemType } from '../App'
import { Link } from 'react-router-dom'

export function TodoItemPage() {
  // Define the structure of the params. It is an object with one Key named id which is a string.
  const history = useHistory()

  const params = useParams<{ id: string }>()

  const [todoItem, setTodoItem] = useState<TodoItemType>({
    id: undefined,
    text: '',
    complete: false,
    created_at: undefined,
    updated_at: undefined,
  })

  useEffect(
    function () {
      async function loadItems() {
        const response = await axios.get(
          'https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort25'
        )
        if (response.status === 200) {
          setTodoItem(response.data)
        }
      }
      loadItems()
    },
    [params.id]
  )

  async function deleteTodoItem() {
    const response = await axios.delete(
      `https://one-list-api.herokuapp.com/items/${params.id}?access_token=cohort25`
    )

    if (response.status === 204) {
      // Redirect to the homepage
      history.push('/')
    }
  }

  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</p>
      <p>Created: {todoItem.created_at}</p>
      <p>Updated: {todoItem.updated_at}</p>
      <button onClick={deleteTodoItem}>Delete</button>
    </div>
  )
}

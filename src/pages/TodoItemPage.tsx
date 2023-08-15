import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { TodoItemType } from '../App'
import axios from 'axios'
import { TodoItem } from '../components/TodoItem'

export function TodoItemPage() {
  // Define the structure of the params. It is an object with one Key named id which is a string.

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

  return (
    <div>
      <p className={todoItem.complete ? 'complete' : ''}>{todoItem.text}</p>
    </div>
  )
}

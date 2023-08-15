import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { TodoItemType } from '../App'
import axios from 'axios'

export function TodoItemPage() {
  // Define the structure of the params. It is an object with one Key named id which is a string.

  const params = useParams<{ id: string }>()

  const [todoItems, setTodoItems] = useState<TodoItemType>({
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
          setTodoItems(response.data)
        }
      }
      loadItems()
    },
    [params.id]
  )

  return <p>This would be the details of item for {params.id}!</p>
}

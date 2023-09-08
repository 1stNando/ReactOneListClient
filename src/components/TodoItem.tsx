import React from 'react'
import axios from 'axios'
import { TodoItemType } from '../App'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'

type TodoItemProps = {
  todoItem: TodoItemType
  reloadItems: () => void
}

async function toggleItemComplete(id: number | undefined, complete: boolean) {
  const response = axios.put(
    `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort25`,
    { item: { complete: !complete } }
  )
  return response
}

// Toggle complete status
export function TodoItem({
  todoItem: { id, text, complete },
  reloadItems,
}: TodoItemProps) {
  const toggleMutation = useMutation(() => toggleItemComplete(id, complete), {
    onSuccess: function () {
      reloadItems()
    },
  })

  return (
    <li className={complete ? 'completed' : undefined}>
      <button
        onClick={function () {
          toggleMutation.mutate()
        }}
      >
        {text}
      </button>

      <Link to={`/items/${id}`}>Show</Link>
    </li>
  )
}

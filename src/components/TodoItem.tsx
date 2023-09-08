import React from 'react'
import { TodoItemType } from '../App'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import { toggleItemComplete } from '../api.ts/api'

type TodoItemProps = {
  todoItem: TodoItemType
  reloadItems: () => void
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

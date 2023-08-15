import React from 'react'
import axios from 'axios'
import { TodoItemType } from './App'

// This component becomes our list item.//////////////////////////
export function TodoItem({
  todoItem: { id, text, complete },
  reloadItems,
}: TodoItemProps): void {
  // Destructuring the props, allows me to treat them like local variables.

  async function toggleCompleteStatus() {
    const response = await axios.put(
      `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort25`,
      { item: { complete: !complete } }
    )
    if (response.status === 200) {
      reloadItems()
    }

    return (
      <li
        className={complete ? 'completed' : undefined}
        onClick={toggleCompleteStatus}
      >
        {text}
      </li>
    )
  }
}
type TodoItemProps = {
  todoItem: TodoItemType
  reloadItems: () => void
}

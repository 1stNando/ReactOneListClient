import React from 'react'
import axios from 'axios'
import { TodoItemType } from '../App'
import { Link } from 'react-router-dom'

type TodoItemProps = {
  todoItem: TodoItemType
  reloadItems: () => void
}

export function TodoItem({
  todoItem: { id, text, complete },
  reloadItems,
}: TodoItemProps) {
  async function toggleCompleteStatus() {
    const response = await axios.put(
      `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort42`,
      { item: { complete: !complete } }
    )

    if (response.status === 200) {
      reloadItems()
    }
  }

  return (
    <li className={complete ? 'completed' : undefined}>
      <span onClick={toggleCompleteStatus}>{text}</span>

      <Link to={`/items/${id}`}>Show</Link>
    </li>
  )
}

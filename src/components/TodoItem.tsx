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
    await axios.put(
      `https://one-list-api.herokuapp.com/items/${id}?access_token=cohort42`,
      { item: { complete: !complete } }
    )

    reloadItems()
  }

  return (
    <li className={complete ? 'completed' : ''} onClick={toggleCompleteStatus}>
      {text}

      <Link to={`/items/${id}`}>Show</Link>
    </li>
  )
}

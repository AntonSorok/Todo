import type {Todo} from '../types/todo'

export interface TodoItemProps {
    todo: Todo
}

import {useTodo} from '../context/TodoContext.tsx'
import {TodoActionType} from "../utils/constants.ts";
import React from 'react'

export const TodoItem: React.FC<TodoItemProps> = ({todo}) => {
    const {dispatch} = useTodo();

    const handleToggle = () => {
        dispatch({type: TodoActionType.TOGGLE_STATUS, payload: todo.id});
    };

    const handleRemove = () => {
        dispatch({type: TodoActionType.REMOVE, payload: todo.id});
    };

    return (
        <li
            className={`flex item-center justify-between p-2 my-1 rounded border 
            ${todo.status === 'done' ? 'bg-green-100 line-through' : ''}
            ${todo.status === 'in-progress' ? 'bg-yellow-100' : ''}
            `}
        >
            <span onClick={handleToggle} className={`cursor-pointer flex-1`}>
                {todo.text}
            </span>
            <button onClick={handleRemove} className={`ml-4 px-2 py-1 border rounded hover:bg-red-200`}
                    aria-label='Удалить задачу'>&times;
            </button>
        </li>
    );
};
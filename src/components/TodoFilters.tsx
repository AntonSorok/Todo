import React from 'react'
import {useTodo} from "../context/TodoContext.tsx";
import {TodoActionType} from "../utils/constants.ts";
import type {Filter} from '../types/todo.ts'

const FILTERS: Filter[] = ['all', 'todo', 'in-progress', 'done'];

export const TodoFilter: React.FC = () => {
    const {state, dispatch} = useTodo();
    const {filter} = state;

    return (
        <div className={`flex justify-center space-x-2 my-4`}>
            {FILTERS.map(f => (
                <button
                    key={f}
                    onClick={() => dispatch({type: TodoActionType.SET_FILTER, payload: f})}
                    className={`px3- py-1 border rounded 
                    ${filter === f ? 'bg-blue-200' : 'hover:bg-gray-100'}
                    `}
                >
                    {f === 'all' ? 'Все' : f === 'todo' ? 'В очереди' : f === 'in-progress' ? 'В работе' : 'Выполнено'}
                </button>))}
        </div>
    );
};
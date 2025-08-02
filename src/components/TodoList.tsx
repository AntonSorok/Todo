import React, {} from 'react'
import {useTodo} from "../context/TodoContext.tsx";
import {TodoItem} from "./TodoItem.tsx";
// import type {Todo} from "../types/todo.ts";


export const TodoList: React.FC = () => {
    const {state} = useTodo();
    const {todos, filter} = state
    const filtered = todos.filter(todo => filter === 'all' ? true : todo.status === filter);

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)


    if (filtered.length === 0) {
        return <p className={`text-center py-4 text-gray-500`}>Нет задач</p>
    }

    return (
        <ul className={`list-none p-0`}>
            {filtered.map(todo => (
                <TodoItem key={todo.id} todo={todo}/>
            ))}
        </ul>
    );
};
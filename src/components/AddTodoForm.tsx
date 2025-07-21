import React, {useState} from 'react'
import {useTodo} from '../context/TodoContext.tsx'
import {useAuth} from '../context/AuthContext.tsx'

export const AddTodoForm: React.FC = () => {
    const [text, setText] = useState('');
    const {currentUser} = useAuth()
    const {addTodo} = useTodo()

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = text.trim()
        if (!trimmed || !currentUser) return;
        await addTodo(trimmed)
        setText('')

    }
    
    return (
        <form
            onSubmit={handleAdd}
            className={`flex mb-4`}>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.currentTarget.value)}
                className={`flex-1 border rounded-l px-2 py-1`}
                placeholder={`Новая задача...`}
            />
            <button
                type='submit'
                className={`px-4 py-1 border rounded-r bg-green-300 hover:bg-green-400`}
            >Добавить задачу
            </button>
        </form>
    )
}

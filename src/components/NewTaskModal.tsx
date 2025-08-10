import React, {useState, useEffect} from 'react'
import {useTodo} from "../context/TodoContext.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import {extractLabelsFromDescription, removeLabelsFromDescription} from '../utils/extractLabels'
import type {Todo, TodoStatus} from "../types/todo.ts";
import {getDeadlineCountdown} from '../utils/date.ts'
import Button from "./Button.tsx";

type Props = {
    onClose: () => void;
    todo?: Todo | null;
}


export const NewTaskModal = ({onClose, todo}: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState<TodoStatus>('todo')
    const {currentUser} = useAuth()
    const {addTodo, updateTodo} = useTodo()


    useEffect(() => {
        if (todo) {
            const labelsStr = todo.labels?.map(label => `#${label}`).join('') || '';
            const fullDescription = (todo.description || '') + (labelsStr ? '' + labelsStr : '')

            setTitle(todo.text);
            setDescription(fullDescription.trim())
            setCategoryId(todo.categoryId || '');
            setDeadline(todo.deadline ? new Date(todo.deadline).toISOString().split('T')[0] : '')
            setStatus(todo.status || 'todo')
        } else {
            setTitle('');
            setDescription('')
            setCategoryId('')
            setDeadline('')
            setStatus('todo')
        }
    }, [todo])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmedTitle = title.trim()
        const rawLabels = extractLabelsFromDescription(description)
        const cleanDescription = removeLabelsFromDescription(description)

        if (!trimmedTitle || !currentUser) return

        const payload = {
            text: trimmedTitle,
            description: cleanDescription,
            categoryId,
            deadline: deadline ? new Date(deadline).getTime() : null,
            labels: rawLabels,
            status
        }

        if (todo) {
            await updateTodo(todo.id, payload)
        } else {
            await addTodo(trimmedTitle, payload);
        }

        // setTitle('');
        // setDeadline('');
        // setCategoryId('');
        // setDescription('');
        onClose();
    };

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 bg-black/60  flex items-center justify-center z-50`}>
            <div onClick={(e) => e.stopPropagation()}
                 className={`bg-linear-[130deg,#371559,#7C1ED9_15%,#7C1ED9_50%,#3D1673_90%,#371559] w-full max-w-screen-md rounded-2xl p-5 relative flex flex-col gap-4 mx-4`}>
                <button className={`absolute right-4 top-2  text-white text-2xl`} onClick={onClose}>x</button>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-[65%] flex flex-col gap-4">
                        <input
                            className={`p-2 border rounded-xl bg-white`}
                            type="text"
                            placeholder="Название задачи"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea
                            className={`p-2 rounded-xl border bg-white min-h-[120px]`}
                            name="Описание"
                            rows={5}
                            placeholder='Описание задачи'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        {description && extractLabelsFromDescription(description).length > 0 && (
                            <div className={`flex flex-wrap gap-1`}>
                                {extractLabelsFromDescription(description).map((label) => (
                                    <span
                                        key={label}
                                        className={`bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full`}
                                    >
                                        #{label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 justify-between md:w-[35%]">
                        <div className="flex flex-col gap-2">
                            <select
                                className={`bg-white rounded-xl border p-2 text-sm`}
                                value={categoryId}
                                onChange={e => setCategoryId(e.target.value)}
                            >
                                <option value="">Без категории</option>
                                <option value="home">Дом</option>
                                <option value="work">Работа</option>
                            </select>
                            <input
                                className={`bg-white rounded-xl border p-2 text-sm`}
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                            />
                            {deadline && (<span className={`text-sm text-gray-600 mt-1`}>
                                {getDeadlineCountdown(deadline ? new Date(deadline).getTime() : null)}
                                {/*ПОчинить*/}
                            </span>)}
                            <select
                                className={`bg-white rounded-xl border p-2 text-sm`}
                                value={status || 'todo'}
                                onChange={(e) => {
                                    setStatus(e.target.value as TodoStatus)
                                }}
                                disabled={!todo}
                            >
                                <option value="todo">В очереди</option>
                                <option value="in-progress">В работе</option>
                                <option value="done">Готово</option>
                            </select>
                        </div>
                        <Button type={'submit'} variant={'primary'}>
                            {todo ? 'Изменить' : 'Добавить'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}


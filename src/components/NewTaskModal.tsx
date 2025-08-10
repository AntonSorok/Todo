import React, {useState, useEffect} from 'react'
import {useTodo} from "../context/TodoContext.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import {extractLabelsFromDescription, removeLabelsFromDescription} from '../utils/extractLabels'
import type {Todo, TodoStatus} from "../types/todo.ts";
import {getDeadlineCountdown} from '../utils/date.ts'
import Button from "./Button.tsx";
import {Calendar, Tag} from "lucide-react";

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
                 className={` bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-2xl mx-4 w-full  space-y-4 z-10 flex flex-col gap-4`}>
                <button className={`absolute right-2 top-0  text-2xl`} onClick={onClose}>x</button>
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-[65%] flex flex-col gap-4">
                        <input
                            className={`input-auth`}
                            type="text"
                            placeholder="Название задачи"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea
                            className={`input-auth`}
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
                                        className={`flex items-center gap-1 px-2 py-1 h-6 bg-purple-200/80 text-gray-600 text-xs rounded-full`}
                                    >
                                        <Tag size={12}/>
                                        {label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-3 justify-between md:w-[35%]">
                        <div className="flex flex-col gap-2">
                            <select
                                className={`input-auth`}
                                value={categoryId}
                                onChange={e => setCategoryId(e.target.value)}
                            >
                                <option value="">Без категории</option>
                                <option value="home">Дом</option>
                                <option value="work">Работа</option>
                            </select>
                            <input
                                className={`input-auth`}
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                            />
                            {deadline && (
                                <span
                                    className={`flex items-center gap-1 text-sm text-white`}>
                                  <Calendar size={16}/>
                                    {getDeadlineCountdown(deadline ? new Date(deadline).getTime() : null)}
                                    {/*ПОчинить*/}
                            </span>)}
                            <select
                                className={`input-auth`}
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


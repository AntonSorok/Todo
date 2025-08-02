import React, {useState, useEffect} from 'react'
import {useTodo} from "../context/TodoContext.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import {extractLabelsFromDescription} from '../utils/extractLabels'
import type {Todo} from "../types/todo.ts";

type Props = {
    onClose: () => void;
    todo?: Todo | null;
}


export const NewTaskModal = ({onClose, todo}: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [deadline, setDeadline] = useState('');
    const {currentUser} = useAuth()
    const {addTodo, updateTodo} = useTodo()


    useEffect(() => {
        if (todo) {
            setTitle(todo.text);
            setDescription(todo.description || '')
            setCategoryId(todo.categoryId || '');
            setDeadline(todo.deadline ? new Date(todo.deadline).toISOString().split('T')[0] : '')
        } else {
            setTitle('');
            setDescription('')
        }
    }, [todo])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmedTitle = title.trim()

        if (!trimmedTitle || !currentUser) return

        if (todo) {
            await updateTodo(todo.id, {
                text: trimmedTitle,
                description,
                categoryId,
                deadline: deadline ? new Date(deadline).getTime() : null,
                labels: extractLabelsFromDescription(description)
            })
        } else {
            await addTodo(trimmedTitle, {
                description,
                categoryId,
                deadline: deadline ? new Date(deadline).getTime() : null,
                labels: extractLabelsFromDescription(description)
            });
        }

        setTitle('');
        setDeadline('');
        setCategoryId('');
        setDescription('');
        onClose();
    };

    return (
        <div className={`fixed inset-0 bg-black/60  flex items-center justify-center z-50`}>
            <div onClick={(e) => e.stopPropagation()}
                 className={`m-auto w-lg p-5 border rounded-2xl relative flex flex-col gap-3 bg-linear-[130deg,#371559,#7C1ED9_15%,#7C1ED9_50%,#3D1673_90%,#371559]`}>
                <button className={`absolute right-3 top-1 `} onClick={onClose}>x</button>
                <form onSubmit={handleSubmit} className="flex gap-4 justify-between">
                    <div className="w-[70%] flex flex-col gap-4 overflow-hidden">
                        <input
                            className={`p-2 border rounded-2xl bg-white`}
                            type="text"
                            placeholder="Название задачи"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <textarea
                            className={`p-2 rounded-2xl border bg-white`}
                            name="Описание"
                            rows={5}
                            placeholder='Описание задачи'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex flex-col justify-between w-[30%] pr-3">
                        <div className="flex flex-col gap-2">
                            <select
                                className={`bg-white rounded-2xl border p-2 text-sm`}
                                value={categoryId}
                                onChange={e => setCategoryId(e.target.value)}
                            >
                                <option value="">Без категории</option>
                                <option value="home">Дом</option>
                                <option value="work">Работа</option>
                            </select>
                            <input
                                className={`bg-white rounded-2xl border p-2 text-sm`}
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                            />
                        </div>
                        <button className={`text-lg py-2 border-2 border-[#7C1BA6] rounded-2xl bg-[#8A22F2]
                        hover:bg-[#3D1673] hover:border-[#7C1BA6] active:bg-[#371559]`}
                                type='submit'>{todo ? 'Изменить' : 'Добавить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


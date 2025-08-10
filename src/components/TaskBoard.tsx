import {useTodo} from "../context/TodoContext.tsx";
import {TaskCard} from "./TaskCard.tsx";
import {NewTaskModal} from "./NewTaskModal.tsx";
import {useState} from "react";
import type {Todo} from "../types/todo.ts";

const statusColumns = [
    {id: 'todo', label: 'В очереди'},
    {id: 'in-progress', label: 'В работе'},
    {id: 'done', label: 'Готово'},
] as const;

export const TaskBoard = () => {
    const {state} = useTodo();
    const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (task: Todo) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    }

    return (
        <>
            <div
                className={`bg-white/70 h-full min-h-[500px] pb-5 mx-4 mt-8 p-4 border rounded-xl shadow-2xl shadow-black`}>
                <h1 className={`text-2xl font-bold mb-4`}>Todo 'Pro'</h1>
                <div
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
                    {statusColumns.map(({id, label}) => (
                        <div key={id}>
                            <h2 className={`text-lg font-bold mb-2`}>{label}</h2>
                            <div className={`space-y-2`}>
                                {state.todos
                                    .filter((t) => t.status === id)
                                    .map((task) => (
                                        <TaskCard key={task.id} task={task} onClick={() => handleCardClick(task)}/>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && selectedTask && (
                    <NewTaskModal
                        onClose={() => setIsModalOpen(false)}
                        todo={selectedTask}
                    />
                )}
            </div>
        </>
    )
}
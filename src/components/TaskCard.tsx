import type {Todo} from "../types/todo.ts"
import {getDeadlineCountdown} from "../utils/date.ts";
import {Calendar, Tag, Folder} from "lucide-react";
import React, {useState} from "react"; // иконки

type Props = {
    task: Todo;
    onClick: () => void;
}


export const TaskCard = ({task, onClick}: Props) => {
    const [showCountdown, setShowCountdown] = useState(false)

    const toggleDeadLineView = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowCountdown((prev) => !prev)
    }
    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-2xl shadow-md p-4 space-y-3 border border-gray-200 hover:scale-101`}
        >
            <div className="flex items-center text-sm text-gray-500 gap-1">
                {<Folder size={16}/>}
                <span>{task.categoryId}</span>
            </div>
            <div className={``}>
                <h3 className={`card-text-title overflow-hidden text-ellipsis`}>{task.text}</h3>
                <p className={`card-text-desc white-space-nowrap pb-2`}>{task.description}</p>
                <div className={`flex gap-2 justify-between`}>
                    {task.labels.length > 0 && (
                        <div className={`flex gap-1 flex-wrap`}>
                            {task.labels.map((label) => (
                                <span
                                    key={label}
                                    className={`flex items-center gap-1 px-2 py-1 h-6 bg-purple-200/80 text-purple-800 text-xs rounded-full`}
                                    style={{backgroundColor: task.labelsColor}}>
                                <Tag size={12}/>
                                    {label}
                            </span>
                            ))}

                        </div>
                    )}
                    <div
                        className={`flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-purple-600 transition`}>
                        {task.deadline && (
                            <div
                                onClick={toggleDeadLineView}
                                className={`flex gap-2`}>
                                <Calendar size={16}/>
                                {showCountdown
                                    ? getDeadlineCountdown(task.deadline)
                                    : new Date(task.deadline).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
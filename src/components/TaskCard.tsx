import type {Todo} from "../types/todo.ts"
import {getDeadlineCountdown} from "../utils/date.ts";

type Props = {
    task: Todo;
    onClick: () => void;
}


export const TaskCard = ({task, onClick}: Props) => {
    return (
        <div
            onClick={onClick}
            className={`bg-white dark:bg-gray-800 p-4 rounded shadow hover:bg-gray-100 transition cursor-pointer`}
        >
            <h3 className={`font-medium`}>{task.text}</h3>
            <p className={`font-light`}>{task.description}</p>

            <div className={`text-sm text-gray-500 mt-1`}>
                {task.deadline && (
                    <div>⏰ {new Date(task.deadline).toLocaleDateString()}</div>
                )}
            </div>
            {task.labels.length > 0 && (
                <div className={`flex gap-1 mt-2 flex-wrap`}>
                    {task.labels.map((label) => (
                        <span
                            key={label}
                            className={`text-xs rounded px-2 py-0.5`}
                            style={{backgroundColor: task.labelsColor}}>
                        #{label}
                    </span>
                    ))}
                    <span>{getDeadlineCountdown(task.deadline)}</span>
                </div>
            )}
        </div>
    )
}
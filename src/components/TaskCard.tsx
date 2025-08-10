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
            className={`card drop-shadow-xl shadow-black hover:scale-101`}
        >
            <div className={``}>
                <h3 className={`card-text-title`}>{task.text}</h3>
                <p className={`card-text-desc white-space-nowrap overflow-auto pb-2`}>{task.description}</p>
            </div>


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
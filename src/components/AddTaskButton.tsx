// import React from 'react'

export const AddTaskButton = ({onClick}: { onClick: () => void }) => (
    <button onClick={onClick} className={`btn btn-primary`}>Добавить задачу</button>
)
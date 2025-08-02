import {useState} from "react";
import {NewTaskModal} from './NewTaskModal.tsx'

export const NewTaskButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = () => setIsOpen(!isOpen)

    return (
        <div
            onClick={toggleModal}
            className="absolute right-10 bottom-15 w-15 h-15 bg-red-500 rounded-[50%] flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill='#FFFFFF'>
                    <path
                        d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm4 10h-3v3.13c0 .48-.39.88-.88.88h-.25c-.48-.01-.87-.4-.87-.88V13H8c-.55 0-1-.45-1-1s.45-1 1-1h3V7.88c0-.49.39-.88.88-.88h.25c.48 0 .87.39.87.88V11h3c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
                </g>
            </svg>
            {isOpen && <NewTaskModal onClose={toggleModal}/>}
        </div>
    )
}
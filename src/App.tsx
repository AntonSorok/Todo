import React, {useState} from 'react'
import {TodoList} from "./components/TodoList.tsx";
import {TodoFilter} from "./components/TodoFilters.tsx";
import {useTodo} from "./context/TodoContext.tsx";
import {TodoActionType} from "./utils/constants.ts";

function App() {
    const [text, setText] = useState('');
    const {dispatch} = useTodo();
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({type: TodoActionType.ADD, payload: text.trim()});
        setText('');
    };
    return (
        <div className={`max-w-md mx-auto mt-8 p-4 border roudned`}>
            <h1 className={`text-2xl font-bold mb-4`}>Todo 'Pro'</h1>
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

            <TodoFilter/>
            <TodoList/>
        </div>
    );
}

export default App

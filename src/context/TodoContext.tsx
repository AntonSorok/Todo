import React, {createContext, useContext, useReducer, useEffect} from "react";
import type {ReactNode} from "react";
import type {Filter, Todo} from '../types/todo'
import {type TodoAction, TodoActionType} from "../utils/constants.ts";
import {todosCollection, db} from "../firebase.ts";
import {
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from 'firebase/firestore';

export interface TodoState {
    todos: Todo[];
    filter: Filter;
}

const initialState: TodoState = {
    todos: [],
    filter: 'all',
};

const TodoContext = createContext<{
    state: TodoState;
    dispatch: React.Dispatch<TodoAction>;
}>({state: initialState, dispatch: () => null})

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
    switch (action.type) {
        case TodoActionType.SET_ALL:
            return {...state, todos: [action.payload]};
        case TodoActionType.ADD:
            return {...state, todos: [action.payload, ...state.todos]};
        case TodoActionType.REMOVE:
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.payload),
            };
        case TodoActionType.TOGGLE_STATUS:
            return {
                ...state,
                todos: state.todos.map(t => t.id === action.payload ? {...t, status: nextStatus(t.status)} : t)
            };
        case TodoActionType.SET_FILTER:
            return {...state, filter: action.payload}
        default:
            return state
    }
}

// Переход к следующему статусу

const nextStatus = (status: Todo['status']): Todo['status'] => {
    if (status === 'todo') return 'in-progress';
    if (status === 'in-progress') return 'done';
    return 'todo'
}

export const TodoProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        const unsubscribe = onSnapshot(todosCollection, snapshot => {
            const data: Todo[] = [];
            snapshot.forEach(doc => {
                data.push({id: doc.id, ...(doc.data() as Omit<Todo, 'id'>)});
            });
            dispatch({type: TodoActionType.SET_ALL, payload: data})
        });
        return () => unsubscribe()
    }, []);


    const addTodo = async (text: string) => {
        const newTodo: Omit<Todo, 'id'> = {
            text,
            status: 'todo',
            createAt: Date.now(),
        };
        await addDoc(todosCollection, newTodo)
    };
    const removeTodo = async (id: string) => {
        await deleteDoc(doc(db, 'todos', id))
    };
    const toggleStatus = async (id: string) => {
        const todo = state.todos.find(t => t.id === id);
        if (!todo) return;
        await updateDoc(doc(db, 'todos', id), {
            status: nextStatus(todo.status),
        });
    }
//     dispatch для мутаций через firebase
    const enhancedDispatch = (action: TodoAction) => {
        switch (action.type) {
            case TodoActionType.ADD:
                return addTodo(action.payload);
            case TodoActionType.REMOVE:
                return removeTodo(action.payload);
            case TodoActionType.TOGGLE_STATUS:
                return toggleStatus(action.payload);
            case TodoActionType.SET_FILTER:
                return dispatch(action);
            default:
                return dispatch(action)
        }
    }


    return (
        <TodoContext.Provider value={{state, dispatch: enhancedDispatch}}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => useContext(TodoContext)
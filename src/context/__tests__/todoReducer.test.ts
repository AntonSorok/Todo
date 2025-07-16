import {todoReducer, type TodoState} from '../TodoContext.tsx'
import {type TodoAction, TodoActionType} from "../../utils/constants.ts";
import type {Todo} from '../../types/todo'

describe('todoReducer', () => {
    const initialState: TodoState = {
        todos: [],
        filter: 'all'
    };

    const sampleTodo: Omit<Todo, 'id'> = {
        text: 'Test task',
        status: 'todo',
        createAt: 123
    };

    it('должен добавлять новую задачу (ADD)', () => {
        const action = {
            type: TodoActionType.ADD,
            payload: {id: '1', ...sampleTodo},
        };
        const state = todoReducer(initialState, action);
        expect(state.todos).toHaveLength(1);
        expect(state.todos[0].text).toBe('test task');
    });

    it('должен удалять задачу по ID (REMOVE)', () => {
        const populated: TodoState = {
            ...initialState,
            todos: [{id: '1', ...sampleTodo}],
        }
        const action = {type: TodoActionType.REMOVE, payload: '1'};
        const state = todoReducer(populated, action);
        expect(state.todos).toHaveLength(0);
    });

    it('должен переключать статус задачи (TOGGLE_STATUS)', () => {
        const t: Todo = {id: '1', ...sampleTodo};
        const populated: TodoState = {...initialState, todos: [t]};
        const action = {type: TodoActionType.TOGGLE_STATUS, payload: '1'};
        const state = todoReducer(populated, action);
        expect(state.todos[0].status).toBe('in-progress');
    });

    it('должен устанавливать фильтр (SET_FILTER)', () => {
        const action = {type: TodoActionType.SET_FILTER, payload: 'done' as const};
        const state = todoReducer(initialState, action);
        expect(state.filter).toBe('done')
    });

    it('при неизвестном действии возращает тот же state', () => {
        const state = todoReducer(initialState, {type: 'UNKNOWN'} as unknown as TodoAction);
        expect(state).toEqual(initialState)
    })
})
export enum TodoActionType {
    ADD = 'ADD',
    REMOVE = 'REMOVE',
    TOGGLE_STATUS = 'TOGGLE_STATUS',
    SET_FILTER = 'SET_FILTER',
    SET_ALL = 'SET_ALL'
}

export interface TodoAction {
    type: TodoActionType;
    payload?: any;
}
export type TodoStatus = 'todo' | 'in-progress' | 'done';

export interface Todo {
    id: string;
    text: string;
    status: TodoStatus;
    createAt: number;
    userId: string
}

export type Filter = 'all' | TodoStatus
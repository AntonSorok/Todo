export type TodoStatus = 'todo' | 'in-progress' | 'done';

export interface Todo {
    id: string;
    text: string;
    status: TodoStatus;
    createAt: number;
    userId: string;
    labels: string[];
    description: string;
    categoryId: string;
    deadline: number | null;
    labelsColor: string;
}

export interface Label {
    id: string;
    name: string;
    color: string;
    userId: string;
}

export interface Category {
    id: string;
    name: string;
    userId: string;
}

export type Filter = 'all' | TodoStatus
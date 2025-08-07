import {useAuth} from "./context/AuthContext.tsx";
import AuthForm from './components/AuthForm.tsx'
// import {TodoList} from "./components/TodoList.tsx";
// import {TodoFilter} from "./components/TodoFilters.tsx";
// import {AddTodoForm} from "./components/AddTodoForm.tsx";
import {TodoProvider} from "./context/TodoContext.tsx";
import {NewTaskButton} from "./components/NewTaskButton.tsx";
import './index.css'
import Header from "./components/Header.tsx";
import {TaskBoard} from "./components/TaskBoard.tsx";

// import {NewTaskModal} from "./components/NewTaskModal.tsx";


function App() {
    const {currentUser, loading} = useAuth()

    if (loading) {
        return <div className={`text-center mt-8`}>Загрузка...</div>
    }

    if (!currentUser) {
        return <AuthForm/>
    }

    return (
        <div className={`gradient-bg`}>
            <TodoProvider>
                <Header/>
                {/*<NewTaskModal/>*/}
                <div
                    className={`taskBoard-bg h-full min-h-[500px] pb-5 mx-4 mt-8 p-4 border rounded-xl`}>
                    <h1 className={`text-2xl font-bold mb-4`}>Todo 'Pro'</h1>
                    {/*<AddTodoForm/>*/}
                    {/*<TodoFilter/>*/}
                    {/*<TodoList/>*/}
                    <TaskBoard/>
                </div>
                <NewTaskButton/>
            </TodoProvider>
        </div>


    );
}

export default App

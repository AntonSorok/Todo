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
        <div className={`gradient-bg min-h-screen h-full pb-4`}>
            <TodoProvider>
                <Header/>
                {/*<NewTaskModal/>*/}

                {/*<AddTodoForm/>*/}
                {/*<TodoFilter/>*/}
                {/*<TodoList/>*/}
                <TaskBoard/>

                <NewTaskButton/>
            </TodoProvider>
        </div>


    );
}

export default App

import {useAuth} from "./context/AuthContext.tsx";
import AuthForm from './components/AuthForm.tsx'
import {TodoList} from "./components/TodoList.tsx";
import {TodoFilter} from "./components/TodoFilters.tsx";
import LogoutButton from "./components/LogoutButton.tsx";
import {AddTodoForm} from "./components/AddTodoForm.tsx";
import {TodoProvider} from "./context/TodoContext.tsx";


function App() {
    const {currentUser, loading} = useAuth()

    if (loading) {
        return <div className={`text-center mt-8`}>Загрузка...</div>
    }

    if (!currentUser) {
        return <AuthForm/>
    }

    return (
        <TodoProvider>
            <div className={`max-w-md mx-auto mt-8 p-4 border roudned`}>
                <LogoutButton/>
                <h1 className={`text-2xl font-bold mb-4`}>Todo 'Pro'</h1>
                <AddTodoForm/>
                <TodoFilter/>
                <TodoList/>
            </div>
        </TodoProvider>

    );
}

export default App

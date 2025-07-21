import {useState} from 'react'
import {auth} from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {useAuth} from '../context/AuthContext.tsx'

const AuthForm = () => {
    const {currentUser} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password)
            } else {
                await signInWithEmailAndPassword(auth, email, password)
            }
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleLogout = async () => {
        await signOut(auth)
    }

    if (currentUser) {
        return (
            <div className={`auth-logged-in`}>
                <p>Вы вошли как: {currentUser.email}</p>
                <button onClick={handleLogout}>Выйти</button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={`auth-form`}>
            <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>

            {error && <p className={`error`}>{error}</p>}

            <input type="email"
                   placeholder='Email'
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   required
            />

            <input type="password"
                   placeholder='пароль'
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   required
            />

            <button type="submit">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>

            <p onClick={() => setIsRegistering(!isRegistering)} className={`toggle`}>
                {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта? Зарегистрируйтесь'}
            </p>
        </form>
    )
}

export default AuthForm
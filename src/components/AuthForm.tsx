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
            <div className={`flex flex-col items-center justify-center min-h-screen gradient-bg text-white`}>
                <p className={`mb-4`}>Вы вошли как: {currentUser.email}</p>
                <button
                    className={`btn-primary hover:btn-primary-hover`}
                    onClick={handleLogout}>Выйти
                </button>
            </div>
        )
    }

    return (
        <div className={`fixed inset-0 animated-bg  flex items-center justify-center z-50`}>
            <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm`}></div>
            <form onSubmit={handleSubmit}
                  className={`relative bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-sm w-full text-white space-y-4 z-10 flex flex-col gap-4`}>
                <h2 className={`text-2xl font-bold text-center`}
                >{isRegistering ? 'Регистрация' : 'Вход'}</h2>

                {error && <p className={`error`}>{error}</p>}
                <div className={`flex flex-col gap-4`}>
                    <input type="email"
                           placeholder='Email'
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           required
                           className={`input-auth`}
                    />
                    <input id={`password`}
                           type="password"
                           placeholder='Пароль'
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           required
                           className={`input-auth`}
                    />
                </div>


                <button
                    className={'btn-primary hover:btn-primary-hover w-50 self-center font-bold text-l'}
                    type="submit">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>

                <p className={``}>
                    {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
                    <span
                        onClick={() => setIsRegistering(!isRegistering)}
                        className={`pl-3 hover:text-[#fda085] hover:cursor-pointer`}>
                         {isRegistering ? 'Войдите' : 'Зарегистрируйтесь'}
                    </span>
                </p>

            </form>
        </div>

    )
}

export default AuthForm
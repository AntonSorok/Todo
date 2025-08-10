import {useState} from 'react'
import {signOut} from 'firebase/auth'
import {auth} from '../firebase'


const LogoutButton = () => {
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        if (!auth.currentUser) return
        setLoading(true)
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Error with enter', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            aria-label={'Выйти из аккаунта'}
            className={`btn-primary hover:btn-primary-hover text-l w-25 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {loading ? 'Выход...' : 'Выйти'}</button>
    );
};

export default LogoutButton;
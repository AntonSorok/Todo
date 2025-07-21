import {signOut} from 'firebase/auth'
import {auth} from '../firebase'


const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Error with enter', error)
        }
    }

    return (
        <button
            onClick={handleLogout}
            className={`absolute top-4 right-4 text-sm px-3 py-1 bg-red-300 hover:bg-red-400 rounded`}
        >
            Выйти</button>
    );
};

export default LogoutButton;
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA-iaQZwwajxzCzPcQn2PvPR9xS8zq1MCA",
    authDomain: "react-todo-app-3d72b.firebaseapp.com",
    projectId: "react-todo-app-3d72b",
    storageBucket: "react-todo-app-3d72b.firebasestorage.app",
    messagingSenderId: "577532689686",
    appId: "1:577532689686:web:a41f148134536600ace437",
    measurementId: "G-54HDYKGPHX"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const todosCollection = collection(db, 'todos')

export const auth = getAuth(app)

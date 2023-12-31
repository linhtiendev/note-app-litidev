import { Outlet, createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import AuthProvider from '../context/AuthProvider'
import ProtectedRoute from './ProtectedRoute'
import ErrorPage from '../pages/ErrorPage'
import NoteList from '../components/NoteList'
import Note from '../components/Note'

const AuthLayout = () => {
    // Oulet -> sẽ render 1 trong những children dựa vào path
    return <AuthProvider><Outlet /></AuthProvider>
}

export default  createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />, // hiện khi dùng dường dẫn chưa định nghĩa
        children: [
            {
                element: <Login />,
                path: "/login",
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <Home />,
                        path: "/",
                        children: [
                            {
                                element: <NoteList />,
                                path: `folders/:folderId`,
                                children: [
                                    {
                                        element: <Note />,
                                        path: `note/:noteId`
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]) 


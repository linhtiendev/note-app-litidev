import { Outlet, createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'

const AuthLayout = () => {
    // Oulet -> sẽ render 1 trong những children dựa vào path
    return <Outlet />
}

export default  createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                element: <Login />,
                path: "/login",
            },
            {
                element: <Home />,
                path: "/",
            }
        ]
    }
]) 


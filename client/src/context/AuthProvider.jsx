import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    // sd event from Firebase
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged((user) => {
            console.log("check user", { user });
            if (user?.uid) {
                setUser(user);
                localStorage.setItem('accessToken', user.accessToken);
                return;
            }
        });
        // reset user info
        setUser({});
        localStorage.clear();
        navigate('/login');

        // cleanup function
        return () => {
            unsubscribe();
        };
    }, [auth]);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

import {useState, useContext, createContext, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userAlmacenado = localStorage.getItem('usuarioLogueado');
        if (userAlmacenado) {
            setUser(JSON.parse(userAlmacenado));
        }
    }, [])


    const login = (userData) => {
        localStorage.setItem('usuarioLogueado', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('usuarioLogueado');
        setUser(null);
    };

    const isAuthenticated = !!user;



    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
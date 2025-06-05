import {useState, useContext, createContext, useEffect} from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Intentar obtener datos de la cookie primero
                const response = await fetch('http://localhost:8000/verificar-sesion/', {
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const sessionData = await response.json();
                    console.log('Datos de sesión:', sessionData);
                    setUser(sessionData);
                } else {
                    console.log('No hay sesión activa');
                    // Si no hay cookie, limpiar el estado
                    setUser(null);
                }
            } catch (error) {
                console.error('Error al inicializar auth:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (userData) => {
        try {
            console.log('Login data received:', userData);

            // Asegurarnos de que tengamos la estructura correcta
            const userToStore = {
                access_token: userData.access_token,
                token_type: userData.token_type,
                user: {
                    ...userData.user,
                    rol: userData.user.rol || "Estudiante"
                }
            };

            console.log('Storing user data:', userToStore);

            // Guardar en localStorage
            localStorage.setItem('usuarioLogueado', JSON.stringify(userToStore));

            // Actualizar estado
            setUser(userToStore);

            // Configurar axios
            if (userToStore.access_token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userToStore.access_token}`;
            }

            return true;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('usuarioLogueado');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        } catch (error) {
            console.error('Error en logout:', error);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

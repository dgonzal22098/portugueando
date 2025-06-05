import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { userData, setUserData } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const response = await fetch('http://localhost:8000/verificar-sesion/', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    verificarSesion();
  }, [setUserData]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!userData) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

import {Navigate} from "react-router-dom"
import {useAuth} from "../../auth"

const ProtectedRoute = ({children}) => {
    const {user, isAuthenticated} = useAuth();

    console.log('ProtectedRoute - Auth State:', {
        isAuthenticated,
        user
    });

    if (!isAuthenticated) {
        console.log('No autenticado, redirigiendo a login');
        return <Navigate to="/"/>;
    }

    console.log('Usuario autenticado, permitiendo acceso');
    return children;
}

export default ProtectedRoute


import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, user, redirectTo="/landing" }) => {
    if (!user) {
        return <Navigate to={redirectTo} />
    }
    // outlet permite mostrar multiples que están protegidas por la misma lógica
    return children? children : <Outlet />
}

export default ProtectedRoute;
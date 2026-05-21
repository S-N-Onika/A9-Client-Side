import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FBF8F3]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5C2E16]"></div>
                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-4 animate-pulse">Validating Academic Profile Profile Matrix...</p>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
}

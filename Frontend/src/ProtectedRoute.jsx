import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const username = sessionStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        if (username === null) {
            navigate('/userinfo');
        }
    }, [username, navigate]);

    return children;
}

export default ProtectedRoute;
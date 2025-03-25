import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUserRole, setIsAuthenticated }) => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('jwtToken');
        setIsAuthenticated(false);
        setUserRole(null);
        navigate('/login');
    }, [navigate, setIsAuthenticated, setUserRole]);

    return (
        <div className="logout">
            {/* You can add a loading message or spinner here if needed */}
        </div>
    );
};

export default Logout;

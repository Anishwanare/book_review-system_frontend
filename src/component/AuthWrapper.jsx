import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children, role }) => {
    const { user } = useSelector((state) => state.User);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthWrapper;

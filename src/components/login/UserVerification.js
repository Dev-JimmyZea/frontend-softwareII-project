import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserContext = createContext('user-context');

const ValidateUser = ({ children, role }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const expired = token ? JSON.parse(atob(token.split('.')[1])).exp < Date.now() / 1000 : false;
        if (user && token && !expired && user.role === role) {
            setUser(JSON.parse(user));
            setShowChild(true);
        } else if (user && token && !expired && user.role !== role) {
            navigate('../');
        } else {
            navigate('../login');
        }

        return () => {
            setUser(null);
        }

    }, [navigate, role]);

    if (showChild) {
        return (
            <UserContext.Provider value={{ user }}>
                {children}
            </UserContext.Provider>);
    } else {

        return <>No tiene permisos</>;
    }
};

ValidateUser.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.object, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};

export default ValidateUser;

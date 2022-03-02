import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const UserContext = createContext('user-context');

const ValidateUser = ({ children }) => {
    const history = useNavigate();

    const [user, setUser] = useState();
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
            setUser(JSON.parse(user));
            setShowChild(true);
        } else {
            setTimeout(() => {
                history('/login');
            }, 500);
        }

        return () => {
            setUser(null);
        }

    }, [history]);

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

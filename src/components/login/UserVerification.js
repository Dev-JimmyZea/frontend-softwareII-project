import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const UserContext = createContext('user-context')

const ValidateUser = ({ children, role }) => {
    const navigate = useNavigate()
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const expired = token ? JSON.parse(atob(token.split('.')[1])).exp < Date.now() / 1000 : false
        const user = localStorage.getItem('user')

        if (user) {
            const userRole = JSON.parse(user).role
            if (!expired && (userRole === role || role === 'ALL')) {
                setShowChild(true)
            } else if (!expired && userRole !== role) {
                setTimeout(() => {
                    navigate('../')
                    window.location.reload()
                }, 1000)
            } else {
                setTimeout(() => {
                    navigate('../login')
                }, 1000)
            }
        } else {
            setTimeout(() => {
                navigate('../login')
            }, 1000)
        }

    }, [navigate, role])

    if (showChild) {
        return (
            <UserContext.Provider value={localStorage.getItem('user')}>
                {children}
            </UserContext.Provider>)
    } else {
        return <>No tiene permisos</>
    }
}

ValidateUser.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.object, PropTypes.arrayOf(PropTypes.element)]).isRequired,
}

export default ValidateUser

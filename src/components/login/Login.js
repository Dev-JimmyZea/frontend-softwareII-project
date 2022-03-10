import React, { useState } from 'react'
import './login.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Login = ({pathname}) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const send = async (url, data, meth) => {
        const response = await fetch(url, {
            method: meth,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        })
        return response.json()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        send(`${process.env.REACT_APP_URL_BACKEND}user/login`, user, 'POST').then(data => {
            if (data.message === 'User logged in successfully') {

                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Bienvenido',
                    showConfirmButton: false,
                    timer: 1000
                })

                setTimeout(() => {
                    const { token, data:user } = data
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    navigate(pathname === '/login' ? '/' : pathname)
                    window.location.reload()
                }, 1000)

            } else if (data.message === 'User not found') {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Correo electronico no registrado',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (data.message === 'Invalid password') {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Contraseña incorrecta',
                    showConfirmButton: false,
                    timer: 1500
                })
            }


        }).catch(() => {

            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1500
            })
        })

    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className={'container-login'}>
            <div className={'box-login'}>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className={'box-text'}>
                        <input type={'email'} id={'email'} name={'email'} onChange={handleChange} placeholder={'Email'} />
                    </div>

                    <div className={'box-text'}>
                        <input type={'password'} id={'password'} name={'password'} onChange={handleChange} placeholder={'Password'} />
                    </div>

                    <button className={'btn'} type={'submit'}>Sign In</button>

                    <a href={'./'}>Regresar al menu principal</a>


                </form>

            </div>
        </div>
    )
}

export default Login

import React, { useEffect, useState } from 'react';
// import imgHeader from '../../resources/img/cabecera.PNG';
import './login.css';

const SignIn = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        send('http://localhost:4000/user', {

            userId: '00',
            email: 'super.admin@uptc.edu.co',
            password: '123456',
            name: 'Super',
            lastName: 'Admin',
            role: 'SUPERADMIN',
            gender: 'M'

        }, 'POST')
            .then(data => console.log(data))
            .catch(err => console.log(err))

    }, []);

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
        });
        return response.json();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);

        send('http://localhost:4000/user/login', user, 'POST').then(data => {
            console.log(data);
            const { token, user } = data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            if (user.role === 'SUPERADMIN') {
                alert('Bienvenido Super Admin');
                window.location.href = '/';
            } else if (user.role === 'ADMIN') {
                alert('Bienvenido Admin');
                window.location.href = '/admin';
            } else if (user.role === 'STUDENT') {
                alert('Bienvenido Estudiante');
                window.location.href = '/user';
            } else {
                window.location.href = '/';
            }


        }).catch(err => console.log(err));

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

export default SignIn;

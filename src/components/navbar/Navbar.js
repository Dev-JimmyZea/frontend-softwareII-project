import './navbar.css';
import Logo from '../../resources/img/cabecera.png';
import { useState, useEffect } from 'react';

const Navbar = () => {

    const [show, setShow] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const closeSession = () => {
        localStorage.clear();
        window.location.href = '/';
        setShow(0);
    }

    useEffect(() => {
        if (user) {

            if (user.role === 'SUPERADMIN') {
                setShow(1);
            } else if (user.role === 'ADMIN') {
                setShow(2);
            } else {
                setShow(3);
            }
        }

    }, [user]);

    return (
        <div className={'navbar-container'}>
            <div className={'navbar'}>
                <div className={'logo'}>
                    <img src={Logo} alt={'logo'} />
                </div>
                <ul className={'items-navbar'}>
                    {
                        show === 1 ?
                            <>
                                <li className={'navbar-item'}>
                                    <span>Bienvenid@ {user.name} {user.lastName}</span>
                                </li>
                                <li className={'navbar-item'}>
                                    <a href={'/superadmin-users'}>Usuarios</a>
                                </li>
                                <li className={'navbar-item'}>
                                    <button onClick={closeSession}>Salir</button>
                                </li>

                            </>
                            : show === 2 ?
                                <>
                                    <li className={'navbar-item'}>
                                        <span>Bienvenid@ {user.name} {user.lastName}</span>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin-careers'}>Carreras</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin-works'}>Trabajos</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin-news'}>Noticias</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <button onClick={closeSession}>Salir</button>
                                    </li>
                                </>
                                : show === 3 ?
                                    <>
                                        <li className={'navbar-item'}>
                                            <span>Bienvenido@ {user.name} {user.lastName}</span>
                                        </li>
                                        <li className={'navbar-item'}>
                                            <a href={'/student-notification'}>Notificaciones</a>
                                        </li>
                                        <li className={'navbar-item'}>
                                            <a href={'/student-profile'}>Perfil</a>
                                        </li>
                                        <li className={'navbar-item'}>
                                            <button onClick={closeSession}>Salir</button>
                                        </li>
                                    </>
                                    :
                                    <>
                                        <li className={'navbar-item'}>
                                            <a href="./login">Iniciar Sesion</a>
                                        </li>
                                    </>

                    }
                </ul>
            </div>
        </div>
    );
}

export default Navbar

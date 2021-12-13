import './navbar.css';
import Logo from '../../resources/img/cabecera.png';
import { useState, useEffect } from 'react';

const Navbar = () => {

    const [show, setShow] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const closeSession = () => {
        localStorage.clear();
        window.location.href = '/login';
        setShow(0);
    }

    useEffect(() => {
        if (user) {

            if (user.role === 'SUPERADMIN') {
                setShow(1);
            } else if (user.role === 'ADMIN') {
                setShow(2);
            }
        }

    }, [user]);

    return (
        <div className={'navbar-container'}>
            <div className={'navbar'}>
                <div className={'logo'}>
                    <img src={Logo} alt={'logo'} />
                </div>
                <ul className={''}>
                    {
                        show === 1 ?
                            <>
                                <li className={'navbar-item'}>
                                    <a href={'/'}>Superadmin</a>
                                </li>
                                <li className={'navbar-item'}>
                                    <a href={'/admin'}>Administración</a>
                                </li>
                                <li className={'navbar-item'}>
                                    <a href={'/admin/users'}>Usuarios</a>
                                </li>
                                <li className={'navbar-item'}>
                                    <a href={'/admin/categories'}>Categorías</a>
                                </li>
                                <li className={'navbar-item'}>
                                    <button onClick={closeSession}>Salir</button>
                                </li>

                            </>
                            : show === 2 ?
                                <>
                                    <li className={'navbar-item'}>
                                        <a href={'/'}>Admin</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin'}>Administración</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin/users'}>Usuarios</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin/categories'}>Categorías</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <a href={'/admin/products'}>Productos</a>
                                    </li>
                                    <li className={'navbar-item'}>
                                        <button onClick={closeSession}>Salir</button>
                                    </li>
                                </>
                                :
                                <>
                                    <li className={''}>
                                        <a className={''} href="./login">Iniciar Sesion</a>
                                    </li>


                                </>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Navbar

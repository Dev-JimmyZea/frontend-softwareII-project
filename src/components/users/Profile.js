import { useState, useEffect } from 'react'
import './profile.css'

const NewsAndWork = (props) => {
    return (
        <div className={'profile-student'}>
            <h1>{props.title}</h1>
            <div className={'profile-student-container'}>
                {
                    props.getByUser && props.getByUser.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Título</th>
                                    <th>Fecha de creación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.getByUser ?
                                        props.getByUser.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><a href={`/${props.object}/${item._id}`}>{item.title}</a></td>
                                                    <td>{

                                                        new Date(item.created_at).toLocaleDateString('es-ES', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        })

                                                    }</td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td>Loading...</td>
                                        </tr>
                                }
                            </tbody>

                        </table>
                        :
                        <h2>No tienes foros</h2>
                }

            </div>
        </div>
    )
}

const Profile = () => {
    const id = JSON.parse(localStorage.getItem('user'))._id
    const role = JSON.parse(localStorage.getItem('user')).role
    const [user, setUser] = useState(null)
    const [getForumsByUser, setForumsByUser] = useState(null)
    const [getWorksByUser, setWorksByUser] = useState(null)

    const getData = async (url, meth, data) => {
        const formData = new FormData()
        for (let key in data) {
            formData.append(key, data[key])
        }
        const headers = {}
        let bodyS = null
        if (meth !== 'POST') {
            headers['Content-type'] = 'application/json'
            headers['x-access-token'] = localStorage.getItem('token')
            bodyS = JSON.stringify(data)
        } else {
            headers['x-access-token'] = localStorage.getItem('token')
            bodyS = formData
        }

        const config = {
            method: meth,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers,
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: bodyS,
        }
        const { body, ...rest } = config
        const res = await fetch(url, data ? config : rest)
        const dataJson = await res.json()

        return dataJson
    }


    useEffect(() => {
        getData(`${process.env.REACT_APP_URL_BACKEND}user/${id}`, 'GET')
            .then(data => {
                setUser(data.data)
            })
            .catch(err => {
                console.log(err)
            })
        if (role === 'STUDENT') {
            getData(`${process.env.REACT_APP_URL_BACKEND}forum/user/${id}`, 'GET')
                .then(data => {
                    setForumsByUser(data.data)
                })
                .catch(err => {
                    console.log(err)
                })

            getData(`${process.env.REACT_APP_URL_BACKEND}work/user/${id}`, 'GET')
                .then(data => {
                    setWorksByUser(data.data)
                })
                .catch(err => {
                    console.log(err)
                })

        }

    }, [id, role])


    return (
        <div className={'profile-container'}>
            <div className={'profile-user'}>

                <div className={'profile-title'}>
                    <h1>Mi Perfil</h1>
                </div>
                {
                    user ?
                        <>
                            <div className={'profile-image'}>
                                <figure>
                                    <label for="file-input">
                                        <img src={user.image} alt={user.name} />
                                        <div className={'profile-image-edit'}>
                                            <span>Subir foto</span>
                                            <i className="fas fa-camera"></i>
                                        </div>
                                    </label>

                                    <input className={'input'} id="file-input" name="image" type="file" />
                                </figure>

                            </div>
                            <div className={'profile-info'}>
                                <div className={'profile-title-info'}>
                                    <h2>Datos personales</h2>
                                </div>
                                <div className={'profile-button'}>
                                    <button>Editar datos personales</button>
                                </div>
                                <div className={'profile-info-user'}>

                                    <div className={'profile-group'}>
                                        <h3>Nombres: </h3>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className={'profile-group'}>
                                        <h3>Apellidos: </h3>
                                        <p>{user.lastName}</p>

                                    </div>
                                    <div className={'profile-group'}>
                                        <h3>Correo: </h3>
                                        <p>{user.email}</p>
                                    </div>

                                    <div className={'profile-group'}>
                                        <h3>Rol: </h3>
                                        <p>{user.role === 'STUDENT' ? 'Estudiante' : user.role === 'ADMIN' ? 'Administrador' : 'Superadministrador'}</p>
                                    </div>

                                    <div className={'profile-group'}>
                                        <h3>Género: </h3>
                                        <p>{user.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
                                    </div>
                                </div>

                                {
                                    user && user.role === 'STUDENT' &&
                                    <>
                                        <div className={'profile-title-info'}>
                                            <h2>Datos Carrera</h2>
                                        </div>
                                        <div className={'profile-info-career'}>

                                            <div className={'profile-group'}>
                                                <h3>Carrera: </h3>
                                                <p>{user.career.name}</p>
                                            </div>
                                            <div className={'profile-group'}>
                                                <h3>Facultad: </h3>
                                                <p>{user.career.faculty}</p>
                                            </div>
                                        </div>
                                    </>

                                }

                            </div>

                        </>
                        :
                        <h1>Loading...</h1>
                }

            </div>
            <div className={'profile-student'}>
                {
                    user && user.role === 'STUDENT' ?
                        <>
                            <div className={'profile-title-students'}>
                                <h1>Información Adicional</h1>
                            </div>
                            <div className={'profile-info-students'}>
                                <NewsAndWork title={'Mis Foros'} getByUser={getForumsByUser} object={'forum'} />
                                <NewsAndWork title={'Trabajos aplicados'} getByUser={getWorksByUser} object={'work'} />
                            </div>

                        </>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default Profile
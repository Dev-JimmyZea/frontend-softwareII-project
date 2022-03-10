import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import ItemComponent from "../Item/Item"
import ValidateUser from "../login/UserVerification"


const Item = ({ object }) => {

    const id = window.location.pathname.split('/')[2]
    const [data, setData] = useState([])
    const user = localStorage.getItem('user')

    const getData = async (url, meth) => {
        const response = await fetch(url, {
            method: meth,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
        return response.json()
    }

    useEffect(() => {
        getData(`${process.env.REACT_APP_URL_BACKEND}${object}/${id}`, 'GET')
            .then(data => {
                if (data.message === 'New fetched successfully' || data.message === 'Work fetched successfully') {
                    setData(data.data)
                } else {
                    window.history.back()
                }
            }
            )
            .catch(err => console.log(err))
    }, [id, object])

    const apply = async (idStudent, no_apply) => {
        Swal.fire({
            title: !no_apply ? 'Deseas aplicar a este trabajo?' : 'Desea cancelar la aplicación?',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                getData(`${process.env.REACT_APP_URL_BACKEND}work/${no_apply ? 'remove/' : '/'}${id}/${idStudent}`, 'PUT')
                    .then(data => {
                        if (data.message === 'Applicant added successfully') {
                            Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: 'Has aplicado exitosamente a este trabajo',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else if (data.message === 'Applicant removed successfully') {
                            Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: 'Has cancelado la aplicación exitosamente a este trabajo',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        setData(data.data)
                    })
                    .catch(err => console.log(err))
            } else {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Cancelado',
                    showConfirmButton: false,
                    timer: 1000
                })
            }

        })
    }

    return (
        <>
            <ValidateUser role='ALL'>
                <Navbar />
                {
                    data ?
                        <ItemComponent
                            object={object}
                            title={data.title}
                            charge={data.charge}
                            content={data.content || data.description}
                            image={data.image}
                            created_at={data.created_at}
                            salary={data.base_salary}
                            company={data.company}
                            applicants={data.applicants}
                            user={user ? JSON.parse(user) : null}
                            valid_until={data.valid_until}
                            apply={apply}
                            id={1}
                        />
                        :
                        null
                }
                <Footer />
            </ValidateUser>
        </>)
}

export default Item
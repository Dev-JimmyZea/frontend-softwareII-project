import { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import ItemComponent from "../Item/Item"
import ValidateUser from "../login/UserVerification"


const Item = ({ object }) => {
    const id = window.location.pathname.split('/')[2];
    const [data, setData] = useState([]);
    const user = localStorage.getItem('user');
    console.log(user);

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
        });
        return response.json();
    }

    useEffect(() => {
        getData(`${process.env.REACT_APP_URL_BACKEND}${object}/${id}`, 'GET')
            .then(data => setData(data.data))
            .catch(err => console.log(err))
    }, [id, object, user]);

    return (
        <>
            <ValidateUser role='ALL'>
                <Navbar />
                <ItemComponent 
                    object={object} 
                    title={data.title}
                    charge={data.charge}
                    content={object === 'news' ? data.content : data.description}
                    image={data.image}
                    created_at={data.created_at}
                    salary={data.base_salary}
                    company={data.company}
                    applicants={data.applicants}
                    user={user ? JSON.parse(user) : null}
                    valid_until={data.valid_until}
                />
                <Footer />
            </ValidateUser>
        </>)
}

export default Item
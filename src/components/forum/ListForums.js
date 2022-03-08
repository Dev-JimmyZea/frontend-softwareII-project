import { useEffect, useState } from 'react'
import "./forum.css"
import ModalCrud from '../crud/ModalCrud'

const ListForum = () => {

  const [forums, setForums] = useState([])
  const user = localStorage.getItem('user')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const createForum = async (url, data, meth) => {
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
      body: JSON.stringify(data)
    });
    return response.json();

  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND}forum`)
      .then(res => res.json())
      .then(data => setForums(data.data))
      .catch(err => console.log(err))
  }, [])

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const getDateNow = () => {
    const date = new Date()
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

  return (
    <div className="forum-container">
      <div className="forum-title">
        <h1>Foros</h1>
      </div>
      {
        user && JSON.parse(user).role === 'STUDENT' &&
        <div className="forum-create">
          <button className="btn-create" onClick={openModal}>Nuevo Foro</button>
          <ModalCrud
            closeModal={closeModal}
            modalIsOpen={modalIsOpen}
            createForum={createForum}
            getDateNow={getDateNow}
            customStyles={customStyles}
          />
        </div>
      }

      <div className="forum-content">
        <div className="forum-content-container">
          <table className="forum-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tema</th>
                <th>Descripción</th>
                <th>Fecha Creacion</th>
                <th>Fecha Actualización</th>
              </tr>
            </thead>
            <tbody>
              {forums && forums.map(forum => (
                <tr key={forum.code}>
                  <td><a href={`./forum/${forum.code}`}>{forum.title}</a></td>
                  <td>{forum.topic}</td>
                  <td>
                    {
                      forum.image &&
                      <div className="container-image">
                        <img src={forum.image} alt="" className="forum-image" />
                      </div>

                    }
                    <span>{forum.description}</span>
                  </td>
                  <td>{forum.created_at.substring(0, 10)}</td>
                  <td>{forum.updated_at.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default ListForum
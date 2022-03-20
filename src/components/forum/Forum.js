import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Modal from 'react-modal'
import './forum.css'

const Forum = () => {

  const id = window.location.pathname.split('/')[2]
  const [forum, setForum] = useState([])
  const [open, setOpen] = useState(false)
  const [idUserResponse, setIdUserResponse] = useState(null)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const getData = async (url, meth, body) => {
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
      body: JSON.stringify(body)
    })
    return response.json()
  }

  useEffect(() => {
    getData(`${process.env.REACT_APP_URL_BACKEND}forum/${id}`, 'GET')
      .then(data => {
        if (data.message === 'Forum fetched successfully') {
          setForum(data.data)
        } else if (data.message === 'Forum not found') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `No existe un foro con ese id`,
            timer: 2000,
          })
          setTimeout(() => {
            window.history.back()
          }, 2000)
        }
      })
      .catch(err => console.log(err))

  }, [id])

  const submit = async (e) => {
    e.preventDefault()
    const data = {
      text: e.target.comment.value,
      user: JSON.parse(localStorage.getItem('user'))._id,
      forum: window.location.pathname.split('/')[2],
      response_to: idUserResponse
    }

    const res = await getData(`${process.env.REACT_APP_URL_BACKEND}comment`, 'POST', data)
    if (res.message === 'Comment created successfully') {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: `El comentario ha sido creado`,
        timer: 2000,
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)

    } else if (res.message === 'Comment not created') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `No se ha podido crear el comentario`,
        timer: 2000,
      })
    }

  }

  Modal.setAppElement('#root')


  return (
    <div className="container-component-forum">
      <div className="btn-return">
        <button onClick={() => window.history.back()}>Regresar</button>
      </div>
      <div className="container-forum">
        <div className="forum-header">
          <h1>{forum.title}</h1>
          <div className="forum-dates">
            <span>Creado el: {new Date(forum.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })}</span>
            <span>Ultima actualización: {new Date(forum.updated_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            })}</span>
          </div>

        </div>
        <div className="forum-body">
          <div className="forum-body-content">
            {
              forum.image !== 'undefined' && <img src={forum.image} alt="img-forum" />
            }
            {
              forum && forum.description && forum.description.split('\n').map((text, index) => (
                <p key={index}>{text}</p>
              ))
            }
          </div>
          <div className="forum-body-card">
            <div className="card-header">
              <h2>{forum && forum.comments && forum.comments.length} comentarios</h2>
            </div>
            <div className="card-body">
              <div className="card-body-button-new">
                <button onClick={() => {
                  openModal()
                }}>Nuevo comentario</button>
              </div>
              <div className="container-modal-comment">
                <Modal
                  isOpen={open}
                  onRequestClose={closeModal}
                  className="modal-comment"
                >
                  <div className="modal-header">
                    <h2>Nuevo comentario</h2>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={submit}>
                      <div className="form-group">
                        <label htmlFor="comment">Comentario</label>
                        <textarea name="comment" id="comment" rows="10" className="form-control"></textarea>
                      </div>
                      <div className="form-group-buttons">
                        <button>Enviar</button>
                        <button onClick={closeModal}>Cancelar</button>
                      </div>
                    </form>
                  </div>
                </Modal>
              </div>
              {
                forum && forum.comments && forum.comments.map((comment, index) => (
                  <div id={comment._id} key={index}>
                    <div className="card-body-comment">
                      <div className="card-body-comment-header">
                        <img src={comment.user.image} alt="img-user" />
                        <div className="card-body-comment-header-info">
                          <h3>{comment.user.name} {comment.user.lastName}</h3>
                          <span>{new Date(comment.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                          })}</span>
                        </div>
                      </div>
                      {
                        comment.text.split('\n').map((text, index) => (
                          <p key={index}>{text}</p>
                        ))
                      }
                      <div className="card-body-button">
                        {
                          JSON.parse(localStorage.getItem('user'))._id === comment.user._id && new Date(comment.created_at).getTime() + 1800000 > new Date().getTime() ?
                            <>
                              <button>Editar</button>
                              <button onClick={() => 'deleteComment(comment._id)'}>Eliminar</button>
                            </>
                            : null
                        }
                        {
                          JSON.parse(localStorage.getItem('user'))._id !== comment.user._id ?
                            <button onClick={() => {
                              setIdUserResponse(comment.user._id)
                              openModal()
                            }}>Responder</button>
                            : null
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Forum
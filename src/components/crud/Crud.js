import Modal from 'react-modal'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

const Crud = (props) => {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [data, setdata] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState()

  const loadDataByForm = () => {
    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')
    const textAreas = document.querySelectorAll('textarea')
    const dataL = {}

    inputs.forEach(input => {
      dataL[input.name] = input.value
    })
    selects.forEach(select => {
      dataL[select.name] = select.value
    })
    textAreas.forEach(textArea => {
      dataL[textArea.name] = textArea.value
    })

    return dataL
  }

  useEffect(() => {
    crudData(`${process.env.REACT_APP_URL_BACKEND}${props.object}`, 'GET')
      .then(data => setdata(data.data))
      .catch(err => console.log(err))
  }, [props.object])

  Modal.setAppElement('#root')

  const crudData = async (url, meth, data = null) => {
    const config = {
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
      body: JSON.stringify(data),
    }
    const { body, ...rest } = config
    const res = await fetch(url, data ? config : rest)
    const dataJson = await res.json()

    return dataJson
  }

  const submit = (e) => {
    e.preventDefault()
    const dataL = loadDataByForm()

    crudData(`${process.env.REACT_APP_URL_BACKEND}${props.object}${isEdit ? "/" + id : ''}`, isEdit ? 'PUT' : 'POST', {
      ...dataL
    })
      .then(res => {
        if (res.message === `${props.object} ${isEdit ? 'updated' : 'created'} successfully`) {
          Swal.fire({
            icon: 'success',
            title: `Registro ${isEdit ? 'actualizado' : 'creado'} con éxito`,
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            window.location.reload()

          }, 1500);
        } else if (res.message === 'Career already exists') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El codigo o id escrito ya se encuentra registrado en la base de datos',
          })
          closeModal()
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error'
        })
      })
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const setDataForm = (dataU) => {
    const { _id, ...rest } = dataU
    const keys = Object.keys(rest)
    const values = Object.values(rest)
    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')
    const textAreas = document.querySelectorAll('textarea')

    keys.forEach((key, i) => {
      if (key !== '__v') {
        inputs.forEach(input => {
          if (input.name === key && input.name !== 'password') {
            input.value = values[i]
          }
        })
        selects.forEach(select => {
          if (select.name === key) {
            if (select.name === 'career') {
              select.value = values[i]._id
            } else {
              select.value = values[i]
            }
          }
        })
        textAreas.forEach(textArea => {
          if (textArea.name === key) {
            textArea.value = values[i]
          }
        })
      }
    })


  }

  return (
    <div className={'data-container'}>
      <button className={'btn-create'} onClick={() => {
        setIsEdit(false)
        openModal()
      }}>Nuevo Registro</button>
      <button className="btn-deletea-all" onClick={() => {
        Swal.fire({
          title: '¿Estas seguro que deseas eliminar todos los registros?',
          text: "No podras revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borralo!'
        }).then((result) => {
          if (result.value) {
            crudData(`${process.env.REACT_APP_URL_BACKEND}${props.object}`, 'DELETE')
              .then(res => {
                if (res.message === `${props.object}s deleted successfully`) {
                  Swal.fire({
                    icon: 'success',
                    title: `Registros eliminados con éxito`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setTimeout(() => {
                    window.location.reload()
                  }, 1500);
                }
              })
              .catch(() => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Ha ocurrido un error'
                })
              })
          }
        })
      }}>Eliminar Todo</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-container">
          <div className="modal-title">
            <h1>{isEdit ? 'Editar' : 'Nuevo'} Registro</h1>
          </div>
          <div className="modal-body">
            <form onSubmit={submit} className="form-modal">
              {
                props.form
              }
              <button type="submit" >{isEdit ? 'Editar' : 'Crear'}</button>
              <button className="btn-close" onClick={closeModal}>Cerrar</button>
            </form>
          </div>
        </div>
      </Modal >
      <div className="data-container-table">
        <div className="data-title-table">
          <h2>Listado de {props.title}</h2>
        </div>
        {
          data.length > 0 ?
          <div className="data-body">
          <table className="table">
            <thead>
              <tr>
                {
                  props.columns.map(column => {
                    return (
                      <th key={column.key}>{column.name}</th>
                    )
                  })
                }
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                data && data.map(data => {
                  return (
                    <tr key={data._id}>
                      {
                        props.columns.map(column => {
                          if (column.key === 'career') {
                            if (data[column.key]) {
                              return (
                                <td key={column.key}>{data[column.key].name}</td>
                              )
                            } else {
                              return (
                                <td key={column.key}>---------------</td>
                              )
                            }
                          } else {
                            return (
                              <td key={column.key}>{data[column.key]}</td>
                            )
                          }
                        })
                      }
                      <td>
                        <button className="btn-edit" onClick={() => {
                          setIsEdit(true)
                          setId(data._id)
                          openModal()
                          crudData(`${process.env.REACT_APP_URL_BACKEND}${props.object}/${data._id}`, 'GET')
                            .then(res => {
                              setDataForm(res.data)
                            })
                            .catch((err) => {
                              Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ha ocurrido un error'
                              })
                            })
                        }}>Editar</button>
                        <button className="btn-delete" onClick={() => {
                          Swal.fire({
                            title: '¿Estas seguro que deseas eliminar el registro?',
                            text: "No podras revertir esto!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Si, borralo!'
                          }).then((result) => {
                            if (result.value) {
                              crudData(`${process.env.REACT_APP_URL_BACKEND}${props.object}/${data._id}`, 'DELETE')
                                .then(res => {
                                  if (res.message === `${props.object} deleted successfully`) {
                                    Swal.fire({
                                      icon: 'success',
                                      title: `Registro eliminado con éxito`,
                                      showConfirmButton: false,
                                      timer: 1500
                                    })
                                    setTimeout(() => {
                                      window.location.reload()
                                    }, 1500);
                                  }
                                })
                                .catch(() => {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Ha ocurrido un error'
                                  })
                                })
                            }
                          })
                        }}>Eliminar</button>
                      </td>

                    </tr>
                  )
                })
              }

            </tbody>
          </table>
        </div>
        :
        <div className="data-body">
          <h2>No hay registros</h2>
        </div>

        }

      </div>
    </div >
  )
}


export default Crud
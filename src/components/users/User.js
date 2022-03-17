import { useState, useEffect } from 'react'
import Crud from '../crud/Crud'

const User = () => {

  const [careers, setCareers] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BACKEND}career`)
      .then(res => res.json())
      .then(data => setCareers(data.data))
      .catch(err => console.log(err))
  }, [])

  const form =
    <div className={'container-form-crud'}>
      <div className="form-group">
        <label htmlFor="id">Id Estudiante</label>
        <input type="text" className="form-control" name="userId" id="id" required />
      </div>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input type="text" className="form-control" name="name" id="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Apellido</label>
        <input type="text" className="form-control" name="lastName" id="lastName" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" name="email" id="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input type="password" className="form-control" name="password" id="password" required />
      </div>
      <div className="form-group">
        <label htmlFor="role">Rol</label>
        <select className="form-control" onChange={() =>
          document.getElementById('role').value === 'ADMIN' ?
            document.getElementById('field-hidden').style.display = 'none' :
            document.getElementById('field-hidden').style.display = 'block'
        } name="role" id="role" required>
          <option defaultValue="Seleccione" disabled selected>Seleccione un rol</option>
          <option value="ADMIN">Administrador</option>
          <option value="STUDENT">Estudiante</option>
        </select>
      </div>
      <div className="form-group" id={'field-hidden'} hidden>
        <label htmlFor="career">Carrera</label>
        <select className="form-control" id="career" name="career" required>
          <option defaultValue="Seleccione" disabled selected>Seleccione una carrera</option>
          {
            careers.map(career => (
              <option key={career._id} value={career._id}>{career.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="gender">Género</label>
        <select className="form-control" name="gender" id="gender" required>
          <option defaultValue="Seleccione" disabled selected>Seleccione un género</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </div>
    </div>

  return (
    <div className={'object-container'}>
      <div className={'object-title'}>
        <h1>Usuarios</h1>
      </div>
      <div className={'object-content'}>
        <Crud
          title={'Usuarios'}
          object={'User'}
          columns={[
            {
              name: 'Id User',
              key: 'userId',
              type: 'text'
            },
            {
              name: 'Nombre',
              key: 'name',
              type: 'text'
            },
            {
              name: 'Apellido',
              key: 'lastName',
              type: 'text'
            },
            {
              name: 'Correo',
              key: 'email',
              type: 'text'
            },
            {
              name: 'Carrera',
              key: 'career',
              type: 'text'
            },
            {
              name: 'Rol',
              key: 'role',
              type: 'text'
            },
            {
              name: 'Género',
              key: 'gender',
              type: 'text'
            }
          ]}
          form={form}

        />
      </div>

    </div>
  )
}

export default User
import Crud from '../crud/Crud'
import './career.css'

const Career = () => {

  const form =
    <div className={'container-form-crud'}>
      <div className="form-group">
        <label htmlFor="code">Codigo</label>
        <input type="text" className="form-control" name="code" id="code" required />
      </div>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input type="text" className="form-control" name="name" id="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="faculty">Facultad</label>
        <select className="form-control" id="faculty" name="faculty" required>
          <option defaultValue="Seleccione" disabled selected>Seleccione una facultad</option>
          <option value="Ciencias Agropecuarias">Ciencias Agropecuarias</option>
          <option value="Ciencias">Ciencias</option>
          <option value="Ciencias de la Educación">Ciencias de la Educación</option>
          <option value="Ciencias Económicas y Administrativas">Ciencias Económicas y Administrativas</option>
          <option value="Ciencias de la Salud">Ciencias de la Salud</option>
          <option value="Derecho y Ciencias Sociales">Derecho y Ciencias Sociales</option>
          <option value="Ingeniería">Ingenería</option>
          <option value="Estudios a Distancia">Estudios a Distancia</option>
          <option value="Seccional Chiquinquirá">Seccional Chiquinquirá</option>
          <option value="Seccional Duitama">Seccional Duitama</option>
          <option value="Seccional Sogamoso">Seccional Sogamoso</option>
        </select>
      </div>

    </div>

  return (
    <div className={'career-container'}>
      <div className={'career-title'}>
        <h1>Carreras</h1>
      </div>
      <div className={'career-content'}>
        <Crud
          title={'Carreras'}
          object={'Career'}
          columns={[
            {
              name: 'Código',
              key: 'code',
              type: 'text'
            },
            {
              name: 'Nombre',
              key: 'name',
              type: 'text'
            },
            {
              name: 'Facultad',
              key: 'faculty',
              type: 'text'
            },
          ]}
          form={form}
        />
      </div>
    </div>
  )
}


export default Career
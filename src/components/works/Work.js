import Crud from '../crud/Crud'

const Work = () => {

    const form = <div className={'container-form-crud'}>
        <div className="form-group">
            <label htmlFor="code">Código *</label>
            <input type="text" className="form-control" name="code" id="code" required />
        </div>
        <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input type="text" className="form-control" name="title" id="title" required />
        </div>
        <div className="form-group">
            <label htmlFor="charge">Cargo *</label>
            <input type="text" className="form-control" name="charge" id="charge" required />
        </div>
        <div className="form-group">
            <label htmlFor="company">Empresa *</label>
            <input type="text" className="form-control" name="company" id="company" required />
        </div>
        <div className="form-group">
            <label htmlFor="base_salary">Salario base *</label>
            <input type="number" className="form-control" name="base_salary" id="base_salary" required />
        </div>
        <div className="form-group">
            <label htmlFor="valid_until">Válido hasta *</label>
            <input type="date" className="form-control" name="valid_until" id="valid_until" required />
        </div>
        <div className="form-group form-description">
            <label htmlFor="image">Imagen</label>
            <input type="file" className="form-control" name="image" id="image" />
        </div>
        <div className="form-group form-description">
            <label htmlFor="description">Descripción *</label>
            <textarea className="form-control" name="description" id="description" rows="4" required />
        </div>

    </div>


    return (
        <div className={'object-container'}>
            <div className={'object-title'}>
                <h1>Trabajos</h1>
            </div>
            <div className={'object-content'}>
                <Crud
                    title={'Trabajos'}
                    object={'Work'}
                    columns={[
                        {
                            name: 'Código',
                            key: 'code',
                            type: 'text'
                        },
                        {
                            name: 'Titulo',
                            key: 'title',
                            type: 'text'
                        },
                        {
                            name: 'Cargo',
                            key: 'charge',
                            type: 'text'
                        },
                        {
                            name: 'Descripción',
                            key: 'description',
                            type: 'text'
                        },
                        {
                            name: 'Empresa',
                            key: 'company',
                            type: 'text'
                        },
                        {
                            name: 'Salario',
                            key: 'base_salary',
                            type: 'number'
                        },
                        {
                            name: 'Fecha de expiración',
                            key: 'valid_until',
                            type: 'date'
                        }


                    ]}
                    form={form}
                />
            </div>
        </div>
    )
}


export default Work
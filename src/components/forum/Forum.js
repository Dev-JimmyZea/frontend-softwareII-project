import Crud from '../crud/Crud'

const Forum = () => {

    const form =
        <div className={'container-form-crud'}>
            <div className="form-group">
                <label htmlFor="code">Código *</label>
                <input type="text" className="form-control" name="code" id="code" required />
            </div>
            <div className="form-group">
                <label htmlFor="title">Título *</label>
                <input type="text" className="form-control" name="title" id="title" required />
            </div>
            <div className="form-group">
                <label htmlFor="topic">Tema *</label>
                <input type="text" className="form-control" name="topic" id="topic" required />
            </div>
            <div className="form-group">
                <label htmlFor="image">Imagen</label>
                <input type="file" className="form-control" name="image" id="image" />
            </div>
            <div className="form-group form-description">
                <label htmlFor="description">Descripción *</label>
                <textarea className="form-control" name="description" id="description" rows="7" required></textarea>
            </div>
        </div>

    return (
        <div className={'forum-container object-container'}>
            <div className={'object-title'}>
                <h1>Foros</h1>
            </div>
            <div className={'object-content'}>
                <Crud
                    title={'Foros'}
                    object={'Forum'}
                    columns={[
                        {
                            name: 'Título',
                            key: 'title',
                            type: 'text'
                        },
                        {
                            name: 'Tema',
                            key: 'topic',
                            type: 'text'
                        },
                        {
                            name: 'Descripción',
                            key: 'description',
                            type: 'text'
                        },
                        {
                            name: 'Fecha de creación',
                            key: 'created_at',
                            type: 'date'
                        },
                        {
                            name: 'Fecha de actualización',
                            key: 'updated_at',
                            type: 'date'
                        },

                    ]}
                    form={form}

                />
            </div>

        </div>
    )
}

export default Forum
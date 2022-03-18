import Crud from '../crud/Crud'

const News = () => {

    const form = <div className={'container-form-crud'}>
        <div className="form-group">
            <label htmlFor="code">Código *</label>
            <input type="text" className="form-control" name="code" id="code" required />
        </div>
        <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input type="text" className="form-control" name="title" id="title" required />
        </div>
        <div className="form-group form-description">
            <label htmlFor="image">Imagen </label>
            <input type="file" className="form-control" name="image" id="image" />
        </div>
        <div className="form-group form-description">
            <label htmlFor="content">Contenido *</label>
            <textarea className="form-control" name="content" id="content" rows="4" required></textarea>
        </div>

    </div>


    return (
        <div className={'object-container'}>
            <div className={'object-title'}>
                <h1>Noticias</h1>
            </div>
            <div className={'object-content'}>
                <Crud
                    title={'Noticias'}
                    object={'News'}
                    columns={[
                        {
                            name: 'Código',
                            key: 'code',
                            type: 'text'
                        },
                        {
                            name: 'Título',
                            key: 'title',
                            type: 'text'
                        },
                        {
                            name: 'Imagen',
                            key: 'image',
                            type: 'text'
                        },
                        {
                            name: 'Fecha Creación',
                            key: 'created_at',
                            type: 'date'
                        }

                    ]}
                    form={form}
                />
            </div>
        </div>
    )
}


export default News
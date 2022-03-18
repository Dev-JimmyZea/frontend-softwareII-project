import './item.css'

const Item = (props) => {

    return (
        <div className="container-item">
            <div className="container-item-title">
                <a href={`/${props.object === 'news' ? './' : props.object}`}>
                    Volver
                </a>
                <h1>{
                    props.object === 'news' ?
                        'Noticias'
                        :
                        'Trabajos'
                }
                </h1>
            </div>

            <div className="item-container">
                <div className="item-title">
                    <h2>{props.title}</h2>
                    <span>{props.created_at && props.created_at.substring(0, 10)}</span>
                </div>
                {
                    props.object === 'work' ?
                        <div className="item-features">
                            <div className="item-features-charge">
                                <h3>Cargo</h3>
                                <span>{props.charge}</span>
                            </div>
                            <div className="item-features-salary">
                                <h3>Salario base (COP)</h3>
                                <span>{'$' + props.salary + ' Millones'}</span>
                            </div>
                            <div className="item-features-company">
                                <h3>Empresa</h3>
                                <span>{props.company}</span>
                            </div>
                            <div className="item-features-applicants">
                                <h3>{`Válido hasta el ${props.valid_until && new Date(props.valid_until).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}`}</h3>
                                {
                                    props.user.role === 'STUDENT' ?
                                        <>
                                            {
                                                props.applicants && props.applicants.length !== 0 && props.applicants.includes(props.user._id) ?
                                                    <button onClick={() => props.apply(props.user._id, true)}>Cancelar</button>
                                                    :
                                                    <button onClick={() => props.apply(props.user._id)}>Aplicar</button>
                                            }
                                        </>
                                        :
                                        <>
                                            <a className={'link'} href={'#applicants'}>Ver Aplicantes</a>
                                        </>
                                }
                            </div>
                        </div>
                        :
                        null
                }
                <div className="item-content">
                    <div className="item-content-image">
                        <img src={props.image} alt={props.image} />
                    </div>
                    <h3>{props.object === 'work' ? 'Descripción' : null}</h3>
                    {
                        props.content && props.content.split('\n').map((item, index) => (
                            <p key={index}>{item}</p>
                        ))
                    }
                </div>
            </div>
            {
                props.user.role === 'SUPERADMIN' || props.user.role === 'ADMIN' ?
                    <div className="table-applicants">
                        <a name="applicants" />
                        <h2>Aplicantes</h2>
                        {
                            props.applicants && props.applicants.length !== 0 ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Correo</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.applicants.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.email}</td>
                                                </tr>
                                            ))

                                        }
                                    </tbody>
                                </table>
                                :
                                <tr>
                                    <td colSpan={7}>No hay aplicantes para este trabajo</td>
                                </tr>
                        }
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default Item
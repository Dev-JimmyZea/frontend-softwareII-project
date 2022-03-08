import './item.css';

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

                                {
                                    props.user.role === 'STUDENT' ?
                                        <>
                                            {
                                                props.applicants && props.applicants.length !== 0 && props.applicants.includes(props.user._id) ?
                                                    <>
                                                        <h3>{`Aplica hasta el ${props.valid_until && props.valid_until.substring(0, 10)} aquí`}</h3>
                                                        <button onClick={() => props.apply(props.user._id, true)}>Cancelar</button>
                                                    </>
                                                    :
                                                    <>
                                                        <h3>{`Aplica hasta el ${props.valid_until && props.valid_until.substring(0, 10)} aquí`}</h3>
                                                        <button onClick={() => props.apply(props.user._id)}>Aplicar</button>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            <h3>{'Ver aplicantes'}</h3>
                                            <a className={'link'} href={'/'}>Ver</a>
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
        </div>
    )
}

export default Item
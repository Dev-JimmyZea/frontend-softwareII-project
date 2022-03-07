import './cards.css';

const Cards = (props) => {
    return <>
        <div className={'cards-container'} >
            <a href={`./${props.site}/${props.code}`}>
                <div className={'content-card'}>
                    <div className={'card-title'}>
                        <p> {props.title} </p>
                    </div>
                    <div className={'content-image'}>
                        <img src={props.image} alt={'image_news'} className={'image'} />
                    </div>
                    <div className={'content-card-text'}>
                        <p>{props.content}</p>
                    </div>
                    <div className={'content-card-info'}>
                        <span>{props.salary}</span>
                        <span>{props.created_at}</span>
                    </div>
                    <div className={'content-card-button'}>
                        <button className={'button-card'} href={`./news/${props.code}`}>Ver más</button>
                    </div>

                </div>
            </a>
        </div>
    </>
};

export default Cards;
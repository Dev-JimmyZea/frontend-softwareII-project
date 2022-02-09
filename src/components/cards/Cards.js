import './cards.css';

const Cards = (props) => {
    return <>
        <div className={'cards-container'} >
            <div className={'content-card'} onClick={() => props.handleClick(props.code)}>
                <div className={'content-image'}>
                    <img src={props.image} alt={'image_news'} className={'image'} />
                </div>
                <div className={'content-card-text'}>
                    <p>{props.content}</p>
                </div>
                <div className={'content-card-date'}>
                    <span>{props.created_at}</span>   
                </div>
                <div className={'content-card-button'}>
                    <button className={'button-card'} >Ver más</button>
                </div>

            </div>
        </div>
    </>
};

export default Cards;
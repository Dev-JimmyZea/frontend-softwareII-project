import './cards.css';
import image from '../../resources/img/cabecera.png';

const Cards = (props) => {
    return <>
        <div className={'card-container'} >
            <div className={'content-card'}>
                <div className={'content-image'}>
                    <img src={image} alt={'image_news'} className={'image'} />
                </div>
                <div className={'content-card-text'}>
                    <h1 >{props.title}</h1>
                    <p>{props.description}</p>
                </div>
                <div className={'content-card-button'}>
                    <button className={'button-card'}>Ver mas</button>
                </div>

            </div>
        </div>
    </>
};

export default Cards;
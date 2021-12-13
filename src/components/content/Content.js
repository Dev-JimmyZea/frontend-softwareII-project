import Cards from '../cards/Cards';
import './content.css'
import Slider from 'react-slick';


const Content = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className={'content-container'}>
            <div className={'content-cards'}>
                <Slider {...settings}>
                    <Cards title={'Noticia numero 1'} description={'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. labore, quibusdam.'} />
                    <Cards title={'Noticia numero 2'} description={'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. labore, quibusdam.'} />
                    <Cards title={'Noticia numero 3'} description={'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. labore, quibusdam.'} />
                    <Cards title={'Noticia numero 4'} description={'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. labore, quibusdam.'} />
                </Slider>
            </div>

        </div>
    )
}

export default Content

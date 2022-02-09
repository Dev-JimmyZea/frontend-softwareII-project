import Cards from '../cards/Cards';
import './content.css'
import Slider from 'react-slick';
import { useEffect, useState } from 'react';

export default function Content () {

    const URL = 'http://localhost:4000/news';
    const [news, setNews] = useState([]);

    const handleClick = (id) => {
        console.log(id);
        if(localStorage.getItem('token') === null){
            console.log('No estas logeado');
            window.location.href = '/login';

        }else{
            window.location.href = `/news/${id}`;
            console.log('Estas logeado');
        }
    }

    useEffect(() => {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                setNews(data.data);
            })
            .catch(error => console.log(error));    
        }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
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
                <h1 className={'main-title'}>Noticias</h1>
                <Slider {...settings} id={'slider'}>
                    {news.map(news => (
                        <Cards
                            key={news.code}
                            code={news.code}
                            title={news.title}
                            content={news.content}
                            created_at={news.created_at.substring(0, 10)}
                            handleClick={handleClick}
                            image={news.image}
                            isNews={true}
                        />
                    ))}

                </Slider>
            </div>
        </div>
    )
}

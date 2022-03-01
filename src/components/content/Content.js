import Cards from '../cards/Cards';
import './content.css'
import Slider from 'react-slick';
import { useEffect, useState } from 'react';

export default function Content({ isNews }) {

    const [news, setNews] = useState([]);
    const [work, setWork] = useState([]);

    const handleClick = (id) => {
        if (localStorage.getItem('token') === null) {
            console.log('No estas logeado');
            window.location.href = '/login';

        } else {
            window.location.href = isNews ? `/news/${id}` : `/work/${id}`;
            console.log('Estas logeado');
        }
    }

    useEffect(() => {
        console.log(process.env);
        isNews ?
            fetch(`${process.env.REACT_APP_URL_BACKEND}news`)
                .then(res => res.json())
                .then(data => setNews(data.data))
                .catch(err => console.log(err))
            :
            fetch(`${process.env.REACT_APP_URL_BACKEND}work`)
                .then(res => res.json())
                .then(data => setWork(data.data))
                .catch(err => console.log(err))
    },[isNews])

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
                <h1 className={'main-title'}>{isNews ? 'Noticias' : 'Trabajos'}</h1>
                <Slider {...settings} id={'slider'}>
                    {
                        isNews ?
                            news.map(news => (
                                <Cards
                                    key={news.code}
                                    code={news.code}
                                    title={news.title}
                                    content={news.content}
                                    created_at={news.created_at.substring(0, 10)}
                                    handleClick={handleClick}
                                    image={news.image}
                                />
                            ))
                            :
                            work.map(work => (
                                <Cards
                                    key={work.code}
                                    code={work.code}
                                    title={work.title}
                                    content={work.description}
                                    created_at={work.created_at.substring(0, 10)}
                                    handleClick={handleClick}
                                    image={work.image}
                                />
                            ))
                    }

                </Slider>
            </div>
        </div>
    )
}

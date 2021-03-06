import Cards from '../cards/Cards'
import './content.css'
import Slider from 'react-slick'
import { useEffect, useState } from 'react'

export default function Content({ isNews }) {

    const [news, setNews] = useState([])
    const [work, setWork] = useState([])
    const [count, setCount] = useState(isNews ? news.length : work.length)


    useEffect(() => {
        isNews ?
            fetch(`${process.env.REACT_APP_URL_BACKEND}news`)
                .then(res => res.json())
                .then(data => {
                    setNews(data.data)
                    setCount(data.data.length)
                })
                .catch(err => console.log(err))
            :
            fetch(`${process.env.REACT_APP_URL_BACKEND}work`)
                .then(res => res.json())
                .then(data => {
                    setWork(data.data)
                    setCount(data.data.length)
                })
                .catch(err => console.log(err))
    },[isNews])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: count > 3 ? 4 : count,
        slidesToScroll: 1,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: count > 3 ? 3 : count,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: count > 2 ? 2 : count,
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
    }

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
                                    code={news._id}
                                    content={news.content}
                                    created_at={news.created_at.substring(0, 10)}
                                    image={news.image}
                                    site={'news'}
                                />
                            ))
                            :
                            work && work.map(work => (
                                <Cards
                                    key={work.code}
                                    code={work._id}
                                    title={work.charge}
                                    content={work.description}
                                    created_at={work.created_at.substring(0, 10)}
                                    image={work.image}
                                    site={'work'}
                                    salary={`Salario base: $${work.base_salary} millones`}

                                />
                            ))
                    }

                </Slider>
            </div>
        </div>
    )
}

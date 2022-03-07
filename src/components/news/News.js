import { useEffect, useState } from 'react';
import './news.css';

const News = () => {

    const id = window.location.pathname.split('/')[2];
    const [news, setNews] = useState([]);
    
    const getData = async (url, meth) => {
        const response = await fetch(url, {
            method: meth,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        return response.json();
    }

    useEffect(() => {
        getData(`${process.env.REACT_APP_URL_BACKEND}news/${id}`, 'GET')
            .then(data => setNews(data.data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <div className="container-news">
            <div className="container-news-title">
                <a href={'..'}>Volver</a>
                <h1>Noticias</h1>
            </div>

            <div className="news-container">
                <div className="news-title">
                    <h2>{news.title}</h2>
                    <span>{news.created_at && news.created_at.substring(0, 10)}</span>
                </div>
                <div className="news-content">
                    <div className="news-content-image">
                        <img src={news.image} alt={news.image} />
                    </div>
                    {
                        news.content && news.content.split('\n').map((item, index) => (
                            <p key={index}>{item}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default News
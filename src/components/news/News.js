import { useEffect, useState } from 'react';
import './news.css';

const News = () => {

    const id = window.location.pathname.split('/')[2];
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_BACKEND}news/${id}`)
            .then(res => res.json())
            .then(data => setNews(data.data))
            .catch(err => console.log(err))
    }, [id])

  return (
    <div className="container-news">
        <div className="container-news-title">
            <h1>Noticias</h1>
        </div>

        <div className="news-container">
            <div className="news-title">
                <h2>{news.title}</h2>
            </div>
            <div className="news-content">
                <p>{news.content}</p>
            </div>
        </div>

    </div>
  )
}

export default News
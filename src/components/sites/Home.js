import Aside from "../aside/Aside"
import Navbar from "../navbar/Navbar"
import Content from "../content/Content"
import Footer from "../footer/Footer"
import { useEffect, useState } from 'react';


const Home = () => {
    const [isNews, setIsNews] = useState(true);

    useEffect(() => {
        setIsNews(window.location.pathname === '/work' ? false : true);
    }, [isNews])

    return (
        <>
            <Navbar />
            <div className={'body-container'}>
                <Aside />
                <Content isNews={isNews} />
            </div>
            <Footer />
        </>
    )
}

export default Home

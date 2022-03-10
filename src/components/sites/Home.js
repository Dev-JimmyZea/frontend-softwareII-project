import Aside from "../aside/Aside"
import Navbar from "../navbar/Navbar"
import Content from "../content/Content"
import Footer from "../footer/Footer"
import { useEffect, useState } from 'react'


const Home = ({ no_match }) => {
    const [isNews, setIsNews] = useState(true)
    no_match && window.history.pushState({}, '', '/')

    useEffect(() => {
        setIsNews(window.location.pathname === '/work' ? false : true)
    }, [isNews])

    return (
        <>
            <Navbar />
            <div className={'body-container'} id={'body-container'}>
                <Aside />
                <Content isNews={isNews} />
            </div>
            <Footer />
        </>
    )
}

export default Home

import Aside from "../aside/Aside"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import Forum from "../forum/Forum"

const Home = () => {

    return (
        <>
            <Navbar />
            <div className={'body-container'}>
                <Aside />
                <Forum />
            </div>
            <Footer />
        </>

    )
}

export default Home

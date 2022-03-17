import Aside from "../aside/Aside"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import Forum from "../forum/Forum"

const ListForums = () => {

    return (
        <>
            <Navbar />
            <div className={'body-container'} id={'body-container'}>
                <Aside />
                <Forum />
            </div>
            <Footer />
        </>

    )
}

export default ListForums

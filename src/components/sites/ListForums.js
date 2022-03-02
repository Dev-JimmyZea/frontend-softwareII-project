import Aside from "../aside/Aside"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import ListForumsC from "../forum/ListForums"

const ListForums = () => {

    return (
        <>
            <Navbar />
            <div className={'body-container'}>
                <Aside />
                <ListForumsC />
            </div>
            <Footer />
        </>

    )
}

export default ListForums

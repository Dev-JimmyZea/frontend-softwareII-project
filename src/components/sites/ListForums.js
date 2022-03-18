import Aside from "../aside/Aside"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import ListForumComponent from "../forum/ListForum"

const ListForums = () => {

    return (
        <>
            <Navbar />
            <div className={'body-container'} id={'body-container'}>
                <Aside />
                <ListForumComponent />
            </div>
            <Footer />
        </>

    )
}

export default ListForums

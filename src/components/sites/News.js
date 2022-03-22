import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import NewsComponent from "../news/News"
import ValidateUser from "../login/UserVerification"


const News = () => {
    return (
        <>
            <ValidateUser role={'ADMIN-AND-SUPERADMIN'}>
                <Navbar />
                <NewsComponent />
                <Footer />
            </ValidateUser>
        </>)
}

export default News
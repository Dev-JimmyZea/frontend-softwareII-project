import ValidateUser from "../login/UserVerification"
import Aside from "../aside/Aside"
import Navbar from "../navbar/Navbar"
import Content from "../content/Content"
import Footer from "../footer/Footer"

const Home = () => {
    return (
        // <ValidateUser>
            <>
                <Navbar />
                <div className={'body-container'}>
                    <Aside />
                    <Content />
                </div>
                <Footer />
            </>


        // </ValidateUser>
    )
}

export default Home

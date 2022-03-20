import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import Forum from "../forum/Forum"
import ValidateUser from "../login/UserVerification"


const Careers = () => {
    return (
        <>
            <ValidateUser role={'ALL'}>
                <Navbar />
                <Forum />
                <Footer />
            </ValidateUser>
        </>)
}

export default Careers
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import Career from "../careers/Career"
import ValidateUser from "../login/UserVerification"


const Careers = () => {
    return (
        <>
            <ValidateUser role={'SUPERADMIN'}>
                <Navbar />
                <Career />
                <Footer />
            </ValidateUser>
        </>)
}

export default Careers
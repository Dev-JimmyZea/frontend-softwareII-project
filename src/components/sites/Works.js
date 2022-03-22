import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import Work from "../works/Work"
import ValidateUser from "../login/UserVerification"


const Works = () => {
    return (
        <>
            <ValidateUser role={'ADMIN-AND-SUPERADMIN'}>
                <Navbar />
                <Work />
                <Footer />
            </ValidateUser>
        </>)
}

export default Works
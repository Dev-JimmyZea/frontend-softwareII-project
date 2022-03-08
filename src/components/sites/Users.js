import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import User from "../users/User"
import ValidateUser from "../login/UserVerification"


const Users = () => {
    return (
        <>
            <ValidateUser role={'SUPERADMIN'}>
                <Navbar />
                <User />
                <Footer />
            </ValidateUser>
        </>)
}

export default Users
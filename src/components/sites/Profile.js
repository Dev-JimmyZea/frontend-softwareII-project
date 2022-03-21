import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"
import ProfileUser from "../users/Profile"
import ValidateUser from "../login/UserVerification"


const Profile = () => {
    return (
        <>
            <ValidateUser role={'ALL'}>
                <Navbar />
                <ProfileUser />
                <Footer />
            </ValidateUser>
        </>)
}

export default Profile
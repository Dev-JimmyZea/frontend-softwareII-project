import './footer.css'


const Footer = () => {
    return (
        <div className={'footer-container'}>
            <div className={''}>
                <div className={''}>
                    <div className={''}>
                        <a href="./"><img  alt="logo" /></a>
                    </div>
                    <div className={''}>
                        <p>Copyright © 2018 <a href="./">Themefisher</a>. All Rights Reserved.</p>
                    </div>
                </div>
                <div className={''}>
                    <ul className="footer-menu">
                        <li><a href="./">Home</a></li>
                        <li><a href="./">About</a></li>
                        <li><a href="./">Services</a></li>
                        <li><a href="./">Pricing</a></li>
                        <li><a href="./">Blog</a></li>
                        <li><a href="./">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Footer

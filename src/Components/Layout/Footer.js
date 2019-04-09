import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__logo"></div>

            <div className="footer__description">
                FC Barcelona ©{(new Date()).getFullYear()}. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer;
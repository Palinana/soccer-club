import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <AppBar className="header">
                <Toolbar className="header-navigation">
                    <div className="header-navigation__logo-box">
                        <div className="header-navigation__logo">
                            <Link to="/"><div className="logo__image"></div></Link>
                        </div>
                    </div>

                    <Link to="/team"><Button className="header-navigation__link">Team</Button></Link>
                    <Link to="/matches"><Button className="header-navigation__link">Matches</Button></Link>

                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;
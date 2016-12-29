import React from 'react';
import {Link} from 'react-router';

const Header = () => {
    return (
        <header>
             <nav>
                <div className="container">
                <div className="logo pull-left"></div>
                <ul>
                    <li><Link to="#">Home</Link></li>
                    <li className="dropdown nav-item">
                        <a data-toggle="dropdown" className="dropdown-toggle " href="#">
                            Sviat
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            <div className="dropdown-item">
                                <i className="fa fa-sign-out header_fa"></i>
                                Log out
                            </div>
                        </ul>
                    </li>
                </ul>
                    </div>
            </nav>
        </header>
    )
};

export default Header;

import React from 'react';
import {Link} from 'react-router';

const Header = ({user, handleLogout}) => {
    return (
        <header>
             <nav>
                <div className="container">
                <div className="logo pull-left"></div>
                <ul>
                    { user ? <li className="dropdown nav-item">
                        <a data-toggle="dropdown" className="dropdown-toggle " href="#">
                            Hi, {user.name}
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            <div className="dropdown-item" onClick={handleLogout}>
                                <i className="fa fa-sign-out header_fa"></i>
                                Log out
                            </div>
                        </ul>
                    </li> :
                   <li><Link to="/login">Login</Link></li>
                    }
                </ul>
                    </div>
            </nav>
        </header>
    )
};

export default Header;

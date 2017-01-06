import React, { PropTypes } from 'react';
import Header from './Header';
import Auth from '../modules/Auth';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: Auth.getDecodedToken()
        }

        this.handleLogout = this.handleLogout.bind(this);

    }


    handleLogout() {
        const token = Auth.getToken();

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/auth/logout');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success

                // change the component-container state
                this.setState({
                    errors: {}
                });

                // set a message
                localStorage.setItem('successMessage', xhr.response.message);

                Auth.deauthenticateUser();
                this.context.router.replace('/');
            } else {
                // failure

                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(JSON.stringify(this.state.user));
    }

    render() {
        var childrenWithProps = React.cloneElement(this.props.children, this.state.user);
        return (
            <div>
                <Header user={this.state.user} handleLogout={this.handleLogout}/>
                {childrenWithProps}
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

export default App;
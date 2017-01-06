import React from 'react';
import App from '../components/App';
import Login from '../containers/LoginPage';
import Signup from '../containers/SignupPage';
import Chat from '../components/ChatApp';

import Auth from '../modules/Auth';

const routes = {
    component: App,
    childRoutes: [
        {
            path: '/',
            getComponent: (location, callback) => {
                Auth.isUserAuthenticated() ?
                callback(null, Chat) :
                callback(null, Login)
            }
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/signup',
            component: Signup
        }
    ]
};

export default routes;
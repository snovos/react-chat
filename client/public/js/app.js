import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Router, browserHistory }  from 'react-router';

import routes from './routes/index';

injectTapEventPlugin();
ReactDOM.render((
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory}>
        {routes}
    </Router>
</MuiThemeProvider>),
    document.getElementById('root'));
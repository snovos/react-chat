import React from 'react';
import Header from './Header';
import Chat from './ChatApp';
//import Users from './Users';

class App extends React.Component {
    render() {
        return (
            <div>
                <Chat />
            </div>
        );
    }
}

export default App;
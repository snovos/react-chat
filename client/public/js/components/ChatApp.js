import React from 'react';
import UsersList from './UsersList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import Auth from '../modules/Auth';

const socket = io();

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this._initialize = this._initialize.bind(this);
        this._messageRecieve = this._messageRecieve.bind(this);
        this._userJoined = this._userJoined.bind(this);
        this._userLeft = this._userLeft.bind(this);
        this.state = {users: [], messages: [], text: ''};
    }

    componentDidMount() {
        socket.on('init', this._initialize);
        socket.on('send:message', this._messageRecieve);
        socket.on('user:join', this._userJoined);
        socket.on('user:left', this._userLeft);
    }

    _initialize(data) {
        let user = Auth.getDecodedToken();
        this.setState({users:data});
        this.setState({user:user.name});
        socket.emit('join', user);
    }

    _messageRecieve(message) {
        var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }

    _userJoined(data) {
        var {users, messages} = this.state;
        var {name} = data;
        users.push(data);
        messages.push({
            user:'APPLICATION BOT',
            text: name + ' Joined',
            msgClass: 'bg-success'
        });
        this.setState({users, messages});
    }

    _userLeft(data) {
        var {users, messages} = this.state;
        var {name} = data;
        var index = users.findIndex(obj => obj.name == name);
        users.splice(index, 1);
        messages.push({
            user:'APPLICATION BOT',
            text: name + ' Left',
            msgClass: 'bg-danger text-warning'
        });
        this.setState({users, messages});
    }

    handleMessageSubmit(message) {
        let {messages} = this.state;
        messages.push(message);
        this.setState({messages});
        socket.emit('send:message', message);
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row chat-form">
                        <div className="col-md-8">
                            <MessageList
                                user={this.state.user}
                                messages={this.state.messages}
                            />
                            <MessageForm
                                onMessageSubmit={this.handleMessageSubmit}
                                user={this.state.user}
                            />

                        </div>
                        <div className="col-md-3 col-md-offset-1">
                            <UsersList
                                users={this.state.users}
                            />
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default ChatApp;
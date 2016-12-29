import React from 'react';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {text:''};
    }

    handleSubmit(e) {
        e.preventDefault();
        let message = {
            user : this.props.user,
            text : this.state.text
        };
        this.props.onMessageSubmit(message);
        this.setState({ text: '' });
    }

    changeHandler(e) {
        this.setState({ text : e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="input-group">
                        <input type="text" onChange={this.changeHandler}
                               value={this.state.text} id="msg" className="form-control" placeholder="Type message" />
                        <span className="input-group-btn">
                         <button className="btn btn-primary" type="SUBMIT">Send</button>
                    </span>
                    </div>
                </div>
            </form>
        );
    }
}

export default MessageList
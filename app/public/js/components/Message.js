import React from 'react';
import utils from '../utils/utils'

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.user.name === 'APPLICATION BOT' ?
            <div className={'bot-msg chat-message'}>
                <strong>{this.props.user.name} : </strong>
                {this.props.text}
            </div> :
            <div className={'bg-info chat-message'}>
                <div><strong>{this.props.user.name} : </strong> <span className="msg-time pull-right">{utils.formatAMPM(new Date())}</span></div>
                <div>{this.props.text}</div>
            </div>

    }
}

export default Message
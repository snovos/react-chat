import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='messages'>
                <div className="chat-header bg-primary">Recent Chat History</div>
                <div className="chat-box">

                  {
                    this.props.messages.map((message, i) => {
                        return (
                            <Message
                                key={i}
                                msgClass={message.msgClass}
                                user={message.user}
                                text={message.text}
                            />
                        );
                    })
                }
                </div>
            </div>
        );
    }
}

export default MessageList
import React from 'react';
import utils from '../utils/utils';
class UsersList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='users'>
                <div className="list-header bg-primary"> Online Users</div>
                <ul>
                    {
                        this.props.users.map((user, i) => {
                            let activeTime = utils.getActiveTime(user.time);
                            return (
                                <li key={i}>
                                    <span className="user-name">{user.name}</span>
                                    <span className="active-time">{activeTime}</span>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default UsersList
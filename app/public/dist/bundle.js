(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));

},{"./components/App":2,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _ChatApp = require('./ChatApp');

var _ChatApp2 = _interopRequireDefault(_ChatApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Users from './Users';

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_ChatApp2.default, null)
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;

},{"./ChatApp":3,"./Header":4,"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _UsersList = require('./UsersList');

var _UsersList2 = _interopRequireDefault(_UsersList);

var _MessageList = require('./MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _MessageForm = require('./MessageForm');

var _MessageForm2 = _interopRequireDefault(_MessageForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var socket = io();

var ChatApp = function (_React$Component) {
    _inherits(ChatApp, _React$Component);

    function ChatApp(props) {
        _classCallCheck(this, ChatApp);

        var _this = _possibleConstructorReturn(this, (ChatApp.__proto__ || Object.getPrototypeOf(ChatApp)).call(this, props));

        _this.handleMessageSubmit = _this.handleMessageSubmit.bind(_this);
        _this._initialize = _this._initialize.bind(_this);
        _this._messageRecieve = _this._messageRecieve.bind(_this);
        _this._userJoined = _this._userJoined.bind(_this);
        _this._userLeft = _this._userLeft.bind(_this);
        _this._userChangedName = _this._userChangedName.bind(_this);
        _this.state = { users: [], messages: [], text: '' };
        return _this;
    }

    _createClass(ChatApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            socket.on('init', this._initialize);
            socket.on('send:message', this._messageRecieve);
            socket.on('user:join', this._userJoined);
            socket.on('user:left', this._userLeft);
            socket.on('change:name', this._userChangedName);
        }
    }, {
        key: '_initialize',
        value: function _initialize(data) {
            var users = data.users,
                name = data.name;

            this.setState({ users: users, user: { name: name, time: new Date() } });
        }
    }, {
        key: '_messageRecieve',
        value: function _messageRecieve(message) {
            var messages = this.state.messages;

            messages.push(message);
            this.setState({ messages: messages });
        }
    }, {
        key: '_userJoined',
        value: function _userJoined(data) {
            var _state = this.state,
                users = _state.users,
                messages = _state.messages;
            var name = data.name;

            users.push(data);
            messages.push({
                user: { name: 'APPLICATION BOT' },
                text: name + ' Joined',
                msgClass: 'bg-success'
            });
            this.setState({ users: users, messages: messages });
        }
    }, {
        key: '_userLeft',
        value: function _userLeft(data) {
            var _state2 = this.state,
                users = _state2.users,
                messages = _state2.messages;
            var name = data.name;

            var index = users.findIndex(function (obj) {
                return obj.name == name;
            });
            users.splice(index, 1);
            messages.push({
                user: { name: 'APPLICATION BOT' },
                text: name + ' Left',
                msgClass: 'bg-danger text-warning'
            });
            this.setState({ users: users, messages: messages });
        }
    }, {
        key: '_userChangedName',
        value: function _userChangedName(data) {
            var oldName = data.oldName,
                newName = data.newName;
            var _state3 = this.state,
                users = _state3.users,
                messages = _state3.messages;

            var index = users.indexOf(oldName);
            users.splice(index, 1, newName);
            messages.push({
                user: 'APPLICATION BOT',
                text: 'Change Name : ' + oldName + ' ==> ' + newName
            });
            this.setState({ users: users, messages: messages });
        }
    }, {
        key: 'handleMessageSubmit',
        value: function handleMessageSubmit(message) {
            var messages = this.state.messages;

            messages.push(message);
            this.setState({ messages: messages });
            socket.emit('send:message', message);
        }
    }, {
        key: 'handleChangeName',
        value: function handleChangeName(newName) {
            var _this2 = this;

            var oldName = this.state.user;
            socket.emit('change:name', { name: newName }, function (result) {
                if (!result) {
                    return alert('There was an error changing your name');
                }
                var users = _this2.state.users;

                var index = users.indexOf(oldName);
                users.splice(index, 1, newName);
                _this2.setState({ users: users, user: newName });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Header2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row chat-form' },
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-8' },
                            _react2.default.createElement(_MessageList2.default, {
                                user: this.state.user,
                                messages: this.state.messages
                            }),
                            _react2.default.createElement(_MessageForm2.default, {
                                onMessageSubmit: this.handleMessageSubmit,
                                user: this.state.user
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-md-3 col-md-offset-1' },
                            _react2.default.createElement(_UsersList2.default, {
                                users: this.state.users
                            })
                        )
                    )
                )
            );
        }
    }]);

    return ChatApp;
}(_react2.default.Component);

exports.default = ChatApp;

},{"./Header":4,"./MessageForm":6,"./MessageList":7,"./UsersList":8,"react":"react"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header() {
    return _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(
            'nav',
            null,
            _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement('div', { className: 'logo pull-left' }),
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '#' },
                            'Home'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'dropdown nav-item' },
                        _react2.default.createElement(
                            'a',
                            { 'data-toggle': 'dropdown', className: 'dropdown-toggle ', href: '#' },
                            'Sviat',
                            _react2.default.createElement('span', { className: 'caret' })
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'dropdown-menu' },
                            _react2.default.createElement(
                                'div',
                                { className: 'dropdown-item' },
                                _react2.default.createElement('i', { className: 'fa fa-sign-out header_fa' }),
                                'Log out'
                            )
                        )
                    )
                )
            )
        )
    );
};

exports.default = Header;

},{"react":"react","react-router":"react-router"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_React$Component) {
    _inherits(Message, _React$Component);

    function Message(props) {
        _classCallCheck(this, Message);

        return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).call(this, props));
    }

    _createClass(Message, [{
        key: 'render',
        value: function render() {
            return this.props.user.name === 'APPLICATION BOT' ? _react2.default.createElement(
                'div',
                { className: 'bot-msg chat-message' },
                _react2.default.createElement(
                    'strong',
                    null,
                    this.props.user.name,
                    ' : '
                ),
                this.props.text
            ) : _react2.default.createElement(
                'div',
                { className: 'bg-info chat-message' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'strong',
                        null,
                        this.props.user.name,
                        ' : '
                    ),
                    ' ',
                    _react2.default.createElement(
                        'span',
                        { className: 'msg-time pull-right' },
                        _utils2.default.formatAMPM(new Date())
                    )
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    this.props.text
                )
            );
        }
    }]);

    return Message;
}(_react2.default.Component);

exports.default = Message;

},{"../utils/utils":9,"react":"react"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageList = function (_React$Component) {
    _inherits(MessageList, _React$Component);

    function MessageList(props) {
        _classCallCheck(this, MessageList);

        var _this = _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).call(this, props));

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.changeHandler = _this.changeHandler.bind(_this);
        _this.state = { text: '' };
        return _this;
    }

    _createClass(MessageList, [{
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var message = {
                user: this.props.user,
                text: this.state.text
            };
            this.props.onMessageSubmit(message);
            this.setState({ text: '' });
        }
    }, {
        key: 'changeHandler',
        value: function changeHandler(e) {
            this.setState({ text: e.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'input-group' },
                        _react2.default.createElement('input', { type: 'text', onChange: this.changeHandler,
                            value: this.state.text, id: 'msg', className: 'form-control', placeholder: 'Type message' }),
                        _react2.default.createElement(
                            'span',
                            { className: 'input-group-btn' },
                            _react2.default.createElement(
                                'button',
                                { className: 'btn btn-primary', type: 'SUBMIT' },
                                'Send'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return MessageList;
}(_react2.default.Component);

exports.default = MessageList;

},{"react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageList = function (_React$Component) {
    _inherits(MessageList, _React$Component);

    function MessageList(props) {
        _classCallCheck(this, MessageList);

        return _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).call(this, props));
    }

    _createClass(MessageList, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'messages' },
                _react2.default.createElement(
                    'div',
                    { className: 'chat-header bg-primary' },
                    'Recent Chat History'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'chat-box' },
                    this.props.messages.map(function (message, i) {
                        return _react2.default.createElement(_Message2.default, {
                            key: i,
                            msgClass: message.msgClass,
                            user: message.user,
                            text: message.text
                        });
                    })
                )
            );
        }
    }]);

    return MessageList;
}(_react2.default.Component);

exports.default = MessageList;

},{"./Message":5,"react":"react"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UsersList = function (_React$Component) {
    _inherits(UsersList, _React$Component);

    function UsersList(props) {
        _classCallCheck(this, UsersList);

        return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).call(this, props));
    }

    _createClass(UsersList, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'users' },
                _react2.default.createElement(
                    'div',
                    { className: 'list-header bg-primary' },
                    ' Online Users'
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    this.props.users.map(function (user, i) {
                        var activeTime = _utils2.default.getActiveTime(user.time);
                        return _react2.default.createElement(
                            'li',
                            { key: i },
                            _react2.default.createElement(
                                'span',
                                { className: 'user-name' },
                                user.name
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'active-time' },
                                activeTime
                            )
                        );
                    })
                )
            );
        }
    }]);

    return UsersList;
}(_react2.default.Component);

exports.default = UsersList;

},{"../utils/utils":9,"react":"react"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    getActiveTime: function getActiveTime(time) {
        var preffix = ' Active for ';
        var units = [{ name: "second", limit: 60, in_seconds: 1 }, { name: "minute", limit: 3600, in_seconds: 60 }, { name: "hour", limit: 86400, in_seconds: 3600 }];
        var diff = (new Date() - new Date(time)) / 1000;
        if (diff < 5) return "";

        var i = 0,
            unit;
        while (unit = units[i++]) {
            if (diff < unit.limit || !unit.limit) {
                diff = Math.floor(diff / unit.in_seconds);
                return preffix + diff + " " + unit.name + (diff > 1 ? "s" : "");
            }
        }
    },
    formatAMPM: function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvcHVibGljL2pzL2FwcC5qcyIsImFwcC9wdWJsaWMvanMvY29tcG9uZW50cy9BcHAuanMiLCJhcHAvcHVibGljL2pzL2NvbXBvbmVudHMvQ2hhdEFwcC5qcyIsImFwcC9wdWJsaWMvanMvY29tcG9uZW50cy9IZWFkZXIuanMiLCJhcHAvcHVibGljL2pzL2NvbXBvbmVudHMvTWVzc2FnZS5qcyIsImFwcC9wdWJsaWMvanMvY29tcG9uZW50cy9NZXNzYWdlRm9ybS5qcyIsImFwcC9wdWJsaWMvanMvY29tcG9uZW50cy9NZXNzYWdlTGlzdC5qcyIsImFwcC9wdWJsaWMvanMvY29tcG9uZW50cy9Vc2Vyc0xpc3QuanMiLCJhcHAvcHVibGljL2pzL3V0aWxzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztBQUdBLG1CQUFTLE1BQVQsQ0FBZ0Isa0RBQWhCLEVBQXlCLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUF6Qjs7Ozs7Ozs7Ozs7QUNOQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBOztJQUVNLEc7Ozs7Ozs7Ozs7O2lDQUNPO0FBQ0wsbUJBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFESixhQURKO0FBS0g7Ozs7RUFQYSxnQkFBTSxTOztrQkFVVCxHOzs7Ozs7Ozs7OztBQ2ZmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sU0FBUyxJQUFmOztJQUVNLE87OztBQUNGLHFCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxzSEFDVCxLQURTOztBQUVmLGNBQUssbUJBQUwsR0FBMkIsTUFBSyxtQkFBTCxDQUF5QixJQUF6QixPQUEzQjtBQUNBLGNBQUssV0FBTCxHQUFtQixNQUFLLFdBQUwsQ0FBaUIsSUFBakIsT0FB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T0FBTyxNQUFNLEdBQU4sQ0FBZCxFQUEwQjtBQUN0QixnQkFBSSxPQUFPLEtBQUssS0FBWixJQUFxQixDQUFDLEtBQUssS0FBL0IsRUFBc0M7QUFDbEMsdUJBQU8sS0FBSyxLQUFMLENBQVcsT0FBTyxLQUFLLFVBQXZCLENBQVA7QUFDQSx1QkFBTyxVQUFVLElBQVYsR0FBaUIsR0FBakIsR0FBdUIsS0FBSyxJQUE1QixJQUFvQyxPQUFPLENBQVAsR0FBVyxHQUFYLEdBQWlCLEVBQXJELENBQVA7QUFDSDtBQUNKO0FBQ0osS0FsQlU7QUFvQlgsY0FwQlcsc0JBb0JBLElBcEJBLEVBb0JNO0FBQ2IsWUFBSSxRQUFRLEtBQUssUUFBTCxFQUFaO0FBQ0EsWUFBSSxVQUFVLEtBQUssVUFBTCxFQUFkO0FBQ0EsWUFBSSxPQUFPLFNBQVMsRUFBVCxHQUFjLElBQWQsR0FBcUIsSUFBaEM7QUFDQSxnQkFBUSxRQUFRLEVBQWhCO0FBQ0EsZ0JBQVEsUUFBUSxLQUFSLEdBQWdCLEVBQXhCLENBTGEsQ0FLZTtBQUM1QixrQkFBVSxVQUFVLEVBQVYsR0FBZSxNQUFJLE9BQW5CLEdBQTZCLE9BQXZDO0FBQ0EsZUFBTyxRQUFRLEdBQVIsR0FBYyxPQUFkLEdBQXdCLEdBQXhCLEdBQThCLElBQXJDO0FBQ1A7QUE1QmMsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL0FwcCc7XG5cblxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpOyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcbmltcG9ydCBDaGF0IGZyb20gJy4vQ2hhdEFwcCc7XG4vL2ltcG9ydCBVc2VycyBmcm9tICcuL1VzZXJzJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxDaGF0IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5pbXBvcnQgVXNlcnNMaXN0IGZyb20gJy4vVXNlcnNMaXN0JztcbmltcG9ydCBNZXNzYWdlTGlzdCBmcm9tICcuL01lc3NhZ2VMaXN0JztcbmltcG9ydCBNZXNzYWdlRm9ybSBmcm9tICcuL01lc3NhZ2VGb3JtJztcblxuY29uc3Qgc29ja2V0ID0gaW8oKTtcblxuY2xhc3MgQ2hhdEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLmhhbmRsZU1lc3NhZ2VTdWJtaXQgPSB0aGlzLmhhbmRsZU1lc3NhZ2VTdWJtaXQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZSA9IHRoaXMuX2luaXRpYWxpemUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5fbWVzc2FnZVJlY2lldmUgPSB0aGlzLl9tZXNzYWdlUmVjaWV2ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl91c2VySm9pbmVkID0gdGhpcy5fdXNlckpvaW5lZC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl91c2VyTGVmdCA9IHRoaXMuX3VzZXJMZWZ0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX3VzZXJDaGFuZ2VkTmFtZSA9IHRoaXMuX3VzZXJDaGFuZ2VkTmFtZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge3VzZXJzOiBbXSwgbWVzc2FnZXM6IFtdLCB0ZXh0OiAnJ307XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHNvY2tldC5vbignaW5pdCcsIHRoaXMuX2luaXRpYWxpemUpO1xuICAgICAgICBzb2NrZXQub24oJ3NlbmQ6bWVzc2FnZScsIHRoaXMuX21lc3NhZ2VSZWNpZXZlKTtcbiAgICAgICAgc29ja2V0Lm9uKCd1c2VyOmpvaW4nLCB0aGlzLl91c2VySm9pbmVkKTtcbiAgICAgICAgc29ja2V0Lm9uKCd1c2VyOmxlZnQnLCB0aGlzLl91c2VyTGVmdCk7XG4gICAgICAgIHNvY2tldC5vbignY2hhbmdlOm5hbWUnLCB0aGlzLl91c2VyQ2hhbmdlZE5hbWUpO1xuICAgIH1cblxuICAgIF9pbml0aWFsaXplKGRhdGEpIHtcbiAgICAgICAgdmFyIHt1c2VycywgbmFtZX0gPSBkYXRhO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VycywgdXNlcjoge25hbWU6IG5hbWUsIHRpbWU6IG5ldyBEYXRlKCl9fSk7XG4gICAgfVxuXG4gICAgX21lc3NhZ2VSZWNpZXZlKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIHttZXNzYWdlc30gPSB0aGlzLnN0YXRlO1xuICAgICAgICBtZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlc30pO1xuICAgIH1cblxuICAgIF91c2VySm9pbmVkKGRhdGEpIHtcbiAgICAgICAgdmFyIHt1c2VycywgbWVzc2FnZXN9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIHtuYW1lfSA9IGRhdGE7XG4gICAgICAgIHVzZXJzLnB1c2goZGF0YSk7XG4gICAgICAgIG1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgICAgdXNlcjoge25hbWU6J0FQUExJQ0FUSU9OIEJPVCd9LFxuICAgICAgICAgICAgdGV4dDogbmFtZSArICcgSm9pbmVkJyxcbiAgICAgICAgICAgIG1zZ0NsYXNzOiAnYmctc3VjY2VzcydcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3VzZXJzLCBtZXNzYWdlc30pO1xuICAgIH1cblxuICAgIF91c2VyTGVmdChkYXRhKSB7XG4gICAgICAgIHZhciB7dXNlcnMsIG1lc3NhZ2VzfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHZhciB7bmFtZX0gPSBkYXRhO1xuICAgICAgICB2YXIgaW5kZXggPSB1c2Vycy5maW5kSW5kZXgob2JqID0+IG9iai5uYW1lID09IG5hbWUpO1xuICAgICAgICB1c2Vycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgIHVzZXI6IHtuYW1lOidBUFBMSUNBVElPTiBCT1QnfSxcbiAgICAgICAgICAgIHRleHQ6IG5hbWUgKyAnIExlZnQnLFxuICAgICAgICAgICAgbXNnQ2xhc3M6ICdiZy1kYW5nZXIgdGV4dC13YXJuaW5nJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcnMsIG1lc3NhZ2VzfSk7XG4gICAgfVxuXG4gICAgX3VzZXJDaGFuZ2VkTmFtZShkYXRhKSB7XG4gICAgICAgIHZhciB7b2xkTmFtZSwgbmV3TmFtZX0gPSBkYXRhO1xuICAgICAgICB2YXIge3VzZXJzLCBtZXNzYWdlc30gPSB0aGlzLnN0YXRlO1xuICAgICAgICB2YXIgaW5kZXggPSB1c2Vycy5pbmRleE9mKG9sZE5hbWUpO1xuICAgICAgICB1c2Vycy5zcGxpY2UoaW5kZXgsIDEsIG5ld05hbWUpO1xuICAgICAgICBtZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgICAgIHVzZXI6ICdBUFBMSUNBVElPTiBCT1QnLFxuICAgICAgICAgICAgdGV4dDogJ0NoYW5nZSBOYW1lIDogJyArIG9sZE5hbWUgKyAnID09PiAnICsgbmV3TmFtZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dXNlcnMsIG1lc3NhZ2VzfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlTWVzc2FnZVN1Ym1pdChtZXNzYWdlKSB7XG4gICAgICAgIGxldCB7bWVzc2FnZXN9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgbWVzc2FnZXMucHVzaChtZXNzYWdlKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZXN9KTtcbiAgICAgICAgc29ja2V0LmVtaXQoJ3NlbmQ6bWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZUNoYW5nZU5hbWUobmV3TmFtZSkge1xuICAgICAgICB2YXIgb2xkTmFtZSA9IHRoaXMuc3RhdGUudXNlcjtcbiAgICAgICAgc29ja2V0LmVtaXQoJ2NoYW5nZTpuYW1lJywge25hbWU6IG5ld05hbWV9LCAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbGVydCgnVGhlcmUgd2FzIGFuIGVycm9yIGNoYW5naW5nIHlvdXIgbmFtZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHt1c2Vyc30gPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdXNlcnMuaW5kZXhPZihvbGROYW1lKTtcbiAgICAgICAgICAgIHVzZXJzLnNwbGljZShpbmRleCwgMSwgbmV3TmFtZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1c2VycywgdXNlcjogbmV3TmFtZX0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxIZWFkZXIvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93IGNoYXQtZm9ybVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlTGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyPXt0aGlzLnN0YXRlLnVzZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzPXt0aGlzLnN0YXRlLm1lc3NhZ2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VGb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTWVzc2FnZVN1Ym1pdD17dGhpcy5oYW5kbGVNZXNzYWdlU3VibWl0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyPXt0aGlzLnN0YXRlLnVzZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0zIGNvbC1tZC1vZmZzZXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxVc2Vyc0xpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcnM9e3RoaXMuc3RhdGUudXNlcnN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdEFwcDsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtMaW5rfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG5jb25zdCBIZWFkZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2dvIHB1bGwtbGVmdFwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxMaW5rIHRvPVwiI1wiPkhvbWU8L0xpbms+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImRyb3Bkb3duIG5hdi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCIgY2xhc3NOYW1lPVwiZHJvcGRvd24tdG9nZ2xlIFwiIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU3ZpYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjYXJldFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJkcm9wZG93bi1tZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcm9wZG93bi1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNpZ24tb3V0IGhlYWRlcl9mYVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nIG91dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICA8L2hlYWRlcj5cbiAgICApXG59O1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJ1xuXG5jbGFzcyBNZXNzYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy51c2VyLm5hbWUgPT09ICdBUFBMSUNBVElPTiBCT1QnID9cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYm90LW1zZyBjaGF0LW1lc3NhZ2UnfT5cbiAgICAgICAgICAgICAgICA8c3Ryb25nPnt0aGlzLnByb3BzLnVzZXIubmFtZX0gOiA8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgPC9kaXY+IDpcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnYmctaW5mbyBjaGF0LW1lc3NhZ2UnfT5cbiAgICAgICAgICAgICAgICA8ZGl2PjxzdHJvbmc+e3RoaXMucHJvcHMudXNlci5uYW1lfSA6IDwvc3Ryb25nPiA8c3BhbiBjbGFzc05hbWU9XCJtc2ctdGltZSBwdWxsLXJpZ2h0XCI+e3V0aWxzLmZvcm1hdEFNUE0obmV3IERhdGUoKSl9PC9zcGFuPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMudGV4dH08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgTWVzc2FnZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSB0aGlzLmNoYW5nZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHt0ZXh0OicnfTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdWJtaXQoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgdXNlciA6IHRoaXMucHJvcHMudXNlcixcbiAgICAgICAgICAgIHRleHQgOiB0aGlzLnN0YXRlLnRleHRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk1lc3NhZ2VTdWJtaXQobWVzc2FnZSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0ZXh0OiAnJyB9KTtcbiAgICB9XG5cbiAgICBjaGFuZ2VIYW5kbGVyKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHRleHQgOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBvbkNoYW5nZT17dGhpcy5jaGFuZ2VIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnRleHR9IGlkPVwibXNnXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJUeXBlIG1lc3NhZ2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiU1VCTUlUXCI+U2VuZDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZUxpc3QiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9NZXNzYWdlJztcblxuY2xhc3MgTWVzc2FnZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWVzc2FnZXMnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhdC1oZWFkZXIgYmctcHJpbWFyeVwiPlJlY2VudCBDaGF0IEhpc3Rvcnk8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYXQtYm94XCI+XG5cbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5tZXNzYWdlcy5tYXAoKG1lc3NhZ2UsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtc2dDbGFzcz17bWVzc2FnZS5tc2dDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcj17bWVzc2FnZS51c2VyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0PXttZXNzYWdlLnRleHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlTGlzdCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xuY2xhc3MgVXNlcnNMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3VzZXJzJz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtaGVhZGVyIGJnLXByaW1hcnlcIj4gT25saW5lIFVzZXJzPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnVzZXJzLm1hcCgodXNlciwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3RpdmVUaW1lID0gdXRpbHMuZ2V0QWN0aXZlVGltZSh1c2VyLnRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidXNlci1uYW1lXCI+e3VzZXIubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhY3RpdmUtdGltZVwiPnthY3RpdmVUaW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJzTGlzdCIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBnZXRBY3RpdmVUaW1lKHRpbWUpIHtcbiAgICAgICAgdmFyIHByZWZmaXggPSAnIEFjdGl2ZSBmb3IgJztcbiAgICAgICAgdmFyIHVuaXRzID0gW1xuICAgICAgICAgICAge25hbWU6IFwic2Vjb25kXCIsIGxpbWl0OiA2MCwgaW5fc2Vjb25kczogMX0sXG4gICAgICAgICAgICB7bmFtZTogXCJtaW51dGVcIiwgbGltaXQ6IDM2MDAsIGluX3NlY29uZHM6IDYwfSxcbiAgICAgICAgICAgIHtuYW1lOiBcImhvdXJcIiwgbGltaXQ6IDg2NDAwLCBpbl9zZWNvbmRzOiAzNjAwfSxcbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGRpZmYgPSAobmV3IERhdGUoKSAtIG5ldyBEYXRlKHRpbWUpKSAvIDEwMDA7XG4gICAgICAgIGlmIChkaWZmIDwgNSkgcmV0dXJuIFwiXCI7XG5cbiAgICAgICAgdmFyIGkgPSAwLCB1bml0O1xuICAgICAgICB3aGlsZSAodW5pdCA9IHVuaXRzW2krK10pIHtcbiAgICAgICAgICAgIGlmIChkaWZmIDwgdW5pdC5saW1pdCB8fCAhdW5pdC5saW1pdCkge1xuICAgICAgICAgICAgICAgIGRpZmYgPSBNYXRoLmZsb29yKGRpZmYgLyB1bml0LmluX3NlY29uZHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmVmZml4ICsgZGlmZiArIFwiIFwiICsgdW5pdC5uYW1lICsgKGRpZmYgPiAxID8gXCJzXCIgOiBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmb3JtYXRBTVBNKGRhdGUpIHtcbiAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xuICAgICAgICB2YXIgbWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICB2YXIgYW1wbSA9IGhvdXJzID49IDEyID8gJ3BtJyA6ICdhbSc7XG4gICAgICAgIGhvdXJzID0gaG91cnMgJSAxMjtcbiAgICAgICAgaG91cnMgPSBob3VycyA/IGhvdXJzIDogMTI7IC8vIHRoZSBob3VyICcwJyBzaG91bGQgYmUgJzEyJ1xuICAgICAgICBtaW51dGVzID0gbWludXRlcyA8IDEwID8gJzAnK21pbnV0ZXMgOiBtaW51dGVzO1xuICAgICAgICByZXR1cm4gaG91cnMgKyAnOicgKyBtaW51dGVzICsgJyAnICsgYW1wbTtcbn1cbn0iXX0=

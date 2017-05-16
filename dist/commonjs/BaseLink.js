'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseLink = function (_Component) {
    _inherits(BaseLink, _Component);

    function BaseLink(props, context) {
        _classCallCheck(this, BaseLink);

        var _this = _possibleConstructorReturn(this, (BaseLink.__proto__ || Object.getPrototypeOf(BaseLink)).call(this, props, context));

        _this.router = context.router;

        if (!_this.router.hasPlugin('BROWSER_PLUGIN')) {
            console.error('[react-router5][BaseLink] missing browser plugin, href might be build incorrectly');
        };

        _this.isActive = _this.isActive.bind(_this);
        _this.clickHandler = _this.clickHandler.bind(_this);

        _this.state = { active: _this.isActive() };
        return _this;
    }

    _createClass(BaseLink, [{
        key: 'buildUrl',
        value: function buildUrl(routeName, routeParams) {
            if (this.router.buildUrl) {
                return this.router.buildUrl(routeName, routeParams);
            }

            return this.router.buildPath(routeName, routeParams);
        }
    }, {
        key: 'isActive',
        value: function isActive() {
            return this.router.isActive(this.props.routeName, this.props.routeParams, this.props.activeStrict);
        }
    }, {
        key: 'clickHandler',
        value: function clickHandler(evt) {
            if (this.props.onClick) {
                this.props.onClick(evt);

                if (evt.defaultPrevented) {
                    return;
                }
            }

            var comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;

            if (evt.button === 0 && !comboKey) {
                evt.preventDefault();
                this.router.navigate(this.props.routeName, this.props.routeParams, this.props.routeOptions);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                routeName = _props.routeName,
                routeParams = _props.routeParams,
                className = _props.className,
                activeClassName = _props.activeClassName,
                children = _props.children,
                title = _props.title;


            var active = this.isActive();
            var href = this.buildUrl(routeName, routeParams);
            var linkclassName = (className ? className.split(' ') : []).concat(active ? [activeClassName] : []).join(' ');

            return _react2.default.createElement('a', {
                href: href,
                className: linkclassName,
                onClick: this.clickHandler,
                title: title
            }, children);
        }
    }]);

    return BaseLink;
}(_react.Component);

BaseLink.contextTypes = {
    router: _propTypes2.default.object.isRequired
};

BaseLink.propTypes = {
    routeName: _propTypes2.default.string.isRequired,
    routeParams: _propTypes2.default.object,
    routeOptions: _propTypes2.default.object,
    activeClassName: _propTypes2.default.string,
    activeStrict: _propTypes2.default.bool,
    onClick: _propTypes2.default.func
};

BaseLink.defaultProps = {
    activeClassName: 'active',
    activeStrict: false,
    routeParams: {},
    routeOptions: {}
};

exports.default = BaseLink;
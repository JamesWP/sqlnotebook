var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../typings/react/react.d.ts" />
var React = require('react');
var Window = (function (_super) {
    __extends(Window, _super);
    function Window() {
        _super.call(this);
    }
    Window.prototype.render = function () {
        return React.createElement("div", null, "Lol");
    };
    return Window;
})(React.Component);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PhotoCommand = (function () {
    function PhotoCommand(url, commandOne, commandTwo, date, isShow) {
        this.url = url;
        this.commandOne = commandOne;
        this.commandTwo = commandTwo;
        this.date = date;
        this.isShow = isShow;
    }
    return PhotoCommand;
}());
exports.PhotoCommand = PhotoCommand;
var Display = (function () {
    function Display(url, position) {
        this.url = url;
        this.position = position;
    }
    return Display;
}());
exports.Display = Display;
//# sourceMappingURL=photo.js.map
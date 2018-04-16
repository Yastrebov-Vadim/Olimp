"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserAuthentication = (function () {
    function UserAuthentication(login, password) {
        this.login = login;
        this.password = password;
    }
    return UserAuthentication;
}());
exports.UserAuthentication = UserAuthentication;
var UserRegistration = (function () {
    function UserRegistration(login, password, email, commandName, mobile, code) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.commandName = commandName;
        this.mobile = mobile;
        this.code = code;
    }
    return UserRegistration;
}());
exports.UserRegistration = UserRegistration;
var Account = (function () {
    function Account(name, isAuth) {
        this.name = name;
        this.isAuth = isAuth;
    }
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=user.js.map
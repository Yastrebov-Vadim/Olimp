"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Urls = (function () {
    function Urls() {
        this.authorization = 'api/Authorize/Authorization';
        this.account = 'api/Authorize/GetAccount';
        this.exit = 'api/Authorize/Exit';
        this.registration = 'api/Authorize/Registration';
        this.confirmTheCode = 'api/Authorize/ConfirmTheCode';
        this.replacePassvord = 'api/Authorize/ReplacePassvord';
        this.newsBriefly = 'api/News/GetNewsBriefly';
        this.codToEmail = 'api/Email/SingCodeToEmail';
        this.getAccount = 'api/Account/GetAccount';
        this.addPlayer = 'api/Account/AddPlayer';
        this.dellPlayer = 'api/Account/DellPlayer';
        this.editAccountInfo = 'api/Account/EditAccountInfo';
        this.getImageAvatar = 'api/Image/GetImageAvatar';
        this.command = 'api/Public/GetCommand';
        this.commandFilter = 'api/Public/GetCommandFilter';
    }
    return Urls;
}());
exports.Urls = Urls;
//# sourceMappingURL=urls.js.map
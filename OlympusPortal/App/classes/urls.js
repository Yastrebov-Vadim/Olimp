"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Urls = (function () {
    function Urls() {
        this.signInUser = 'api/Authorize/SignInUser';
        this.account = 'api/Authorize/GetAccount';
        this.signOutUser = 'api/Authorize/SignOutUser';
        this.registration = 'api/Authorize/Registration';
        this.confirmTheCode = 'api/Authorize/ConfirmTheCode';
        this.replacePassvord = 'api/Authorize/ReplacePassvord';
        this.getNewsActiveTop = 'api/News/GetNewsActiveTop';
        this.getNewsActive = 'api/News/GetNewsActive';
        this.codToEmail = 'api/Email/SingCodeToEmail';
        this.getAccount = 'api/Account/GetAccountInfo';
        this.addPlayer = 'api/Account/AddPlayer';
        this.dellPlayer = 'api/Account/DellPlayer';
        this.editAccountInfo = 'api/Account/EditAccountInfo';
        this.addImageAvatar = 'api/Image/AddImageAvatar';
        this.command = 'api/Public/GetCommand';
        this.commandFilter = 'api/Public/GetCommandFilter';
        this.getPhoto = 'api/Public/GetPhoto';
        this.isAuth = 'api/AuthorizeAdmin/IsAuth';
        this.signInAdmin = 'api/AuthorizeAdmin/SignIn';
        this.signOutAdmin = 'api/AuthorizeAdmin/SignOutAdmin';
        this.getNewsInfo = 'api/NewsAdmin/GetNewsInfo';
        this.getNews = 'api/NewsAdmin/GetNews';
        this.dellNews = 'api/NewsAdmin/DellNews';
        this.addNews = 'api/NewsAdmin/AddNews';
        this.saveNews = 'api/NewsAdmin/SaveNews';
        this.activeNews = 'api/NewsAdmin/ActiveNews';
        this.addImgNewsTypeText = 'api/FileAdmin/AddImgNewsTypeText';
        this.addImgNewsTypePhoto = 'api/FileAdmin/AddImgNewsTypePhoto';
        this.addVideoForNews = 'api/FileAdmin/AddVideoForNews';
        this.dellPhoto = 'api/FileAdmin/DellPhoto';
    }
    return Urls;
}());
exports.Urls = Urls;
//# sourceMappingURL=urls.js.map
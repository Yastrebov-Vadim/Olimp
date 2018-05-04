export class Urls {
    readonly signInUser = 'api/Authorize/SignInUser';
    readonly account = 'api/Authorize/GetAccount';
    readonly signOutUser = 'api/Authorize/SignOutUser';
    readonly registration = 'api/Authorize/Registration';
    readonly confirmTheCode = 'api/Authorize/ConfirmTheCode';
    readonly replacePassvord = 'api/Authorize/ReplacePassvord';
    

    readonly getNewsActiveTop = 'api/News/GetNewsActiveTop';
    readonly getNewsActive = 'api/News/GetNewsActive';
    
    readonly codToEmail = 'api/Email/SingCodeToEmail';

    readonly getAccount = 'api/Account/GetAccountInfo';
    readonly addPlayer = 'api/Account/AddPlayer';
    readonly dellPlayer = 'api/Account/DellPlayer';
    readonly editAccountInfo = 'api/Account/EditAccountInfo';

    readonly addImageAvatar = 'api/Image/AddImageAvatar';

    readonly command = 'api/Public/GetCommand';
    readonly commandFilter = 'api/Public/GetCommandFilter';
    readonly getPhoto = 'api/Public/GetPhoto';
    
    readonly isAuth = 'api/AuthorizeAdmin/IsAuth';
    readonly signInAdmin = 'api/AuthorizeAdmin/SignIn';
    readonly signOutAdmin = 'api/AuthorizeAdmin/SignOutAdmin';

    readonly getNewsInfo = 'api/NewsAdmin/GetNewsInfo';
    readonly getNews = 'api/NewsAdmin/GetNews';
    readonly dellNews = 'api/NewsAdmin/DellNews';
    readonly addNews = 'api/NewsAdmin/AddNews';
    readonly saveNews = 'api/NewsAdmin/SaveNews';
    readonly activeNews = 'api/NewsAdmin/ActiveNews';
    
    readonly addImgNewsTypeText = 'api/FileAdmin/AddImgNewsTypeText';
    readonly addImgNewsTypePhoto = 'api/FileAdmin/AddImgNewsTypePhoto';
    readonly addVideoForNews = 'api/FileAdmin/AddVideoForNews';
    readonly dellPhoto = 'api/FileAdmin/DellPhoto';
} 
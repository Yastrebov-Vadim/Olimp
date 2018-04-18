export class Urls {
    readonly authorization = 'api/Authorize/Authorization';
    readonly account = 'api/Authorize/GetAccount';
    readonly exit = 'api/Authorize/Exit';
    readonly registration = 'api/Authorize/Registration';
    readonly confirmTheCode = 'api/Authorize/ConfirmTheCode';
    readonly replacePassvord = 'api/Authorize/ReplacePassvord';
    

    readonly newsBriefly = 'api/News/GetNewsBriefly';

    readonly codToEmail = 'api/Email/SingCodeToEmail';

    readonly getAccount = 'api/Account/GetAccountInfo';
    readonly addPlayer = 'api/Account/AddPlayer';
    readonly dellPlayer = 'api/Account/DellPlayer';
    readonly editAccountInfo = 'api/Account/EditAccountInfo';

    readonly getImageAvatar = 'api/Image/GetImageAvatar';

    readonly command = 'api/Public/GetCommand';
    readonly commandFilter = 'api/Public/GetCommandFilter';
}
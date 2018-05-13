export class AccountResponse {
    login: string
    isAuth: boolean

    constructor(login: string, isAuth: boolean) {
        const self = this;
        self.login = login;
        self.isAuth = isAuth;
    }
}
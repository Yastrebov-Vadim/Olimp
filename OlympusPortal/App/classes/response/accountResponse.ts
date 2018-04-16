export class AccountResponse {
    login: string
    isAuth: boolean

    constructor(login: string, isAuth: boolean) {
        const self = this;
        self.login = login;
        self.isAuth = isAuth;
    }
}

export class ElementResponse {
    txt: string

    constructor(txt: string) {
        const self = this;
        self.txt = txt;
    }
}
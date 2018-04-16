export class AuthorizationRequest {
    login: string
    password: string

    constructor(login: string, password: string) {
        const self = this;
        self.login = login;
        self.password = password;
    }
}
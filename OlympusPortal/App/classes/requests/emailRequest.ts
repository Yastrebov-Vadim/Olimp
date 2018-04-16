export class SingCodeToEmailRequest {
    email: string;
    login: string;

    constructor(email: string, login: string) {
        const self = this;
        self.email = email;
        self.login = login;
    }
}

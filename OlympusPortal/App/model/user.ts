export class UserAuthentication {
    constructor(public login: string,
        public password: string) { }
}

export class UserRegistration {
    constructor(public login: string,
        public password: string,
        public email: string,
        public commandName: string,
        public mobile: string,
        public code: number) { }
}

export class Account {
    constructor(public name: string,
        public isAuth: boolean) { }
}
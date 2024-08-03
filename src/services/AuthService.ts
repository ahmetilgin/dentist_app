import { ResponseError } from 'superagent';
import { TypeUser } from '../DataTypes';
import { UserStore } from '../stores/UserStore';
import HttpService from './HttpService';

class AuthService {
    httpService: HttpService;
    userStore: UserStore;
    constructor(httpService: HttpService, userStore: UserStore) {
        this.httpService = httpService;
        this.userStore = userStore;
    }

    current = () => this.httpService.get('/user');
    loginUser(usernameOrPassword: string, password: string, email: string) {
        this.userStore.setUsername(usernameOrPassword);
        this.userStore.errors = undefined;
        return this.httpService
            .post<{ token: string }>('/auth/sign-in-normal-user', {
                usernameOrPassword,
                password,
                email,
            } as TypeUser)
            .then((res) => {
                this.userStore.setToken(res.token);
                this.userStore.setAuthenticated(true);
                return true;
            }) // TODO
            .catch((err: ResponseError) => {
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                return false;
            });
    }

    loginBusiness(usernameOrPassword: string, password: string, email: string) {
        this.userStore.setUsername(usernameOrPassword);
        this.userStore.errors = undefined;
        return this.httpService
            .post<{ token: string }>('/auth/sign-in-business-user', {
                usernameOrPassword,
                password,
                email,
            } as TypeUser)
            .then((res) => {
                this.userStore.setToken(res.token);
                this.userStore.setAuthenticated(true);
                return true;
            }) // TODO
            .catch((err: ResponseError) => {
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                console.log(err);
                return false;
            });
    }

    registerUser(usernameOrPassword: string, password: string, email: string) {
        this.userStore.errors = undefined;
        return this.httpService
            .post('/auth/sign-up-normal-user', {
                usernameOrPassword,
                password,
                email,
            } as TypeUser)
            .then(() => {
                this.userStore.setRegisterSuccess(true);
                return true;
            })
            .catch((err: ResponseError) => {
                this.userStore.setRegisterSuccess(false);
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                console.log(err);
                return false;
            });
    }

    registerBusiness(businessUser: any) {
        this.userStore.errors = undefined;
        return this.httpService
            .post('/auth/sign-up-business-user', businessUser)
            .then(() => {
                this.userStore.setRegisterSuccess(true);
                return true;
            })
            .catch((err: ResponseError) => {
                this.userStore.setRegisterSuccess(false);
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                console.log(err);
                return false;
            });
    }

    sendEmailBusinessUser(email: string) {
        this.userStore.errors = undefined;
        return this.httpService
            .post('/auth/send-email-business-user', { email })
            .then(() => {
                return true;
            })
            .catch((err: ResponseError) => {
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                console.log(err);
                return false;
            });
    }

    sendEmailNormalUser(email: string) {
        this.userStore.errors = undefined;
        return this.httpService
            .post('/auth/send-email-normal-user', { email })
            .then(() => {
                return true;
            })
            .catch((err: ResponseError) => {
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                console.log(err);
                return false;
            });
    }

    resetPassword(token: string, password: string) {
        this.userStore.errors = undefined;
        return this.httpService
            .post('/auth/reset-password', { token, password })
            .then(() => {
                return true;
            })
            .catch((err: ResponseError) => {
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                console.log(err);
                return false;
            });
    }
}

export default AuthService;

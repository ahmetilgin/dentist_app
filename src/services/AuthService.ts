import { ResponseError } from 'superagent';
import { BusinessUserLoginInformation, EnumUserType, RegisterBusinessUser, TypeUser } from '../DataTypes';
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
	loginUser(userInfo: TypeUser) {
		return this.httpService
			.post<{ token: string }>('/auth/sign-in-normal-user', userInfo)
			.then((res) => {
				this.userStore.setToken(res.token);
				this.userStore.setAuthenticated(true);
				this.userStore.setUserType(EnumUserType.CANDIDATE);
				return true;
			}) // TODO
			.catch((err: ResponseError) => {
				console.log(err);
				return false;
			});
	}

	loginBusiness(userInfo: TypeUser) {
		return this.httpService
			.post<BusinessUserLoginInformation>('/auth/sign-in-business-user', userInfo)
			.then((res) => {
				this.userStore.setToken(res.token);
				this.userStore.setAuthenticated(true);
				this.userStore.setUserType(EnumUserType.EMPLOYER);
				return true;
			}) // TODO
			.catch((err: ResponseError) => {
				console.log(err);
				return false;
			});
	}

	registerUser(userInfo: TypeUser) {
		return this.httpService
			.post('/auth/sign-up-normal-user', userInfo)
			.then(() => {
				this.userStore.setRegisterSuccess(true);
				return true;
			})
			.catch((err: ResponseError) => {
				this.userStore.setRegisterSuccess(false);
				console.log(err);
				return false;
			});
	}

	registerBusiness(businessUser: RegisterBusinessUser) {
		return this.httpService
			.post('/auth/sign-up-business-user', businessUser)
			.then(() => {
				this.userStore.setRegisterSuccess(true);
				return true;
			})
			.catch((err: ResponseError) => {
				this.userStore.setRegisterSuccess(false);
				console.log(err);
				return false;
			});
	}

	sendEmailBusinessUser(email: string) {
		return this.httpService
			.post('/auth/send-password-reset-business-user', { email })
			.then(() => {
				return true;
			})
			.catch((err: ResponseError) => {
				console.log(err);
				return false;
			});
	}

	sendEmailNormalUser(email: string) {
		return this.httpService
			.post('/auth/send-password-reset-normal-user', { email })
			.then(() => {
				return true;
			})
			.catch((err: ResponseError) => {
				console.log(err);
				return false;
			});
	}

	resetPassword(token: string, password: string) {
		return this.httpService
			.post('/auth/reset-password', { token, password })
			.then(() => {
				return true;
			})
			.catch((err: ResponseError) => {
				console.log(err);
				return false;
			});
	}
}

export default AuthService;

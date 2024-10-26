import { makeAutoObservable } from 'mobx';
import { EnumUserType, Theme } from '../DataTypes';

export class UserStore {
	registerSuccess: boolean = false;
	isAuthenticated: boolean = false;
	userType: EnumUserType | null = null;
	activeTheme: Theme;
	token: string | null = null;
	rememberMe: boolean = false;

	constructor() {
		makeAutoObservable(this);
		this.activeTheme = (this.getFromStorage('activeTheme', 'localStorage') as Theme) || 'light';
		this.isAuthenticated = JSON.parse(this.getFromStorage('isAuthenticated', 'sessionStorage') || 'false');
		this.token = this.getFromStorage('token', 'sessionStorage');
		this.rememberMe = JSON.parse(this.getFromStorage('rememberMe', 'localStorage') || 'false');
	}

	private getFromStorage(key: string, storageType: 'localStorage' | 'sessionStorage'): string | null {
		return window[storageType].getItem(key);
	}

	private setToStorage(key: string, value: string, storageType: 'localStorage' | 'sessionStorage') {
		window[storageType].setItem(key, value);
	}

	private removeFromStorage(key: string, storageType: 'localStorage' | 'sessionStorage') {
		window[storageType].removeItem(key);
	}

	setAuthenticated(authenticated: boolean) {
		this.isAuthenticated = authenticated;
		this.setToStorage('isAuthenticated', JSON.stringify(authenticated), 'sessionStorage');
		if (!authenticated) {
			this.setToken(null);
		}
	}

	setRememberMe(rememberMe: boolean) {
		this.rememberMe = rememberMe;
		this.setToStorage('rememberMe', rememberMe.toString(), 'localStorage');
	}

	setTheme(theme: Theme) {
		this.activeTheme = theme;
		this.setToStorage('activeTheme', theme, 'localStorage');
	}

	setRegisterSuccess(success: boolean) {
		this.registerSuccess = success;
	}

	setToken(token: string | null) {
		this.token = token;
		if (token === null) {
			this.removeFromStorage('token', 'sessionStorage');
		} else {
			this.setToStorage('token', token, 'sessionStorage');
		}
	}

	logout() {
		this.setToken(null);
		this.setAuthenticated(false);
	}

	getToken(): string | null {
		return this.token;
	}

	setUserType(userType: EnumUserType) {
		this.userType = userType;
	}
}

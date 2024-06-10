import { action, makeObservable, observable } from "mobx";

export class UserStore {
    email: string = "test";
    password: string = "test";
    public isAuthenticated: boolean = false;
    language: "sq" | "tr" | "en" = "sq";
    activeTheme: string = "light";

    constructor() {
        // makeObservable ile observable ve action'ları belirleyin
        makeObservable(this, {
            email: observable,
            password: observable,
            isAuthenticated: observable,
            language: observable,
            activeTheme: observable,
            setAuthenticated: action, // Action olarak belirleyin
            setEmail: action,
            setPassword: action,
            setLanguage: action,
            setTheme: action,
            login: action
        });

        let savedUserStore = localStorage.getItem("userStore")
        if (savedUserStore && savedUserStore != null) {
            const parsedUserStore = JSON.parse(savedUserStore);
            this.email = parsedUserStore.email;
            this.password = parsedUserStore.password;
            this.isAuthenticated = parsedUserStore.isAuthenticated;
            this.language = parsedUserStore.language;
            this.activeTheme = parsedUserStore.activeTheme;
        }

    }

    setAuthenticated(authenticated: boolean) {
        this.isAuthenticated = authenticated;
        localStorage.setItem("userStore", JSON.stringify(this))
    }

    setEmail(p_email: string) {
        this.email = p_email;
    }

    setPassword(p_password: string) {
        this.password = p_password;
    }

    setLanguage(p_language: "sq" | "tr" | "en") {
        this.language = p_language;
    }

    setTheme(p_theme: string) {
        this.activeTheme = p_theme;
        localStorage.setItem("userStore", JSON.stringify(this))
    }

    login(p_email: string, p_password: string) {
        if (this.email === p_email && this.password === p_password) {
            this.setAuthenticated(true)
        }
    }

    registerUser(p_username: string, p_password: string, p_email: string) {
        console.log("register user called")
    }
}

import { action, makeObservable, observable } from "mobx";

export class UserStore {
    username: string = "test";
    errors = undefined;
    registerSuccess = false
    public isAuthenticated: boolean = false;
    language: "sq" | "tr" | "en" = "sq";
    activeTheme: string = "light";
    token : string | null = null

    constructor() {
        // makeObservable ile observable ve action'ları belirleyin
        makeObservable(this, {
            errors: observable,
            username: observable,
            isAuthenticated: observable,
            language: observable,
            activeTheme: observable,
            registerSuccess: observable,
            setAuthenticated: action, // Action olarak belirleyin
            setUsername: action,
            setLanguage: action,
            setTheme: action,
            reset: action,
            setRegisterSuccess: action
        });

        let username = localStorage.getItem("userName")
        let activeTheme = localStorage.getItem("activeTheme")  
        let lang = localStorage.getItem("i18nextLng") 
        this.username = username ?? ""
        this.activeTheme = activeTheme ?? "light"
        this.language = lang as "sq" | "tr" | "en" ?? "en"
        
        let isAuthenticated = sessionStorage.getItem("isAuthenticated")
        if (isAuthenticated && isAuthenticated != null) {
            this.isAuthenticated = JSON.parse(isAuthenticated)  
        }

        if (this.token == null){
            let tokenFromStore = sessionStorage.getItem("token")
            if (tokenFromStore && tokenFromStore != null) { 
                this.token = tokenFromStore;
            }
        }
    }

    setAuthenticated(authenticated: boolean) {
        this.isAuthenticated = authenticated;
        sessionStorage.setItem("isAuthenticated", JSON.stringify(this.isAuthenticated))
        if (!authenticated)
        {
            this.setToken(null) 
        }
        
    }

    setUsername(username: string) {
        this.username = username;
        localStorage.setItem("userName", JSON.stringify(this.username))
    }

    setLanguage(p_language: "sq" | "tr" | "en") {
        this.language = p_language;
    }

    setTheme(p_theme: string) {
        this.activeTheme = p_theme;
        localStorage.setItem("activeTheme", JSON.stringify(this.activeTheme))
    }

    setRegisterSuccess(res: boolean){
        this.registerSuccess = res
    }

    logout() {
        this.setToken(null);
    }

    reset() {
        this.username = ''
    }

    setToken(token: string | null) {
        this.token = token;
        if ( token == null){
            sessionStorage.removeItem("token")
        }else{
            sessionStorage.setItem("token", token);
        }
    }

    getToken() : string | null{     
        return this.token
    }
}

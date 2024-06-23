import { ResponseError } from "superagent";
import { TypeUser } from "../DataTypes";
import { UserStore } from "../stores/UserStore";
import HttpService from "./HttpService";

class AuthService {
    httpService : HttpService
    userStore : UserStore
    constructor(httpService: HttpService, userStore: UserStore){
        this.httpService = httpService;
        this.userStore = userStore;
    }

    current = () => this.httpService.get('/user')
    login(username: string, password: string) {
        this.userStore.setUsername(username)
        this.userStore.errors = undefined;
        return this.httpService.post<{token : string}>('/auth/sign-in', {username, password} as TypeUser)
             .then((res) => {
                this.userStore.setToken(res.token)
                this.userStore.setAuthenticated(true)
             }) // TODO
             .catch((err: ResponseError) => {
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                 console.log(err)
             })
     }

    registerUser(username : string, password: string) {
        this.userStore.errors = undefined;
        return  this.httpService.post('/auth/sign-up', {username, password} as TypeUser)
             .then(() => {
                this.userStore.setRegisterSuccess(true)
             } ) 
             .catch((err: ResponseError) => {
                this.userStore.setRegisterSuccess(false) 
                this.userStore.errors = err.response && err.response.body && err.response.body.errors;
                console.log(err)
        })
    }

  
}

export default AuthService;
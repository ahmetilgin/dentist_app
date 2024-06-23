import { RootStore } from "../stores/Rootstore";
import AuthService from "./AuthService";
import BookmarksService from "./BookmarksService";
import HttpService from "./HttpService";

class RootService {
    httpService : HttpService
    authService : AuthService
    bookmarksService: BookmarksService
    constructor(rootStore: RootStore){
        this.httpService = new HttpService(rootStore.userStore);
        this.authService = new AuthService(this.httpService, rootStore.userStore);
        this.bookmarksService = new BookmarksService(this.httpService, rootStore.bookmarkStore);
    }
}

export default RootService;
import { makeAutoObservable } from "mobx";
import { BookmarksStore } from "./BookmarksStore";
import { UserStore } from "./UserStore";

export class RootStore {
    userStore: UserStore;
    bookmarkStore : BookmarksStore
    constructor() {
        this.userStore = new UserStore();
        this.bookmarkStore = new BookmarksStore();
        makeAutoObservable(this)
    }
}
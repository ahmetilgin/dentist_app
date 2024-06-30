import { makeAutoObservable } from "mobx";
import { BookmarksStore } from "./BookmarksStore";
import { JobStore } from "./JobStore";
import { UserStore } from "./UserStore";

export class RootStore {
    userStore: UserStore;
    bookmarkStore : BookmarksStore
    jobStore : JobStore
    constructor() {
        this.userStore = new UserStore();
        this.bookmarkStore = new BookmarksStore();
        this.jobStore = new JobStore();
        makeAutoObservable(this)
    }
}
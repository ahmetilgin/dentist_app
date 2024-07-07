import { makeAutoObservable } from "mobx";
import { JobStore } from "./JobStore";
import { UserStore } from "./UserStore";

export class RootStore {
    userStore: UserStore;
    jobStore : JobStore
    constructor() {
        this.userStore = new UserStore();
        this.jobStore = new JobStore();
        makeAutoObservable(this)
    }
}
import { makeAutoObservable } from "mobx";
import { UserStore } from "./UserStore";

export class RootStore {
    userStore: UserStore;

    constructor() {
        this.userStore = new UserStore();
        makeAutoObservable(this)
    }
}
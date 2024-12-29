import { makeAutoObservable } from 'mobx';
import { JobStore } from './JobStore';
import { SearchStore } from './SearchStore';
import { UserStore } from './UserStore';

export class RootStore {
	userStore: UserStore;
	jobStore: JobStore;
	searchStore: SearchStore;
	constructor() {
		this.userStore = new UserStore();
		this.jobStore = new JobStore();
		this.searchStore = new SearchStore();
		makeAutoObservable(this);
	}
}

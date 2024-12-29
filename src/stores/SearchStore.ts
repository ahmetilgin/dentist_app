import { makeAutoObservable } from 'mobx';

export class SearchStore {
	position = '';
	region = '';

	constructor() {
		this.position = '-';
		this.region = '-';
		makeAutoObservable(this);
	}

	setPosition(position: string) {
		this.position = position;
	}

	setRegion(region: string) {
		this.region = region;
	}
}

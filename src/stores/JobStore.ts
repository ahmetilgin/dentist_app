import { makeAutoObservable } from 'mobx';

export class JobStore {
    private _popularJobs: string[] = [];

    public get popularJobs(): string[] {
        return this._popularJobs;
    }
    public set popularJobs(value: string[]) {
        this._popularJobs = value;
    }

    constructor() {
        makeAutoObservable(this);
    }
}

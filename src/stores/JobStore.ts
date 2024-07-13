import { makeAutoObservable } from 'mobx';
import { TypeJobs } from '../DataTypes';

export class JobStore {
    private _jobs: TypeJobs = [];
    private _popularJobs: string[] = [];

    public get popularJobs(): string[] {
        return this._popularJobs;
    }
    public set popularJobs(value: string[]) {
        this._popularJobs = value;
    }

    public get jobs(): TypeJobs {
        return this._jobs;
    }
    public set jobs(value: TypeJobs) {
        this._jobs = value;
    }

    constructor() {
        makeAutoObservable(this);
    }
}

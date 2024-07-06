import { makeAutoObservable } from "mobx";
import { TypeJobs } from "../DataTypes";

export class JobStore {
  private _jobs: TypeJobs = [];

  public get jobs(): TypeJobs {
    return this._jobs;
  }
  public set jobs(value: TypeJobs) {
    this._jobs = value;
  }

  constructor() {
    makeAutoObservable(this)
  }
}

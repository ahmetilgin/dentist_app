import { makeAutoObservable } from "mobx";
import { TypeJobs } from "../DataTypes";

export class JobStore {
  jobs: TypeJobs = [];

  constructor() {
    makeAutoObservable(this)
  }
}

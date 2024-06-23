import { action, makeObservable, observable } from "mobx";
import { TypeBookmarks } from "../DataTypes";

export class BookmarksStore {
  bookmarks: TypeBookmarks = [];
  counter = 0;

  constructor() {
    makeObservable(this, {
      bookmarks: observable,
      counter: observable,
      setCounter: action,
    });
  }

  public getCounter() {
    return this.counter;
  }
  public setCounter(value: number) {
    this.counter = value;
  }
}

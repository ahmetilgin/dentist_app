import { makeAutoObservable } from "mobx";
import { TypeBookmarks } from "../DataTypes";

export class BookmarksStore {
  bookmarks: TypeBookmarks = [];

  constructor() {
    makeAutoObservable(this)
  }
}

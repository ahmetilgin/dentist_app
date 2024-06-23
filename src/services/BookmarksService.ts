import { TypeBookmarks } from "../DataTypes";
import { BookmarksStore } from "../stores/BookmarksStore";
import HttpService from "./HttpService";

class BookmarksService {
  httpService: HttpService;
  bookmarkStore: BookmarksStore;
  constructor(httpService: HttpService, bookmarkStore: BookmarksStore) {
    this.httpService = httpService;
    this.bookmarkStore = bookmarkStore;
  }

  getBookmarks = () => {
    this.httpService
      .get<TypeBookmarks>("/api/bookmarks")
      .then((res) => (this.bookmarkStore.bookmarks = res))
      .catch((err: any) => console.log(err));
  };
  setBookmarks = (url: string, title: string) =>
    this.httpService.post("/api/bookmarks", { url, title });
}

export default BookmarksService;

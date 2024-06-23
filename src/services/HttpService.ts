import superagent, { Request } from "superagent";
import { UserStore } from "../stores/UserStore";

class HttpService {
  API_ROOT: string;
  userStore: UserStore;

  constructor(userStore: UserStore) {
    this.userStore = userStore;
    this.API_ROOT =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000"
        : "dentistapp-backend.onrender.com";
    superagent.agent().use(this.API_ROOT);
  }

  post = <T>(url: string, body: any): Promise<T> => {
    return superagent
      .post(url)
      .send(body)
      .use(this.tokenPlugin)
      .then((response) => response.body);
  };

  get = <T>(url: string): Promise<T> => {
    return superagent
      .get(url)
      .use(this.tokenPlugin)
      .then((response) => response.body);
  };

  put = <T>(url: string, body: any): Promise<T> => {
    return superagent
      .put(url)
      .send(body)
      .use(this.tokenPlugin)
      .then((response) => response.body);
  };

  del = <T>(url: string, body: any): Promise<T> => {
    return superagent
      .del(url)
      .send(body)
      .use(this.tokenPlugin)
      .then((response) => response.body);
  };

  private tokenPlugin = (req: Request) => {
    const token = this.userStore.getToken();
    if (token !== null) {
      req.set("authorization", `Bearer ${token}`);
    }
  };
}

export default HttpService;

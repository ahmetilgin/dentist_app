import superagent, { Request } from 'superagent';
import prefix from 'superagent-prefix';
import { UserStore } from '../stores/UserStore';
class HttpService {
	API_ROOT: string;
	userStore: UserStore;

	constructor(userStore: UserStore) {
		this.userStore = userStore;
		this.API_ROOT =
			process.env.NODE_ENV === 'development'
				? 'http://localhost:8000'
				: 'https://dentistapp-backend.onrender.com';
	}

	post = <T>(url: string, body: string | object): Promise<T> => {
		return superagent
			.agent()
			.use(prefix(this.API_ROOT))
			.post(url)
			.use(this.tokenPlugin)
			.send(body)
			.then((response) => response.body);
	};

	get = <T>(url: string, interceptor?: (req: Request) => void): Promise<T> => {
		return superagent
			.agent()
			.use(prefix(this.API_ROOT))
			.get(url)
			.use(interceptor === undefined ? this.tokenPlugin : interceptor)
			.then((response) => response.body);
	};

	put = <T>(url: string, body: string | object): Promise<T> => {
		return superagent
			.agent()
			.use(prefix(this.API_ROOT))
			.put(url)
			.send(body)
			.use(this.tokenPlugin)
			.then((response) => response.body);
	};

	del = <T>(url: string, body: string | object): Promise<T> => {
		return superagent
			.agent()
			.del(url)
			.send(body)
			.use(this.tokenPlugin)
			.then((response) => response.body);
	};

	private tokenPlugin = (req: Request) => {
		const token = this.userStore.getToken();
		if (token !== null && this.userStore.isAuthenticated) {
			req.set('authorization', `Bearer ${token}`);
		}
	};
}

export default HttpService;

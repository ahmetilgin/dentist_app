import { createContext, useContext, useMemo } from 'react';
import RootService from '../../services/RootService';
import { RootStore } from '../../stores/Rootstore';

export interface RootContext {
	rootStore: RootStore;
	rootService: RootService;
}
const RootStoreContext = createContext<RootContext>({
	rootStore: {} as RootStore,
	rootService: {} as RootService,
});

export const RootStoreProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
	const store = useMemo(() => {
		const rootStore = new RootStore();
		const rootService = new RootService(rootStore);
		return { rootStore: rootStore, rootService: rootService };
	}, []);
	return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRootService = (): RootService => {
	const context = useContext(RootStoreContext);
	if (!context) {
		throw new Error('useRootStore must be used within a RootStoreProvider');
	}
	return context.rootService;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRootStore = (): RootStore => {
	const context = useContext(RootStoreContext);
	if (!context) {
		throw new Error('useRootStore must be used within a RootStoreProvider');
	}
	return context.rootStore;
};

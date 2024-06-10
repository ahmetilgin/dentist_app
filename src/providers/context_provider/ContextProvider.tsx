import { createContext, useContext, useMemo } from "react";
import { RootStore } from "../../stores/Rootstore";


const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const store = useMemo(() => new RootStore(), []);
    return (
        <RootStoreContext.Provider value={store}>
            {children}
        </RootStoreContext.Provider>
    );
};

export const useRootStore = (): RootStore => {
    const context = useContext(RootStoreContext);
    if (!context) {
        throw new Error('useRootStore must be used within a RootStoreProvider');
    }
    return context;
};
import { createStore, connect, Plugin, Store } from 'undux';
import { AppStore } from '../models/app-store';

export namespace AppStoreHelper {
    function withLocalStorage(store: Store<AppStore>): Store<AppStore> {
        store
            .beforeAll()
            .subscribe(({ key, previousValue, value }) =>
                localStorage.setItem(key, JSON.stringify(value))
            );
        return store;
    }
    /**
     * ストア
     */
    export const Store = withLocalStorage(
        createStore<AppStore>(new AppStore())
    );

    /**
     * 接続先ストアを引数にとるHOC
     */
    export const WithStore = connect(Store);
}

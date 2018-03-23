import { AppStore } from './app-store';
import { HomeAboutPage } from '../pages/home/about';
import { createStore, connect, Plugin } from 'undux';
import { AppPlugin } from './app-plugin';

export interface AppStore {
    HomeAboutState: HomeAboutPage.Model;
    today: Date;
}

export namespace AppStoreFactory {
    function createInitialStore(): AppStore {
        return {
            HomeAboutState: AppPlugin.getByLocalStorage(
                'HomeAboutState',
                k => null
            ),
            today: AppPlugin.getByLocalStorage('today', k => new Date())
        };
    }
    export const Store = createStore<AppStore>(createInitialStore());
    AppPlugin.WithLocalStorage(Store);

    // 接続先ストアを引数にとるHOCを作成
    export const WithStore = connect(Store);
}

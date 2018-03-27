import { AppStoreHelper } from '../helpers/app-store-helper';
import { HomeAbout } from '../../pages/home/about';
import { HomeIndex } from '../../pages/home';

export class AppStore {
    HomeIndex: HomeIndex.Model = this.getByLocalStorage('HomeIndex');
    HomeAbout: HomeAbout.Model = this.getByLocalStorage('HomeAbout');

    private getByLocalStorage<Key extends keyof AppStore>(
        key: Key
    ): AppStore[Key] {
        return this.getByLocalStorageWithGenerator(key, k => null);
    }
    private getByLocalStorageWithGenerator<Key extends keyof AppStore>(
        key: Key,
        defaultGenerator: (key: Key) => AppStore[Key]
    ): AppStore[Key] {
        let val = localStorage.getItem(key);
        if (val) {
            return JSON.parse(val);
        }
        return defaultGenerator(key);
    }
}

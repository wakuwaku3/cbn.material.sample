import { Cbn } from '../../lib/shared/cbn';
import { HomeIndex } from '../pages/home';
import { HomeAbout } from '../pages/home/about';

export namespace App {
    export class Store {
        HomeIndex: HomeIndex.Model = this.getNewValue('HomeIndex');
        HomeAbout: HomeAbout.Model = this.getNewValue('HomeAbout');

        private getNewValue<Key extends keyof Store>(key: Key): Store[Key] {
            //return this.getByLocalStorage(key, k => null);
            return null;
        }
        private getByLocalStorage<Key extends keyof Store>(
            key: Key,
            defaultGenerator: (key: Key) => Store[Key]
        ): Store[Key] {
            let val = localStorage.getItem(key);
            if (val) {
                return JSON.parse(val);
            }
            return defaultGenerator(key);
        }
    }

    Cbn.Undux.initializeStore(new Store());

    /**
     * 接続先ストアを引数にとるHOC
     */
    export const withStore = Cbn.Undux.withStore<Store>();
}

import { Cbn } from '../../lib/shared/cbn';
import { HomeIndex } from '../pages/home';
import { HomeAbout } from '../pages/home/about';
import {
    getMuiTheme,
    lightBaseTheme,
    darkBaseTheme,
    MuiTheme
} from 'material-ui/styles';
import { ProductsIndex } from '../pages/products';

export namespace App {
    let theme: MuiTheme;
    export function getTheme() {
        if (!theme) {
            theme = getMuiTheme(darkBaseTheme);
        }
        return theme;
    }
    export class Store {
        homeIndex: HomeIndex.Model = this.getNewValue('homeIndex');
        homeAbout: HomeAbout.Model = this.getNewValue('homeAbout');
        productsIndex: ProductsIndex.Model = this.getNewValue('productsIndex');

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

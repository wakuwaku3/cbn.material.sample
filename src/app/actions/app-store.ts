import { ThemeAction } from './shared/theme-action';
import { BrowserAction } from './shared/browser-action';
import { AuthAction } from './shared/auth-action';
import { MessagesAction } from './shared/messages-action';
import { HomeIndexAction } from './home/home-index-action';
import { HomeAboutAction } from './home/home-about-action';
import { Store, connect } from 'undux';
import { Cbn } from '../../lib/shared/cbn';

export namespace AppStore {
    export class Model {
        theme: ThemeAction.Model = this.getByLocalStorage('theme');
        browser: BrowserAction.Model = this.getNewValue('browser');
        auth: AuthAction.Model = this.getByLocalStorage('auth');
        messages: MessagesAction.Model = this.getNewValue('messages');
        homeIndex: HomeIndexAction.Model = this.getNewValue('homeIndex');
        homeAbout: HomeAboutAction.Model = this.getNewValue('homeAbout');
        // productsIndex: ProductsIndex.Model = this.getNewValue('productsIndex');

        private getNewValue<Key extends keyof Model>(key: Key): Model[Key] {
            return null;
        }
        private getByLocalStorage<Key extends keyof Model>(
            key: Key
        ): Model[Key] {
            let val = localStorage.getItem(key);
            if (val) {
                return JSON.parse(val);
            }
            return null;
        }
    }
    const store = Cbn.Undux.initializeStore(new Model(), {
        withLocalStorage: ['auth', 'theme']
    });
    export const getStore = () => store;
    export const withStore = connect(store);
}

import { Store, connect } from 'undux';
import { ThemeStore } from './theme';
import { BrowserStore } from './browser';
import { AuthStore } from './auth';
import { MessagesStore } from './messages';
import { HomeIndexStore } from '../home';
import { HomeAboutStore } from '../home/about';
import { ProductsIndexStore } from '../products';
import { DialogStore } from './dialog';

export class AppStore {
    theme: ThemeStore = this.getByLocalStorage('theme');
    browser: BrowserStore = this.getNewValue('browser');
    auth: AuthStore = this.getByLocalStorage('auth');
    messages: MessagesStore = this.getNewValue('messages');
    dialog: DialogStore = this.getNewValue('dialog');
    homeIndex: HomeIndexStore = this.getNewValue('homeIndex');
    homeAbout: HomeAboutStore = this.getNewValue('homeAbout');
    productsIndex: ProductsIndexStore = this.getNewValue('productsIndex');

    private getNewValue<Key extends keyof AppStore>(key: Key): AppStore[Key] {
        return null;
    }
    private getByLocalStorage<Key extends keyof AppStore>(
        key: Key
    ): AppStore[Key] {
        let val = localStorage.getItem(key);
        if (val) {
            return JSON.parse(val);
        }
        return null;
    }
}

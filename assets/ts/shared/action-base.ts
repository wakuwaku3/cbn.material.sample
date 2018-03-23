import { AppStore, AppStoreFactory } from './app-store';
import { Store } from 'undux';
import { Observable } from 'rx';

export abstract class ActionBase<Key extends keyof AppStore> {
    constructor(private key: Key) {}
    get store(): Store<AppStore> {
        return AppStoreFactory.Store;
    }
    get model(): AppStore[Key] {
        return this.store.get(this.key);
    }
    set model(value: AppStore[Key]) {
        this.store.set(this.key)(value);
    }
    get observable(): Observable<AppStore[Key]> {
        return this.store.on(this.key);
    }
    protected reloadState() {
        this.model = $.extend({}, this.model);
    }
}

import { AppStore } from './app-store';
import { Plugin } from 'undux';

export namespace AppPlugin {
    export const WithLocalStorage: Plugin = store => {
        // モデルの変更を検知して、新しい変更をローカルストレージへ保存
        store
            .beforeAll()
            .subscribe(({ key, previousValue, value }) =>
                localStorage.setItem(key, JSON.stringify(value))
            );

        return store;
    };

    export function getByLocalStorage<Key extends keyof AppStore>(
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

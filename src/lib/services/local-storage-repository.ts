import { Cbn } from '../shared/cbn';

export class LocalStorageRepository<T> {
    private _store: T[];
    constructor(private _key: string, private _equal: (model1: T) => (model2: T) => boolean) {
        this.load();
    }
    private load = () => {
        let json = localStorage.getItem(this._key);
        this._store = json ? JSON.parse(json) : [];
    };
    private update = () => {
        localStorage.setItem(this._key, JSON.stringify(this._store));
    };
    private updateAsync = async () => {
        await Cbn.delay(0);
        this.update();
    };
    get = () => {
        return this._store;
    };
    getAsync = async () => {
        await Cbn.delay(0);
        return this.get();
    };
    push = async (model: T) => {
        this._store.push(model);
        this.update();
    };
    pushAsync = async (model: T) => {
        this._store.push(model);
        await this.updateAsync();
    };
    remove = (model: T) => {
        this._store.splice(this._store.findIndex(this._equal(model)), 1);
        this.update();
    };
    removeAsync = async (model: T) => {
        this._store.splice(this._store.findIndex(this._equal(model)), 1);
        await this.updateAsync();
    };
}

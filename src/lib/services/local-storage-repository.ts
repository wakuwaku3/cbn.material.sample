import { delay } from '../shared/cbn';

export class LocalStorageRepository<T extends object> {
    private _store: T[];
    constructor(
        private _key: string,
        private _equal: (model1: T) => (model2: T) => boolean
    ) {
        this.load();
    }
    private load = () => {
        let json = localStorage.getItem(this._key);
        this._store = json ? JSON.parse(json) : [];
    };
    private reset = () => {
        localStorage.setItem(this._key, JSON.stringify(this._store));
    };
    private resetAsync = async () => {
        await delay(0);
        this.reset();
    };
    getAll = () => {
        return this._store.map(x => Object.assign({}, x));
    };
    getAllAsync = async () => {
        await delay(0);
        return this.getAll();
    };
    push = async (model: T) => {
        this._store.push(Object.assign({}, model));
        this.reset();
    };
    pushAsync = async (model: T) => {
        this._store.push(Object.assign({}, model));
        await this.resetAsync();
    };
    update = async (model: T) => {
        let id = this._store.findIndex(this._equal(model));
        this._store[id] = Object.assign(this._store[id], model);
        this.reset();
    };
    updateAsync = async (model: T) => {
        let id = this._store.findIndex(this._equal(model));
        this._store[id] = Object.assign(this._store[id], model);
        await this.resetAsync();
    };
    remove = (model: T) => {
        this._store.splice(this._store.findIndex(this._equal(model)), 1);
        this.reset();
    };
    removeAsync = async (model: T) => {
        this._store.splice(this._store.findIndex(this._equal(model)), 1);
        await this.resetAsync();
    };
}

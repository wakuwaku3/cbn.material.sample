import { delay } from '../shared/cbn';

export class LocalStorageRepository<T extends object> {
  private innerStore: T[];
  constructor(
    private key: string,
    private equal: (model1: T) => (model2: T) => boolean,
  ) {
    this.load();
  }
  private load = () => {
    const json = localStorage.getItem(this.key);
    this.innerStore = json ? JSON.parse(json) : [];
  };
  private reset = () => {
    localStorage.setItem(this.key, JSON.stringify(this.innerStore));
  };
  private resetAsync = async () => {
    await delay(0);
    this.reset();
  };
  public getAll = () => {
    return this.innerStore.map(x => Object.assign({}, x));
  };
  public getAllAsync = async () => {
    await delay(0);
    return this.getAll();
  };
  public push = async (model: T) => {
    this.innerStore.push(Object.assign({}, model));
    this.reset();
  };
  public pushAsync = async (model: T) => {
    this.innerStore.push(Object.assign({}, model));
    await this.resetAsync();
  };
  public update = async (model: T) => {
    const id = this.innerStore.findIndex(this.equal(model));
    this.innerStore[id] = Object.assign(this.innerStore[id], model);
    this.reset();
  };
  public updateAsync = async (model: T) => {
    const id = this.innerStore.findIndex(this.equal(model));
    this.innerStore[id] = Object.assign(this.innerStore[id], model);
    await this.resetAsync();
  };
  public remove = (model: T) => {
    this.innerStore.splice(this.innerStore.findIndex(this.equal(model)), 1);
    this.reset();
  };
  public removeAsync = async (model: T) => {
    this.innerStore.splice(this.innerStore.findIndex(this.equal(model)), 1);
    await this.resetAsync();
  };
}

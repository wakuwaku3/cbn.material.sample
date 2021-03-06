import { ActionBase } from './action-base';
import { observeWindow } from '../shared/window-helper';

export abstract class LocalstorageActionBase<
  TStore extends object,
  TEvent
> extends ActionBase<TStore, TEvent> {
  constructor(key: string) {
    super(JSON.parse(localStorage.getItem(key)));
    this.observe('render').subscribe(() => {
      this.setStore(this.store);
      localStorage.setItem(key, JSON.stringify(this.store));
    });

    observeWindow('storage')
      .filter(e => e.key === key)
      .subscribe(e => (this.store = JSON.parse(e.newValue)));
  }
}

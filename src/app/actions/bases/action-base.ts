import { Cbn } from '../../../lib/shared/cbn';
import { AppStore } from '../../models/actions/shared/app-store';
import { getStore } from '../../helper/app-store-helper';

export abstract class ActionBase<
    TKey extends keyof AppStore,
    TEvent
> extends Cbn.PageAction<AppStore, TKey, TEvent> {
    constructor(key: TKey) {
        super(key, getStore());
    }
}

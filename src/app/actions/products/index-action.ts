import { Cbn } from '../../../lib/shared/cbn';
import { Store } from 'undux';
import { ActionBase } from '../bases/action-base';
import { ProductsIndexEvent } from '../../models/actions/products';
import { Products } from '../../services/products-service';

namespace InnerScope {
    const key = 'productsIndex';
    type key = 'productsIndex';
    type event = ProductsIndexEvent;
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
        }
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                if (!this.model || !this.model.condition) {
                    this.emit('reset');
                    return;
                }
                this.emit('search', this.model.condition);
            });
            this.observe('reset').subscribe(() => {
                this.model = Products.service.initializeAsync();
            });
            this.observe('search').subscribe(condition => {
                let res = Products.service.getAsync(
                    Object.assign(this.model.condition, condition)
                );
                this.model.condition.pager = res.pager;
                this.model.items = res.items;
                this.emit('reflesh');
            });
            this.emit('initialize');
        }
    }
}
export const productsIndexAction = new InnerScope.Action();

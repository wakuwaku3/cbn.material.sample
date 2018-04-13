import { Cbn } from '../../../lib/shared/cbn';
import { Store } from 'undux';
import { ActionBase } from '../bases/action-base';
import {
    ProductsIndexEvent,
    ProductsIndexStoreCondition
} from '../../models/actions/products';
import { Products } from '../../services/products-service';

namespace InnerScope {
    const key = 'productsIndex';
    type key = 'productsIndex';
    export interface event {
        reset: void;
        initialize: void;
        search: Partial<ProductsIndexStoreCondition>;
        select: { value: boolean; id: number };
        selectAll: boolean;
    }
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
            this.observe('reset').subscribe(async () => {
                this.model = await Products.service.initializeIndexAsync();
            });
            this.observe('search').subscribe(async condition => {
                if (condition) {
                    this.model.condition = Object.assign(
                        this.model.condition,
                        condition
                    );
                }
                this.emit('reflesh');
                this.model = await Products.service.getIndexAsync(
                    this.model.condition
                );
            });
            this.observe('selectAll').subscribe(value => {
                this.model.items.forEach(x => (x.isSelected = value));
                this.emit('reflesh');
            });
            this.observe('select').subscribe(({ value, id }) => {
                this.model.items.find(x => x.id === id).isSelected = value;
                this.emit('reflesh');
            });
            this.emit('initialize');
        }
    }
}
export const productsIndexAction = new InnerScope.Action();

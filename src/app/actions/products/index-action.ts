import { ActionBase } from '../../../lib/bases/action-base';
import {
    ProductsIndexItem,
    ProductsIndexCondition,
    Products
} from '../../services/products-service';

namespace InnerScope {
    export interface Store {
        condition: ProductsIndexCondition;
        items: ProductsIndexItem[];
    }
    export interface Event {
        reset: void;
        initialize: void;
        search: Partial<ProductsIndexCondition>;
        select: { value: boolean; id: number };
        selectAll: boolean;
        remove: number[];
    }
    export class Action extends ActionBase<Store, Event> {
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                if (!this.store || !this.store.condition) {
                    this.next('reset');
                    return;
                }
                this.next('search', this.store.condition);
            });
            this.observe('reset').subscribe(async () => {
                this.setStore(await Products.service.initializeIndexAsync());
            });
            this.observe('search').subscribe(async condition => {
                if (condition) {
                    this.store.condition = Object.assign(
                        this.store.condition,
                        condition
                    );
                }
                this.next('render');
                this.setStore(
                    await Products.service.getIndexAsync(this.store.condition)
                );
            });
            this.observe('selectAll').subscribe(value => {
                this.store.items.forEach(x => (x.isSelected = value));
                this.next('render');
            });
            this.observe('select').subscribe(({ value, id }) => {
                this.store.items.find(x => x.id === id).isSelected = value;
                this.next('render');
            });
            this.observe('remove').subscribe(async ids => {
                await Products.service.removeRangeAsync(...ids);
                this.next('search');
            });
            this.next('initialize');
        }
    }
}
export const productsIndexAction = new InnerScope.Action();

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
        columns: number[];
    }
    export interface Event {
        reset: void;
        initialize: void;
        search: Partial<ProductsIndexCondition>;
        select: { value: boolean; id: number };
        selectAll: boolean;
        remove: number[];
        handleSizeChange: { index: number; width: number };
    }
    export class Action extends ActionBase<Store, Event> {
        protected initialize() {
            this.observe('initialize').subscribe(() => {
                this.next('reset');
            });
            this.observe('reset').subscribe(async () => {
                this.setStore(await Products.service.initializeIndexAsync());
                this.next('render');
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
                this.next('render');
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
            this.observe('handleSizeChange').subscribe(({ index, width }) => {
                this.store.columns[index] = width;
                this.next('render');
            });
            this.next('initialize');
        }
    }
}
export const productsIndexAction = new InnerScope.Action({
    condition: {
        pagination: {
            display: 10,
            current: 0,
            total: 0
        },
        sorting: {
            name: '',
            direction: 'asc'
        },
        name: '',
        status:''
    },
    columns: [50, 100, 300, 300, 300, 300],
    items: []
});

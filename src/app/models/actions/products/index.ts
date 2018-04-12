import { Products } from '../../../services/products-service';
import { Selectable } from '../../../../lib/models/selectable';
import { Condition } from '../../../../lib/models/condition';

export interface Product<T extends ProductVersion> {
    productId: number;
    name: string;
    status: string;
    price: number;
    productVersions: T[];
}
export interface ProductVersion {
    productVersionId: number;
    productId: number;
    version: string;
    date: string;
    notes: string;
}
export interface ProductsIndexStore {
    condition: ProductsIndexStoreCondition;
    items: ProductsIndexStoreItem[];
}
export interface ProductsIndexStoreCondition extends Condition {
    name?: string;
    status?: string;
}
export interface ProductsIndexStoreItem extends Selectable {
    id: number;
    name: string;
    status: string;
    price: number;
    latestVersion: string;
}
export interface ProductsIndexEvent {
    reset: void;
    initialize: void;
    search: Partial<ProductsIndexStoreCondition>;
    select: { value: boolean; id: number };
    selectAll: boolean;
}

import { Products } from '../../../services/products-service';

export interface ProductsIndexStore extends Products.InitializeAsyncResponse {}
export interface ProductsIndexEvent {
    reset: void;
    initialize: void;
    search: Partial<Products.GetAsyncRequest>;
}

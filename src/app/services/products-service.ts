import { Pagination } from '../../lib/models/pagination';
import { Sorting } from '../../lib/models/sorting';
import { Selectable } from '../../lib/models/selectable';
import { LocalStorageRepository } from '../../lib/services/local-storage-repository';
import { Condition } from '../../lib/models/condition';
import { delay, sort } from '../../lib/shared/cbn';

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
export interface ProductsIndexCondition extends Condition {
    name?: string;
    status?: string;
}
export interface ProductsIndexItem extends Selectable {
    id: number;
    name: string;
    status: string;
    price: number;
    latestVersion: string;
}

export namespace Products {
    const storage = new LocalStorageRepository<Product<ProductVersion>>(
        'products-storage',
        p1 => p2 => p1.productId === p2.productId
    );
    class Service {
        initializeIndexAsync = async () => {
            let condition: ProductsIndexCondition = {
                pagination: {
                    display: 10,
                    current: 0,
                    total: 0
                },
                sorting: {
                    name: '',
                    direction: 'asc'
                }
            };
            return await this.getIndexAsync(condition);
        };
        getIndexAsync = async (req: ProductsIndexCondition) => {
            await delay(500);
            let items = (await storage.getAllAsync())
                .filter(x => {
                    let res = true;
                    if (req.name) {
                        res = res && x.name.includes(req.name);
                    }
                    if (req.status) {
                        res = res && x.status.includes(req.status);
                    }
                    return res;
                })
                .map((v): ProductsIndexItem => {
                    let version = v.productVersions.sort(
                        sort(v => v.date, 'desc')
                    );
                    let latestVersion = version[0] ? version[0].version : null;
                    return {
                        isSelected: false,
                        id: v.productId,
                        name: v.name,
                        status: v.status,
                        price: v.price,
                        latestVersion
                    };
                })
                .sort((v1, v2) => {
                    let key =
                        req.sorting &&
                        req.sorting.name &&
                        Object.keys(v1).indexOf(req.sorting.name)
                            ? req.sorting.name
                            : 'id';
                    return sort(v => v[key], req.sorting.direction)(v1, v2);
                });
            let total = items.length;
            if (req.pagination.current * req.pagination.display > total) {
                req.pagination.current = Math.floor(
                    total / req.pagination.display
                );
            }
            let skip = req.pagination.current * req.pagination.display;

            items = items.slice(skip, skip + req.pagination.display);
            let condition = Object.assign({}, req, {
                pagination: {
                    total,
                    current: req.pagination.current,
                    display: req.pagination.display
                }
            });
            return {
                condition,
                items
            };
        };
        createAsync = async (product: Product<ProductVersion>) => {
            let list = await storage.getAllAsync();
            product.productId = list.length
                ? Math.max(...list.map(x => x.productId)) + 1
                : 0;
            let did =
                Math.max(
                    ...list.map(x =>
                        Math.max(
                            ...x.productVersions.map(y => y.productVersionId)
                        )
                    )
                ) + 1;
            product.productVersions.forEach(x => {
                x.productId = product.productId;
                x.productVersionId = did++;
            });
            await storage.pushAsync(product);
            return product.productId;
        };
        updateAsync = async (product: Product<ProductVersion>) => {
            await storage.updateAsync(product);
        };
        getAsync = async (id: number) => {
            return (await storage.getAllAsync()).find(x => x.productId === id);
        };
        removeRangeAsync = async (...ids: number[]) => {
            for (const id of ids) {
                let model = await this.getAsync(id);
                await storage.removeAsync(model);
            }
        };
    }
    export const service = new Service();
}

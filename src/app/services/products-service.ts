import { Cbn } from '../../lib/shared/cbn';
import { Pagination } from '../models/shared/pagination';
import { Sorting } from '../models/shared/sorting';
import { Selectable } from '../models/shared/selectable';

export namespace Products {
    export interface InitializeAsyncResponse {
        condition: Products.GetAsyncRequest;
        items: Products.GetAsyncResponseItem[];
    }
    export interface GetAsyncRequest {
        name?: string;
        status?: string;
        pagination: Pagination;
        sorting: Sorting;
    }
    export interface GetAsyncResponse {
        pager: Pagination;
        items: GetAsyncResponseItem[];
    }
    export interface GetAsyncResponseItem extends Selectable {
        id: number;
        name: string;
        status: string;
        price: number;
        releaseDate: string;
    }
    class Service {
        initializeAsync(): InitializeAsyncResponse {
            let condition: GetAsyncRequest = {
                name: '',
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
            let res = this.getAsync(condition);
            condition.pagination = res.pager;
            return {
                condition,
                items: res.items
            };
        }
        getAsync(req: GetAsyncRequest): GetAsyncResponse {
            let items = Array.from(new Array(100 + new Date(Date.now()).getSeconds()))
                .map((v, i): GetAsyncResponseItem => {
                    return {
                        isSelected: false,
                        id: i,
                        name: `name${i}`,
                        status: `status${i}`,
                        price: (i + 1) * 100,
                        releaseDate: Cbn.DateHelper.format(new Date(Date.now() - (i + 1) * 100), 'YYYY/MM/DD')
                    };
                })
                .filter(x => {
                    let res = true;
                    if (req.name) {
                        res = res && x.name.includes(req.name);
                    }
                    if (req.status) {
                        res = res && x.status.includes(req.status);
                    }
                    return res;
                });
            let total = items.length;
            if (req.pagination.current * req.pagination.display > total) {
                req.pagination.current = Math.floor(total / req.pagination.display);
            }
            let skip = req.pagination.current * req.pagination.display;

            items = items.slice(skip, skip + req.pagination.display);
            return {
                pager: {
                    total,
                    current: req.pagination.current,
                    display: req.pagination.display
                },
                items
            };
        }
    }
    export const service = new Service();
}

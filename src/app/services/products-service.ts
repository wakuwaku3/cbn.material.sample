import { Cbn } from '../../lib/shared/cbn';

export namespace Products {
    export interface InitializeAsyncResponse {
        condition: Products.GetAsyncRequest;
        items: Products.GetAsyncResponseItem[];
    }
    export interface GetAsyncRequest {
        name?: string;
        status?: string;
        pager?: Cbn.Pager;
    }
    export interface GetAsyncResponse {
        pager: Cbn.Pager;
        items: GetAsyncResponseItem[];
    }
    export interface GetAsyncResponseItem {
        id: number;
        name: string;
        status: string;
        price: number;
        releaseDate: string;
    }
    class Service {
        initializeAsync(): InitializeAsyncResponse {
            let condition = {
                name: '',
                pager: {
                    display: 10,
                    current: 0,
                    total: 0
                }
            };
            let res = this.getAsync(condition);
            condition.pager = res.pager;
            return {
                condition,
                items: res.items
            };
        }
        getAsync(req: GetAsyncRequest): GetAsyncResponse {
            let items = Array.from(
                new Array(100 + new Date(Date.now()).getMilliseconds())
            )
                .map((v, i): GetAsyncResponseItem => {
                    return {
                        id: i,
                        name: `name${i}`,
                        status: `status${i}`,
                        price: (i + 1) * 100,
                        releaseDate: Cbn.DateHelper.format(
                            new Date(Date.now() - (i + 1) * 100),
                            'YYYY/MM/DD'
                        )
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
            if (req.pager.current * req.pager.display > total) {
                req.pager.current = Math.floor(total / req.pager.display);
            }
            let skip = req.pager.current * req.pager.display;

            items = items.slice(skip, skip + req.pager.display);
            return {
                pager: {
                    total,
                    current: req.pager.current,
                    display: req.pager.display
                },
                items
            };
        }
    }
    export const service = new Service();
}

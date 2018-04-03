import { Cbn } from '../../lib/shared/cbn';

export namespace Products {
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
    }
    class Service {
        initializeAsync(): GetAsyncRequest {
            return {
                name: '',
                pager: {
                    display: 10,
                    current: 0,
                    total: 0
                }
            };
        }
        getAsync(req: GetAsyncRequest): GetAsyncResponse {
            let total = 1000 + new Date(Date.now()).getSeconds();
            if (req.pager.current * req.pager.display > total) {
                req.pager.current = Math.floor(total / req.pager.display);
            }
            let skip = req.pager.current * req.pager.display;

            let items = Array.from(new Array(total))
                .map((v, i) => {
                    return {
                        id: i,
                        name: `name${i}`,
                        status: `status${i}`
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
                })
                .slice(skip, skip + req.pager.display);
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

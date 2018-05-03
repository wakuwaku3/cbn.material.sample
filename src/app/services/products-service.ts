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
    p1 => p2 => p1.productId === p2.productId,
  );
  class Service {
    public initializeIndexAsync = async () => {
      const condition: ProductsIndexCondition = {
        pagination: {
          display: 10,
          current: 0,
          total: 0,
        },
        sorting: {
          name: '',
          direction: 'asc',
        },
        name: '',
        status: '',
      };
      return await this.getIndexAsync(condition);
    };
    public getIndexAsync = async (req: ProductsIndexCondition) => {
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
        .map((val): ProductsIndexItem => {
          const version = val.productVersions.sort(sort(v => v.date, 'desc'));
          const latestVersion = version[0] ? version[0].version : null;
          return {
            isSelected: false,
            id: val.productId,
            name: val.name,
            status: val.status,
            price: val.price,
            latestVersion,
          };
        })
        .sort((v1, v2) => {
          const key =
            req.sorting &&
            req.sorting.name &&
            Object.keys(v1).indexOf(req.sorting.name)
              ? req.sorting.name
              : 'id';
          return sort(v => v[key], req.sorting.direction)(v1, v2);
        });
      const total = items.length;
      if (req.pagination.current * req.pagination.display > total) {
        req.pagination.current = Math.floor(total / req.pagination.display);
      }
      const skip = req.pagination.current * req.pagination.display;

      items = items.slice(skip, skip + req.pagination.display);
      const condition = Object.assign({}, req, {
        pagination: {
          total,
          current: req.pagination.current,
          display: req.pagination.display,
        },
      });
      return {
        condition,
        items,
      };
    };
    public createAsync = async (product: Product<ProductVersion>) => {
      const list = await storage.getAllAsync();
      product.productId = list.length
        ? Math.max(...list.map(x => x.productId)) + 1
        : 0;
      let did =
        Math.max(
          ...list.map(x =>
            Math.max(...x.productVersions.map(y => y.productVersionId)),
          ),
        ) + 1;
      product.productVersions.forEach(x => {
        x.productId = product.productId;
        x.productVersionId = did++;
      });
      await storage.pushAsync(product);
      return product.productId;
    };
    public updateAsync = async (product: Product<ProductVersion>) => {
      await storage.updateAsync(product);
    };
    public getAsync = async (id: number) => {
      return (await storage.getAllAsync()).find(x => x.productId === id);
    };
    public removeRangeAsync = async (...ids: number[]) => {
      for (const id of ids) {
        const model = await this.getAsync(id);
        await storage.removeAsync(model);
      }
    };
  }
  export const service = new Service();
}

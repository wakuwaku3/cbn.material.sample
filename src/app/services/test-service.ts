import { AjaxHelper } from '../../lib/shared/ajax-helper';

export namespace Test {
  class Service {
    public async getInitializeAsync() {
      return await AjaxHelper.getTextAsync('/test/get');
    }
    public async getStepAsync() {
      return await AjaxHelper.getAsync<number>('/test/getStep');
    }
  }
  export const service = new Service();
}

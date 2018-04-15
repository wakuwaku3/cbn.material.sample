import { AjaxHelper } from '../../lib/shared/ajax-helper';

export namespace Test {
    class Service {
        async getInitializeAsync() {
            return await AjaxHelper.getTextAsync('/test/get');
        }
        async getStepAsync() {
            return await AjaxHelper.getAsync<number>('/test/getStep');
        }
    }
    export const service = new Service();
}

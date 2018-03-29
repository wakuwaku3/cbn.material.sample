import { Cbn } from '../../lib/shared/cbn';

export namespace Test {
    class Service {
        async getInitializeAsync() {
            return await Cbn.Ajax.get<string>('/test/get');
        }
        async getStepAsync() {
            return await Cbn.Ajax.get<number>('/test/getStep');
        }
    }
    export const service = new Service();
}

import { ActionBase } from '../../../lib/shared/react-frxp';
import { observeWindow } from '../../../lib/shared/window-helper';

namespace InnerScope {
    export interface Event {
        resize: void;
        resizeWindowItem: void;
    }
    export class Action extends ActionBase<{}, Event> {
        protected initialize() {
            observeWindow('resize').subscribe(() => {
                this.next('resize');
            });
            this.observe('resize').subscribe(() => {
                this.next('render');
            });
        }
    }
}
export const browserAction = new InnerScope.Action();

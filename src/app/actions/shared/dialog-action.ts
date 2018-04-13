import { ActionBase } from '../bases/action-base';
import { DialogContent } from '../../models/actions/shared/dialog';

namespace InnerScope {
    const key = 'dialog';
    type key = 'dialog';
    export interface event {
        reset: void;
        showSimple: DialogContent;
        showYesNo: DialogContent;
    }
    export class Action extends ActionBase<key, event> {
        constructor() {
            super(key);
        }
        protected initialize() {
            this.observe('reset').subscribe(value => {
                this.model = {
                    mode: 'none',
                    title: '',
                    text: '',
                    callBack: () => {}
                };
            });
            this.observe('showSimple').subscribe(content => {
                this.model = Object.assign(content, {
                    mode: 'simple' as 'simple'
                });
            });
            this.observe('showYesNo').subscribe(content => {
                this.model = Object.assign(content, {
                    mode: 'yesno' as 'yesno'
                });
            });
            this.emit('reset');
        }
    }
}
export const dialogAction = new InnerScope.Action();

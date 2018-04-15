import { ActionBase } from '../../../lib/shared/react-frxp';

namespace InnerScope {
    export interface Store extends Content {
        mode: 'none' | 'simple' | 'yesno';
        title: string;
        text: string;
        callBack: (yes?: boolean) => void;
    }
    export interface Content {
        title: string;
        text: string;
        callBack: (yes?: boolean) => void;
    }
    export interface Event {
        reset: void;
        showSimple: Content;
        showYesNo: Content;
    }
    export class Action extends ActionBase<Store, Event> {
        protected initialize() {
            this.observe('reset').subscribe(value => {
                this.setStore({
                    mode: 'none',
                    title: '',
                    text: '',
                    callBack: () => {}
                });
                this.next('render');
            });
            this.observe('showSimple').subscribe(content => {
                this.setStore(
                    Object.assign(content, {
                        mode: 'simple' as 'simple'
                    })
                );
                this.next('render');
            });
            this.observe('showYesNo').subscribe(content => {
                this.setStore(
                    Object.assign(content, {
                        mode: 'yesno' as 'yesno'
                    })
                );
                this.next('render');
            });
            this.next('reset');
        }
    }
}
export const dialogAction = new InnerScope.Action();

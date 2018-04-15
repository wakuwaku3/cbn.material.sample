import * as React from 'react';
import { dialogAction } from '../actions/shared/dialog-action';
import { YesNoDialog } from '../components/dialog/yes-no-dialog';
import { SimpleDialog } from '../components/dialog/simple-dialog';
import { withStore } from '../../lib/shared/react-frxp';

namespace InnerScope {
    export const component = withStore(dialogAction)(props => {
        return (
            <div>
                <YesNoDialog
                    title={dialogAction.store.title}
                    text={dialogAction.store.text}
                    onClose={yes => {
                        dialogAction.store.callBack(yes);
                        dialogAction.next('reset');
                    }}
                    open={dialogAction.store.mode === 'yesno'}
                />
                <SimpleDialog
                    title={dialogAction.store.title}
                    text={dialogAction.store.text}
                    onClose={() => {
                        dialogAction.store.callBack();
                        dialogAction.next('reset');
                    }}
                    open={dialogAction.store.mode === 'simple'}
                />
            </div>
        );
    });
}
export const AppDialog = InnerScope.component;

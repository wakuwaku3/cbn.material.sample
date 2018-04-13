import * as React from 'react';
import { decorateWithStore } from '../helper/app-style-helper';
import { dialogAction } from '../actions/shared/dialog-action';
import { YesNoDialog } from '../components/dialog/yes-no-dialog';
import { SimpleDialog } from '../components/dialog/simple-dialog';

namespace InnerScope {
    interface Style {}
    const style: Style = {};
    export const component = decorateWithStore(style, dialogAction.key)(
        sheet => props => {
            return (
                <div>
                    <YesNoDialog
                        title={dialogAction.model.title}
                        text={dialogAction.model.text}
                        onClose={yes => {
                            dialogAction.model.callBack(yes);
                            dialogAction.emit('reset');
                        }}
                        open={dialogAction.model.mode === 'yesno'}
                    />
                    <SimpleDialog
                        title={dialogAction.model.title}
                        text={dialogAction.model.text}
                        onClose={() => {
                            dialogAction.model.callBack();
                            dialogAction.emit('reset');
                        }}
                        open={dialogAction.model.mode === 'simple'}
                    />
                </div>
            );
        }
    );
}
export const AppDialog = InnerScope.component;

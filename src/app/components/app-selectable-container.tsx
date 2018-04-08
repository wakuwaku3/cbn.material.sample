import { AppStyle } from '../shared/app-style';
import { AppFormControlLabel } from './material-ui/wrapper';
import * as React from 'react';
import { AppContainer } from './app-container';

export namespace AppSelectableContainer {
    export interface Props extends AppFormControlLabel.Props {}
    const style = {};
    export const component = AppStyle.decorate(style)<Props>(sheet => props => (
        <AppContainer.component vertical="center" width="inherit">
            <AppFormControlLabel.component {...props} />
        </AppContainer.component>
    ));
}

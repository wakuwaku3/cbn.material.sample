import {
    AppFormControlLabel,
    AppFormControlLabelProps
} from './material-ui/wrapper';
import * as React from 'react';
import { AppContainer } from './app-container';
import { decorate } from '../helper/app-style-helper';

namespace InnerScope {
    export interface Props extends AppFormControlLabelProps {}
    const style = {};
    export const component = decorate(style)<Props>(sheet => props => (
        <AppContainer vertical="center" width="inherit">
            <AppFormControlLabel {...props} />
        </AppContainer>
    ));
}
export type AppSelectableContainerProps = InnerScope.Props;
export const AppSelectableContainer = InnerScope.component;

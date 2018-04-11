import { AppFormControlLabel, AppFormControlLabelProps } from '../material-ui/wrapper';
import * as React from 'react';
import { decorate } from '../../helper/app-style-helper';
import { Adjuster } from '../layout/adjuster';

namespace InnerScope {
    export interface Props extends AppFormControlLabelProps {}
    const style = {};
    export const component = decorate(style)<Props>(sheet => props => (
        <Adjuster vertical="center" width="inherit">
            <AppFormControlLabel {...props} />
        </Adjuster>
    ));
}
export type SelectableContainerProps = InnerScope.Props;
export const SelectableContainer = InnerScope.component;

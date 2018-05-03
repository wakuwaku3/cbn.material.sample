import {
  AppFormControlLabel,
  AppFormControlLabelProps,
} from '../material-ui/wrapper';
import * as React from 'react';
import { Adjuster } from '../layout/adjuster';
import { decorate } from '../../../lib/shared/style-helper';

namespace InnerScope {
  export interface Props extends AppFormControlLabelProps {}
  const style = {};
  export const component = decorate(style)<Props>(props => (
    <Adjuster vertical="center" width="inherit">
      <AppFormControlLabel {...props} />
    </Adjuster>
  ));
}
export type SelectableContainerProps = InnerScope.Props;
export const SelectableContainer = InnerScope.component;

import * as React from 'react';
import { AppButton } from '../material-ui/wrapper';
import { DialogBase } from './dialog-base';

export interface YesNoDialogProps {
  title?: string;
  text: string;
  open: boolean;
  onClose: (yes: boolean) => void;
}
export const YesNoDialog: React.SFC<YesNoDialogProps> = props => (
  <DialogBase
    title={props.title}
    text={props.text}
    open={props.open}
    onClose={() => props.onClose(false)}
    actionElements={[
      <AppButton
        key="yes"
        variant="raised"
        onClick={() => props.onClose(true)}
        color="primary"
      >
        Ok
      </AppButton>,
      <AppButton
        key="no"
        variant="raised"
        onClick={() => props.onClose(false)}
        color="secondary"
        autoFocus={true}
      >
        Cancel
      </AppButton>,
    ]}
  />
);

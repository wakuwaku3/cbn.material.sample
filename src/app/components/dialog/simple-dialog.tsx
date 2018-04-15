import * as React from 'react';
import { AppButton } from '../material-ui/wrapper';
import { DialogBase } from './dialog-base';

export interface SimpleDialogProps {
    title?: string;
    text: string;
    open: boolean;
    onClose: () => void;
}
export const SimpleDialog: React.SFC<SimpleDialogProps> = props => (
    <DialogBase
        title={props.title}
        text={props.text}
        open={props.open}
        onClose={() => props.onClose()}
        actionElements={[
            <AppButton
                key="ok"
                variant="raised"
                onClick={() => props.onClose()}
                color="primary"
            >
                Ok
            </AppButton>
        ]}
    />
);

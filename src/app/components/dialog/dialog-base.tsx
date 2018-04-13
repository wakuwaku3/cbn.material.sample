import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from 'material-ui';

export interface DialogBaseProps {
    title?: string;
    text: string;
    open: boolean;
    actionElements?: JSX.Element[];
    onClose: () => void;
}
export const DialogBase: React.SFC<DialogBaseProps> = props => (
    <Dialog open={props.open} onClose={props.onClose}>
        {(() => {
            if (props.title) {
                return <DialogTitle>{props.title}</DialogTitle>;
            }
            return '';
        })()}
        <DialogContent>
            <DialogContentText>{props.text}</DialogContentText>
        </DialogContent>
        {(() => {
            if (props.actionElements) {
                return <DialogActions>{props.actionElements}</DialogActions>;
            }
            return '';
        })()}
    </Dialog>
);

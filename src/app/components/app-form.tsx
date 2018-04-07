import { PaperProps } from 'material-ui/Paper';
import { Paper } from 'material-ui';
import { AppStyle } from '../shared/app-style';
import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { AppPaper } from './material-ui/wrapper';

export namespace AppForm {
    export interface Props {
        paperProps?: PaperProps;
        innerFormProps?: React.DetailedHTMLProps<
            React.FormHTMLAttributes<HTMLFormElement>,
            HTMLFormElement
        >;
    }
    export const styles = {
        paper: {
            padding: [10, 20]
        }
    };
    export const component = AppStyle.decorate(styles)(
        sheet => (props: Cbn.WithChildren<Props>) => {
            let paperProps = Cbn.mergeClassNeme(
                props.paperProps,
                sheet.classes.paper
            );
            return (
                <AppPaper.component {...paperProps}>
                    <form {...props.innerFormProps}>{props.children}</form>
                </AppPaper.component>
            );
        }
    );
}

import { PaperProps } from 'material-ui/Paper';
import { Theme, Paper } from 'material-ui';
import { App } from '../shared/app';
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
    export const styles = (theme: Theme) => {
        return {
            paper: {
                padding: [10, 20]
            }
        };
    };
    export const component = App.decorate(styles)(
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

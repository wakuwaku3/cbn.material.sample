import { PaperProps } from 'material-ui/Paper';
import { Paper } from 'material-ui';
import { AppStyle } from '../shared/app-style';
import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { AppPaper, AppTypography } from './material-ui/wrapper';

export namespace AppForm {
    export interface Props {
        title?: string;
        paperProps?: PaperProps;
        innerFormProps?: React.DetailedHTMLProps<
            React.FormHTMLAttributes<HTMLFormElement>,
            HTMLFormElement
        >;
    }
    export const styles = {
        paper: {
            padding: 20
        },
        title: {
            'margin-bottom': 10
        }
    };
    export const component = AppStyle.decorate(styles)<Props>(
        sheet => props => {
            let paperProps = Cbn.mergeClassNeme(
                props.paperProps,
                sheet.classes.paper
            );
            return (
                <AppPaper.component {...paperProps}>
                    {(() => {
                        if (props.title) {
                            return (
                                <AppTypography.component
                                    variant="display1"
                                    className={sheet.classes.title}
                                >
                                    {props.title}
                                </AppTypography.component>
                            );
                        }
                    })()}
                    <form {...props.innerFormProps}>{props.children}</form>
                </AppPaper.component>
            );
        }
    );
}

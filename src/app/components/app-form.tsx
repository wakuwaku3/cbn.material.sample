import { PaperProps } from 'material-ui/Paper';
import { Paper } from 'material-ui';
import { Cbn } from '../../lib/shared/cbn';
import * as React from 'react';
import { AppPaper, AppTypography } from './material-ui/wrapper';
import { decorate } from '../helper/app-style-helper';

namespace InnerScope {
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
    export const component = decorate(styles)<Props>(sheet => props => {
        let paperProps = Cbn.mergeClassNeme(
            props.paperProps,
            sheet.classes.paper
        );
        return (
            <AppPaper {...paperProps}>
                {(() => {
                    if (props.title) {
                        return (
                            <AppTypography
                                variant="display1"
                                className={sheet.classes.title}
                            >
                                {props.title}
                            </AppTypography>
                        );
                    }
                })()}
                <form {...props.innerFormProps}>{props.children}</form>
            </AppPaper>
        );
    });
}
export type AppFormProps = InnerScope.Props;
export const AppForm = InnerScope.component;

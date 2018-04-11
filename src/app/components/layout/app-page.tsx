import { PaperProps } from 'material-ui/Paper';
import { Paper } from 'material-ui';
import { Cbn } from '../../../lib/shared/cbn';
import * as React from 'react';
import { AppPaper, AppTypography } from '../material-ui/wrapper';
import { decorate } from '../../helper/app-style-helper';
import { Title } from './app-title';

namespace InnerScope {
    export interface Props {
        title: string;
        displayTitle?: boolean;
        paperProps?: PaperProps;
    }
    const styles = {
        paper: {
            padding: 20
        }
    };
    export const component = decorate(styles)<Props>(sheet => props => {
        let paperProps = Cbn.mergeClassNeme(props.paperProps, sheet.classes.paper);
        return (
            <AppPaper {...paperProps}>
                <Title displayTitle>{props.title}</Title>
                {props.children}
            </AppPaper>
        );
    });
    component.defaultProps = {
        displayTitle: true
    };
}
export type PageProps = InnerScope.Props;
export const Page = InnerScope.component;

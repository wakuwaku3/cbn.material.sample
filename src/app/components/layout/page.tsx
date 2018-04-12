import * as React from 'react';
import { Cbn } from '../../../lib/shared/cbn';
import { AppPaper, AppTypography, AppPaperProps } from '../material-ui/wrapper';
import { decorate } from '../../helper/app-style-helper';
import { Title } from './title';
import { Adjuster } from './adjuster';
import { Loading } from '../form-control/loading';

namespace InnerScope {
    export interface Props {
        title: string;
        loading?: boolean;
        hiddenTitle?: boolean;
        paperProps?: AppPaperProps;
    }
    const styles = {
        paper: {
            padding: 20
        },
        loading: {
            'align-items': 'center',
            display: 'flex',
            'justify-content': 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    };
    export const component = decorate(styles)<Props>(sheet => props => {
        let paperProps = Cbn.mergeClassNeme(props.paperProps, sheet.classes.paper);
        if (props.loading) {
            return (
                <div className={sheet.classes.loading}>
                    <Loading size={60} />
                </div>
            );
        }
        return (
            <AppPaper {...paperProps}>
                <Title hiddenTitle={props.hiddenTitle}>{props.title}</Title>
                {props.children}
            </AppPaper>
        );
    });
}
export type PageProps = InnerScope.Props;
export const Page = InnerScope.component;

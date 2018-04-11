import * as React from 'react';
import { decorate } from '../../helper/app-style-helper';
import { AppTypography } from '../material-ui/wrapper';
import { WithStyles } from 'material-ui';

namespace InnerScope {
    export interface Props {
        displayTitle?: boolean;
    }
    export interface Style {
        root;
    }
    const style: Style = {
        root: {
            'margin-bottom': 10
        }
    };
    export const component = decorate(style)(
        sheet =>
            class extends React.Component<Props> {
                componentDidMount() {
                    document.title = `cbn.undux.sample - ${this.props.children.toString()}`;
                }
                render() {
                    if (this.props.displayTitle) {
                        return (
                            <AppTypography variant="display1" className={sheet.classes.title}>
                                {this.props.children}
                            </AppTypography>
                        );
                    }
                    return <div />;
                }
            }
    );
    component.defaultProps = {
        displayTitle: true
    };
}
export type TitleProps = InnerScope.Props;
export const Title = InnerScope.component;

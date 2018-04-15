import * as React from 'react';
import { AppTypography } from '../material-ui/wrapper';
import { WithStyles } from 'material-ui';
import { decorate, StyledProps } from '../../../lib/shared/style-helper';

namespace InnerScope {
    export interface Props {
        hiddenTitle?: boolean;
    }
    export interface Style {
        title;
    }
    const style: Style = {
        title: {
            'margin-bottom': 10
        }
    };
    export const component = decorate(style)(
        class extends React.Component<Props & StyledProps<Style>> {
            componentDidMount() {
                document.title = `cbn.undux.sample - ${this.props.children.toString()}`;
            }
            render() {
                if (this.props.hiddenTitle) {
                    return '';
                }
                return (
                    <AppTypography
                        variant="display1"
                        className={this.props.classes.title}
                    >
                        {this.props.children}
                    </AppTypography>
                );
            }
        }
    );
    component.defaultProps = {
        hiddenTitle: false
    };
}
export type TitleProps = InnerScope.Props;
export const Title = InnerScope.component;

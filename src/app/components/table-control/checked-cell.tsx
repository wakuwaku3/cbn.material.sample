import * as React from 'react';
import { Cell } from './cell';
import { AppCheckbox } from '../material-ui/wrapper';
import { decorate } from '../../../lib/shared/style-helper';

namespace InnerScope {
    interface Style {
        root;
        container;
    }
    const style: Style = {
        root: {
            'text-align': 'center',
            'min-width': 50,
            padding: 0
        },
        container: {
            padding: 0
        }
    };
    export interface Props {
        hidden?: boolean;
        disabled?: boolean;
        checked: boolean;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
    export const component = decorate(style)<Props>(props => {
        return (
            <Cell classes={props.classes}>
                {(() => {
                    if (!props.hidden) {
                        return (
                            <AppCheckbox
                                disabled={props.disabled}
                                checked={props.checked}
                                onChange={props.onChange}
                            />
                        );
                    }
                    return '';
                })()}
            </Cell>
        );
    });
}
export type CheckedCellProps = InnerScope.Props;
export const CheckedCell = InnerScope.component;

import * as React from 'react';
import { themeAction } from '../../actions/shared/theme-action';
import { Message } from '../../models/actions/shared/messages';
import { SnackBarOrigin } from 'material-ui/Snackbar';
import { decorate } from '../../helper/app-style-helper';
import { MessageBar } from './message-bar';

namespace InnerScope {
    interface Style {
        root;
        'root-vertical-top';
        'root-vertical-center';
        'root-vertical-bottom';
        'root-horizontal-left';
        'root-horizontal-center';
        'root-horizontal-right';
    }
    const style: Style = {
        root: themeAction.getThemeObservable().map(theme => ({
            position: 'fixed',
            'z-index': theme.zIndex.snackbar,
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 0
            }
        })),
        'root-vertical-top': { top: 0 },
        'root-vertical-center': { top: 0, bottom: 0 },
        'root-vertical-bottom': { bottom: 0 },
        'root-horizontal-left': { left: 0 },
        'root-horizontal-center': { left: 0, right: 0 },
        'root-horizontal-right': { right: 0 }
    };
    export interface Props {
        onClose?: (index: number) => void;
        messages: Message[];
        anchorOrigin?: SnackBarOrigin;
    }
    export const component = decorate(style)<Props>(sheet => props => {
        let className = [
            sheet.classes.root,
            sheet.classes['root-vertical-' + props.anchorOrigin.vertical],
            sheet.classes['root-horizontal-' + props.anchorOrigin.horizontal]
        ].join(' ');
        return (
            <div className={className}>
                {props.messages.map((m, i) => {
                    return (
                        <MessageBar
                            key={i}
                            anchorOrigin={props.anchorOrigin}
                            message={m}
                            onClose={() => {
                                if (props.onClose) props.onClose(i);
                            }}
                        />
                    );
                })}
            </div>
        );
    });
    component.defaultProps = {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
        }
    };
}
export type MessageContainerProps = InnerScope.Props;
export const MessageContainer = InnerScope.component;

import { Component } from 'react';
import * as React from 'react';
import { Typography, TextField } from 'material-ui';
import {
    AppTextField,
    AppTypography,
    AppPaper
} from '../../components/material-ui/wrapper';
import { Counter } from './components/counter';
import { homeIndexAction } from '../../actions/home/index-actions';
import {
    WindowItem,
    WindowContainer
} from '../../components/layout/window-item';
import { findDOMNode } from 'react-dom';
import { PaneContainer } from '../../components/layout/pane-container';
import { withStore } from '../../../lib/shared/react-frxp';
import { EventComponentBase } from '../../../lib/bases/event-component-base';

namespace InnerScope {
    const styles = {};
    interface Props {
        name: string;
        count: number;
        onCount: () => void;
        onChangeName: (name: string) => void;
    }
    const Content: React.SFC<Props> = props => (
        <div>
            <AppTypography>Home</AppTypography>
            <Counter
                name={props.name}
                count={props.count}
                onClick={props.onCount}
            />
            <AppTextField
                label="name"
                value={props.name}
                onChange={e => props.onChangeName(e.target.value)}
            />
        </div>
    );

    const getItem = () => {
        return (
            <Content
                name={homeIndexAction.store.name}
                count={homeIndexAction.store.count}
                onCount={() => homeIndexAction.next('count')}
                onChangeName={name => homeIndexAction.next('setName', name)}
            />
        );
    };

    export const component = withStore(homeIndexAction)(
        class extends React.Component {
            render() {
                return (
                    <WindowContainer ref="parent">
                        <WindowItem
                            findParent={() => findDOMNode(this.refs.parent)}
                            {...homeIndexAction.store.windowItemSizes[0]}
                            onChange={size =>
                                homeIndexAction.next('changeWindowSize', {
                                    size,
                                    index: 0
                                })
                            }
                        >
                            <PaneContainer
                                sizes={homeIndexAction.store.paneSizes[0]}
                                elements={[getItem(), getItem(), getItem()]}
                                onChange={sizes =>
                                    homeIndexAction.next('changePaneSize', {
                                        sizes,
                                        index: 0
                                    })
                                }
                            />
                        </WindowItem>
                        <WindowItem
                            findParent={() => findDOMNode(this.refs.parent)}
                            {...homeIndexAction.store.windowItemSizes[1]}
                            onChange={size =>
                                homeIndexAction.next('changeWindowSize', {
                                    size,
                                    index: 1
                                })
                            }
                        >
                            <PaneContainer
                                sizes={homeIndexAction.store.paneSizes[1]}
                                axis="Vertical"
                                elements={[getItem(), getItem(), getItem()]}
                                onChange={sizes =>
                                    homeIndexAction.next('changePaneSize', {
                                        sizes,
                                        index: 1
                                    })
                                }
                            />
                        </WindowItem>
                    </WindowContainer>
                );
            }
        }
    );
}
export const HomeIndex = InnerScope.component;

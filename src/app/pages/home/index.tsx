import { Component } from 'react';
import * as React from 'react';
import { Cbn } from '../../../lib/shared/cbn';
import { Typography, TextField } from 'material-ui';
import { AppTextField, AppTypography, AppPaper } from '../../components/material-ui/wrapper';
import { Counter } from './components/counter';
import { decorateWithStore } from '../../helper/app-style-helper';
import { homeIndexAction } from '../../actions/home/index-actions';
import { WindowItem, WindowContainer } from '../../components/window-item';
import { findDOMNode } from 'react-dom';
import { DividerContainer } from '../../components/divider-container';

namespace InnerScope {
    const styles = {};
    const getitem = () => (
        <div>
            <AppTypography>Home</AppTypography>
            <Counter
                name={homeIndexAction.model.name}
                count={homeIndexAction.model.count}
                onClick={e => homeIndexAction.emit('count')}
            />
            <AppTextField
                label="name"
                type="name"
                value={homeIndexAction.model.name}
                margin="normal"
                fullWidth
                onChange={e => homeIndexAction.emit('setName', e.target.value)}
            />
        </div>
    );
    export const component = decorateWithStore(styles, homeIndexAction.key)(
        sheet =>
            class extends React.Component {
                render() {
                    return (
                        <WindowContainer ref="parent">
                            <WindowItem findParent={() => findDOMNode(this.refs.parent)}>
                                <DividerContainer elements={[getitem(), getitem(), getitem()]} />
                            </WindowItem>
                            <WindowItem findParent={() => findDOMNode(this.refs.parent)}>
                                <DividerContainer axis="Vertical" elements={[getitem(), getitem(), getitem()]} />
                            </WindowItem>
                        </WindowContainer>
                    );
                }
            }
    );
}
export const HomeIndex = InnerScope.component;

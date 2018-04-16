import { observeWindow } from './window-helper';
import { Observable } from 'rxjs/Observable';
import { EventSubject } from './frxp';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { RenderObservable } from '../models/render-observable';

export const withStore = (...refleshables: RenderObservable[]) => <Props = {}>(
    component: React.ComponentType<Props>
) =>
    class extends React.Component<Props, { renderTrigger: number }> {
        subscriptions: Subscription[] = [];
        constructor(props) {
            super(props);
            this.state = { renderTrigger: 0 };
        }
        componentWillMount() {
            this.subscriptions = refleshables.map(item => {
                return item.observeRender().subscribe(() => {
                    let renderTrigger = this.state.renderTrigger + 1;
                    if (renderTrigger > 1000) renderTrigger = 0;
                    this.setState({
                        renderTrigger
                    });
                });
            });
        }
        componentWillUnmount() {
            if (this.subscriptions) {
                this.subscriptions.forEach(x => x.unsubscribe());
            }
        }
        render() {
            return React.createElement(
                component,
                this.props,
                this.props.children
            );
        }
    };

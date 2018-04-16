import { observeWindow } from './window-helper';
import { Observable } from 'rxjs/Observable';
import { EventSubject } from './frxp';
import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { RenderObservable } from '../models/render-observable';

export const withStore = (...refleshables: RenderObservable[]) => <Props={}>(
    component: React.ComponentType<Props>
) =>
    class extends React.Component<Props, { renderTrigger: boolean }> {
        subscriptions: Subscription[] = [];
        constructor(props) {
            super(props);
            this.state = { renderTrigger: false };
        }
        componentWillMount() {
            this.subscriptions = refleshables.map(item => {
                return item.observeRender().subscribe(() =>
                    this.setState({
                        renderTrigger: !this.state.renderTrigger
                    })
                );
            });
        }
        componentWillUnmount() {
            if (this.subscriptions) {
                this.subscriptions.forEach(x => x.unsubscribe());
            }
        }
        render() {
            let props = Object.assign({}, this.props, this.state);
            return React.createElement(component, props, this.props.children);
        }
    };

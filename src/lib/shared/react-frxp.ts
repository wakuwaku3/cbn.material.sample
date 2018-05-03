import * as React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { RenderObservable } from '../models/render-observable';

export const withStore = (...refleshables: RenderObservable[]) => <Props = {}>(
  component: React.ComponentType<Props>,
) =>
  class extends React.Component<Props, { renderTrigger: number }> {
    public subscriptions: Subscription[] = [];
    constructor(props) {
      super(props);
      this.state = { renderTrigger: 0 };
    }
    public componentWillMount() {
      this.subscriptions = refleshables.map(item => {
        return item.observeRender().subscribe(() => {
          let renderTrigger = this.state.renderTrigger + 1;
          if (renderTrigger > 1000) { renderTrigger = 0; }
          this.setState({
            renderTrigger,
          });
        });
      });
    }
    public componentWillUnmount() {
      if (this.subscriptions) {
        this.subscriptions.forEach(x => x.unsubscribe());
      }
    }
    public render() {
      return React.createElement(component, this.props, this.props.children);
    }
  };

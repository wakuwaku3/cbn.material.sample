import * as React from 'react';
import { MenuItemProps, MenuItem } from 'material-ui';
import { Route } from 'react-router';

export namespace MenuItemLink {
    export interface Props {
        url: string;
    }
    export class component extends React.Component<Props & MenuItemProps> {
        render() {
            return (
                <Route
                    render={({ history, location }) => (
                        <MenuItem
                            {...this.props}
                            onClick={e => {
                                history.push(this.props.url);
                                if (this.props.onClick) {
                                    this.props.onClick(e);
                                }
                            }}
                        />
                    )}
                />
            );
        }
    }
}

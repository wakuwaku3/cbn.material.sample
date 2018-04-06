import {
    Theme,
    WithStyles,
    Paper,
    Grid,
    TextField,
    Button,
    Snackbar
} from 'material-ui';
import { App } from '../shared/app';
import * as React from 'react';
import { PaperProps } from 'material-ui/Paper';
import { Cbn } from '../../lib/shared/cbn';
import { MessagesAction } from '../actions/shared/messages-action';

export namespace CbnContainer {
    export interface Props
        extends StyledArgs,
            React.DetailedHTMLProps<
                React.FormHTMLAttributes<HTMLDivElement>,
                HTMLDivElement
            > {}

    type vertical = 'top' | 'center' | 'bottom';
    type horizontal = 'left' | 'center' | 'right';
    type flexPosition = 'flex-start' | 'center' | 'flex-end';
    interface StyledArgs {
        vertical?: vertical;
        horizontal?: horizontal;
    }
    const convertVertical = (args: StyledArgs): flexPosition => {
        if (!args || !args.vertical) {
            return 'flex-start';
        }
        switch (args.vertical) {
            case 'top':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'bottom':
                return 'flex-end';
        }
    };
    const convertHorizontal = (args: StyledArgs): flexPosition => {
        if (!args || !args.horizontal) {
            return 'flex-start';
        }
        switch (args.horizontal) {
            case 'left':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';
        }
    };
    export const styles = (theme: Theme) => {
        return {
            container: (props: Props) => {
                let style = {
                    'align-items': convertVertical(props),
                    height: '100%',
                    width: '100%',
                    display: 'flex' as 'flex',
                    'justify-content': convertHorizontal(props)
                };
                return style;
            }
        };
    };
    export const component = App.decorate(styles)(sheet => (props: Props) => {
        sheet.update(props);
        let merged = Cbn.mergeClassNeme(props, sheet.classes.container);
        return <div {...merged}>{props.children}</div>;
    });
}
export namespace CbnForm {
    export interface Props {
        paperProps?: PaperProps;
        innerFormProps?: React.DetailedHTMLProps<
            React.FormHTMLAttributes<HTMLFormElement>,
            HTMLFormElement
        >;
    }
    export const styles = (theme: Theme) => {
        return {
            paper: {
                padding: [10, 20]
            }
        };
    };
    type styles = WithStyles<'paper'>;
    export const component = App.decorate(styles)(
        sheet => (props: Cbn.WithChildren<Props>) => {
            let paperProps = Cbn.mergeClassNeme(
                props.paperProps,
                sheet.classes.paper
            );
            return (
                <Paper {...paperProps}>
                    <form {...props.innerFormProps}>{props.children}</form>
                </Paper>
            );
        }
    );
}
export namespace LogIn {
    export interface EventArgs {
        id: string;
        password: string;
        callBackHasError: (message: string) => void;
    }
    export interface Props {
        onLogIn: (args: EventArgs) => void;
    }
    export interface State {
        id: string;
        password: string;
    }
    type styles = WithStyles<'paper' | 'button-container'>;
    export const styles = (theme: Theme) => {
        return {
            paper: {
                width: 400
            },
            'button-container': {
                padding: [18, 0, 4]
            }
        };
    };
    export const component = App.decorate(styles)(
        sheet =>
            class extends React.Component<Props, State> {
                constructor(props: Props) {
                    super(props);
                    this.state = { id: '', password: '' };
                }
                private handleChange = (name: keyof State) => event => {
                    let state = {};
                    state[name] = event.target.value;
                    this.setState(state);
                };
                private handleLogIn = event => {
                    let args = Object.assign(
                        {
                            callBackHasError: this.showError
                        },
                        this.state
                    );
                    this.props.onLogIn(args);
                };
                private showError(message: string) {
                    MessagesAction.action.emitter.emit('handleOpen', {
                        errorMessage: message
                    });
                }
                render() {
                    return (
                        <CbnContainer.component
                            vertical="center"
                            horizontal="center"
                        >
                            <CbnForm.component
                                paperProps={{
                                    className: sheet.classes.paper
                                }}
                            >
                                <Grid container>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="ユーザーId"
                                            value={this.state.id}
                                            margin="normal"
                                            fullWidth
                                            onChange={this.handleChange('id')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="パスワード"
                                            type="password"
                                            value={this.state.password}
                                            margin="normal"
                                            fullWidth
                                            onChange={this.handleChange(
                                                'password'
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CbnContainer.component
                                            vertical="center"
                                            horizontal="center"
                                            className={
                                                sheet.classes[
                                                    'button-container'
                                                ]
                                            }
                                        >
                                            <Button
                                                variant="raised"
                                                color="primary"
                                                onClick={this.handleLogIn}
                                            >
                                                ログイン
                                            </Button>
                                        </CbnContainer.component>
                                    </Grid>
                                </Grid>
                            </CbnForm.component>
                        </CbnContainer.component>
                    );
                }
            }
    );
}

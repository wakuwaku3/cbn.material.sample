import { Theme, Grid, TextField, Button } from 'material-ui';
import { App } from '../shared/app';
import * as React from 'react';
import { MessagesAction } from '../actions/shared/messages-action';
import { AppContainer } from './app-container';
import { AppForm } from './app-form';
import { AppTextField, AppButton } from './material-ui/wrapper';

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
                        <AppContainer.component
                            vertical="center"
                            horizontal="center"
                        >
                            <AppForm.component
                                paperProps={{
                                    className: sheet.classes.paper
                                }}
                            >
                                <Grid container>
                                    <Grid item xs={12}>
                                        <AppTextField.component
                                            label="ユーザーId"
                                            value={this.state.id}
                                            margin="normal"
                                            fullWidth
                                            onChange={this.handleChange('id')}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AppTextField.component
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
                                        <AppContainer.component
                                            vertical="center"
                                            horizontal="center"
                                            className={
                                                sheet.classes[
                                                    'button-container'
                                                ]
                                            }
                                        >
                                            <AppButton.component
                                                variant="raised"
                                                color="primary"
                                                onClick={this.handleLogIn}
                                            >
                                                ログイン
                                            </AppButton.component>
                                        </AppContainer.component>
                                    </Grid>
                                </Grid>
                            </AppForm.component>
                        </AppContainer.component>
                    );
                }
            }
    );
}

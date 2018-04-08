import { Grid, TextField, Button } from 'material-ui';
import * as React from 'react';
import {
    AppGrid,
    AppTextField,
    AppButton
} from '../../../components/material-ui/wrapper';
import { AppStyle } from '../../../shared/app-style';
import { MessagesAction } from '../../../actions/shared/messages-action';
import { AppContainer } from '../../../components/app-container';
import { AppForm } from '../../../components/app-form';
import { AuthAction } from '../../../actions/shared/auth-action';

export namespace LogIn {
    export interface Props {
        onLogIn: (args: AuthAction.LogInEventArgs) => void;
    }
    export interface State {
        id: string;
        password: string;
    }
    export const styles = {
        paper: {
            width: 400
        },
        'button-container': {
            padding: [18, 0, 4]
        }
    };
    export const component = AppStyle.decorate(styles)(
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
                                <AppGrid.component container>
                                    <AppGrid.component item xs={12}>
                                        <AppTextField.component
                                            label="ユーザーId"
                                            value={this.state.id}
                                            margin="normal"
                                            fullWidth
                                            onChange={this.handleChange('id')}
                                        />
                                    </AppGrid.component>
                                    <AppGrid.component item xs={12}>
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
                                    </AppGrid.component>
                                    <AppGrid.component item xs={12}>
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
                                    </AppGrid.component>
                                </AppGrid.component>
                            </AppForm.component>
                        </AppContainer.component>
                    );
                }
            }
    );
}

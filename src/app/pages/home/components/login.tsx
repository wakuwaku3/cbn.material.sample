import { Grid, TextField, Button } from 'material-ui';
import * as React from 'react';
import {
    AppGrid,
    AppTextField,
    AppButton
} from '../../../components/material-ui/wrapper';
import { AppContainer } from '../../../components/app-container';
import { AppForm } from '../../../components/app-form';
import { LogInEventArgs } from '../../../models/actions/shared/auth';
import { decorate } from '../../../helper/app-style-helper';
import { messagesAction } from '../../../actions/shared/messages-action';

namespace InnerScope {
    export interface Props {
        onLogIn: (args: LogInEventArgs) => void;
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
    export const component = decorate(styles)(
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
                    messagesAction.emit('handleOpen', {
                        errorMessage: message
                    });
                }
                render() {
                    return (
                        <AppContainer vertical="center" horizontal="center">
                            <AppForm
                                paperProps={{
                                    className: sheet.classes.paper
                                }}
                            >
                                <AppGrid container>
                                    <AppGrid item xs={12}>
                                        <AppTextField
                                            label="ユーザーId"
                                            value={this.state.id}
                                            margin="normal"
                                            fullWidth
                                            onChange={this.handleChange('id')}
                                        />
                                    </AppGrid>
                                    <AppGrid item xs={12}>
                                        <AppTextField
                                            label="パスワード"
                                            type="password"
                                            value={this.state.password}
                                            margin="normal"
                                            fullWidth
                                            onChange={this.handleChange(
                                                'password'
                                            )}
                                        />
                                    </AppGrid>
                                    <AppGrid item xs={12}>
                                        <AppContainer
                                            vertical="center"
                                            horizontal="center"
                                            className={
                                                sheet.classes[
                                                    'button-container'
                                                ]
                                            }
                                        >
                                            <AppButton
                                                variant="raised"
                                                color="primary"
                                                onClick={this.handleLogIn}
                                            >
                                                ログイン
                                            </AppButton>
                                        </AppContainer>
                                    </AppGrid>
                                </AppGrid>
                            </AppForm>
                        </AppContainer>
                    );
                }
            }
    );
}
export type LogInProps = InnerScope.Props;
export const LogIn = InnerScope.component;

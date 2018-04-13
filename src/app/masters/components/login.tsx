import * as React from 'react';
import { LogInEventArgs } from '../../models/actions/shared/auth';
import { decorate } from '../../helper/app-style-helper';
import { messagesAction } from '../../actions/shared/messages-action';
import {
    AppGrid,
    AppTextField,
    AppButton,
    AppPaper
} from '../../components/material-ui/wrapper';
import { Adjuster } from '../../components/layout/adjuster';
import { Title } from '../../components/layout/title';
import { authAction } from '../../actions/shared/auth-action';
import { Message } from '../../models/actions/shared/messages';

namespace InnerScope {
    export interface Props {}
    export interface State {
        id: string;
        password: string;
    }
    export const styles = {
        root: {
            height: '100%'
        },
        paper: {
            width: 400
        },
        'button-container': {
            padding: [10, 0]
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
                    authAction.emit('login', args);
                };
                private showError(message: Message) {
                    messagesAction.emit('showMessage', message);
                }
                render() {
                    return (
                        <Adjuster
                            vertical="center"
                            horizontal="center"
                            className={sheet.classes.root}
                        >
                            <Title hiddenTitle={true}>ログイン</Title>
                            <AppPaper className={sheet.classes.paper}>
                                <form>
                                    <AppGrid container>
                                        <AppGrid item xs={12}>
                                            <AppTextField
                                                label="ユーザーId"
                                                value={this.state.id}
                                                margin="normal"
                                                fullWidth
                                                onChange={this.handleChange(
                                                    'id'
                                                )}
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
                                            <Adjuster
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
                                            </Adjuster>
                                        </AppGrid>
                                    </AppGrid>
                                </form>
                            </AppPaper>
                        </Adjuster>
                    );
                }
            }
    );
}
export type LogInProps = InnerScope.Props;
export const LogIn = InnerScope.component;
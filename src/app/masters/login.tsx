import * as React from 'react';
import { decorate, StyledProps } from '../../lib/shared/style-helper';
import { authAction } from '../actions/shared/auth-action';
import { Message, messagesAction } from '../actions/shared/messages-action';
import { Adjuster } from '../components/layout/adjuster';
import { Title } from '../components/layout/title';
import {
    AppPaper,
    AppGrid,
    AppTextField,
    AppButton
} from '../components/material-ui/wrapper';

namespace InnerScope {
    interface Style {
        root;
        paper;
        'button-container';
    }
    export const style: Style = {
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
    export interface State {
        id: string;
        password: string;
    }
    export const component = decorate(style)(
        class extends React.Component<StyledProps<Style>, State> {
            constructor(props) {
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
                authAction.next('login', args);
            };
            private showError(message: Message) {
                messagesAction.next('showMessage', message);
            }
            render() {
                return (
                    <Adjuster
                        vertical="center"
                        horizontal="center"
                        className={this.props.classes.root}
                    >
                        <Title hiddenTitle={true}>ログイン</Title>
                        <AppPaper className={this.props.classes.paper}>
                            <form>
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
                                        <Adjuster
                                            vertical="center"
                                            horizontal="center"
                                            className={
                                                this.props.classes[
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
export const LogIn = InnerScope.component;

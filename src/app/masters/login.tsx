import * as React from 'react';
import { decorate } from '../../lib/shared/style-helper';
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
import { FormComponent } from '../../lib/bases/form-component';
import { withStore } from '../../lib/shared/react-frxp';

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
    export interface InnerProps extends State {
        onChange: (name: keyof State, value: string) => void;
        onLogIn: () => void;
    }
    const Inner = decorate(style)<InnerProps>(props => (
        <Adjuster
            vertical="center"
            horizontal="center"
            className={props.classes.root}
        >
            <Title hiddenTitle={true}>ログイン</Title>
            <AppPaper className={props.classes.paper}>
                <form>
                    <AppGrid container>
                        <AppGrid item xs={12}>
                            <AppTextField
                                label="ユーザーId"
                                value={props.id}
                                margin="normal"
                                fullWidth
                                onChange={e =>
                                    props.onChange('id', e.target.value)
                                }
                            />
                        </AppGrid>
                        <AppGrid item xs={12}>
                            <AppTextField
                                label="パスワード"
                                type="password"
                                value={props.password}
                                margin="normal"
                                fullWidth
                                onChange={e =>
                                    props.onChange('password', e.target.value)
                                }
                            />
                        </AppGrid>
                        <AppGrid item xs={12}>
                            <Adjuster
                                vertical="center"
                                horizontal="center"
                                className={props.classes['button-container']}
                            >
                                <AppButton
                                    variant="raised"
                                    color="primary"
                                    onClick={props.onLogIn}
                                >
                                    ログイン
                                </AppButton>
                            </Adjuster>
                        </AppGrid>
                    </AppGrid>
                </form>
            </AppPaper>
        </Adjuster>
    ));
    interface Event {
        handleChange: { name: keyof State; value: string };
        login: void;
    }
    export interface State {
        id: string;
        password: string;
    }
    export class component extends FormComponent<Event, State> {
        protected setupObservable() {
            this.observe('initialize').map(() => {
                this.next('render', { id: '', password: '' });
            });
            this.observe('handleChange').map(({ name, value }) => {
                this.next('render', { [name]: value });
            });
            this.observe('login').map(() => {
                let args = Object.assign(
                    {
                        callBackHasError: message =>
                            messagesAction.next('showMessage', message)
                    },
                    this.state
                );
                authAction.next('login', args);
            });
        }
        render() {
            return (
                <Inner
                    id={this.state.id}
                    password={this.state.password}
                    onChange={(name, value) =>
                        this.next('handleChange', { name, value })
                    }
                    onLogIn={() => this.next('login')}
                />
            );
        }
    }
}
export const LogIn = InnerScope.component;

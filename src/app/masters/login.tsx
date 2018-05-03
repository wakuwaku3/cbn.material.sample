import * as React from 'react';
import { decorate } from '../../lib/shared/style-helper';
import { authAction } from '../actions/shared/auth-action';
import { messagesAction } from '../actions/shared/messages-action';
import { Adjuster } from '../components/layout/adjuster';
import { Title } from '../components/layout/title';
import {
  AppPaper,
  AppGrid,
  AppTextField,
  AppButton,
} from '../components/material-ui/wrapper';
import { EventComponentBase } from '../../lib/bases/event-component-base';

namespace InnerScope {
  interface Style {
    root;
    paper;
    'button-container';
  }
  export const style: Style = {
    root: {
      height: '100%',
    },
    paper: {
      width: 400,
    },
    'button-container': {
      padding: [10, 0],
    },
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
          <AppGrid container={true}>
            <AppGrid item={true} xs={12}>
              <AppTextField
                label="ユーザーId"
                value={props.id}
                margin="normal"
                fullWidth={true}
                onChange={e => props.onChange('id', e.target.value)}
              />
            </AppGrid>
            <AppGrid item={true} xs={12}>
              <AppTextField
                label="パスワード"
                type="password"
                value={props.password}
                margin="normal"
                fullWidth={true}
                onChange={e => props.onChange('password', e.target.value)}
              />
            </AppGrid>
            <AppGrid item={true} xs={12}>
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
  export class component extends EventComponentBase<Event, {}, State> {
    constructor(props) {
      super(props);
    }
    protected setupObservable() {
      this.observe('initialize').subscribe(() => {
        this.setState({ id: '', password: '' });
      });
      this.observe('handleChange').subscribe(({ name, value }) => {
        const p = {};
        p[name] = value;
        this.setState(p);
      });
      this.observe('login').subscribe(() => {
        const args = Object.assign(
          {
            callBackHasError: message =>
              messagesAction.next('showMessage', message),
          },
          this.state,
        );
        authAction.next('login', args);
      });
    }
    public render() {
      return (
        <Inner
          id={this.state.id}
          password={this.state.password}
          onChange={(name, value) => this.next('handleChange', { name, value })}
          onLogIn={() => this.next('login')}
        />
      );
    }
  }
}
export const LogIn = InnerScope.component;

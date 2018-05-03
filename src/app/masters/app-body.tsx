import { decorate } from '../../lib/shared/style-helper';
import * as React from 'react';
import { AppMessages } from './app-messages';
import { AppDialog } from './app-dialog';
import { AppRouter } from './app-router';
import { LogIn } from './login';
import { getTopHeight } from './app-top';
import { getFooterHeight } from './app-footer';
import { withStore } from '../../lib/shared/react-frxp';
import { Theme } from 'material-ui';
import { authAction } from '../actions/shared/auth-action';
import { browserAction } from '../actions/shared/browser-action';

namespace InnerScope {
  const pt = 10;
  const pb = 10;
  const styles = (theme: Theme) => ({
    body: {
      paddingTop: pt,
      paddingBottom: pb,
      paddingLeft: 10,
      paddingRight: 10,
      position: 'relative',
      overflow: 'auto' as 'auto',
      height: (props: InnerProps) => {
        const top = getTopHeight(theme);
        return props.windowInnerHeight - getFooterHeight() - top;
      },
    },
  });
  interface InnerProps {
    authenticated: boolean;
    windowInnerHeight: number;
  }
  const Inner = decorate(styles)<InnerProps>(props => (
    <div className={props.classes.body}>
      <AppMessages />
      <AppDialog />
      {props.authenticated ? <AppRouter /> : <LogIn />}
    </div>
  ));
  export const component = withStore(browserAction, authAction)(() => {
    return (
      <Inner
        authenticated={authAction.store.authenticated}
        windowInnerHeight={window.innerHeight}
      />
    );
  });
}
export const AppBody = InnerScope.component;

import { withStore } from '../../lib/shared/react-frxp';
import { themeAction } from '../actions/shared/theme-action';
import * as React from 'react';
import { MaterialThemeProvider } from '../../lib/components/material-theme-provider';
import { BrowserRouter } from 'react-router-dom';
import { AppTop } from './app-top';
import { AppBody } from './app-body';
import { AppFooter } from './app-footer';

namespace InnerScope {
  export const component = withStore(themeAction)(() => {
    return (
      <MaterialThemeProvider theme={themeAction.theme}>
        <BrowserRouter>
          <div>
            <AppTop />
            <AppBody />
            <AppFooter />
          </div>
        </BrowserRouter>
      </MaterialThemeProvider>
    );
  });
}
export const AppMain = InnerScope.component;

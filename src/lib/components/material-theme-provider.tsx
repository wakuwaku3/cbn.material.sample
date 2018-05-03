import { Theme, MuiThemeProvider, CssBaseline } from 'material-ui';
import * as React from 'react';
import { JssProvider, ThemeProvider, jss } from 'react-jss';

export const MaterialThemeProvider: React.SFC<{ theme: Theme }> = props => (
  <JssProvider jss={jss}>
    <ThemeProvider theme={props.theme}>
      <MuiThemeProvider theme={props.theme}>
        <React.Fragment>
          <CssBaseline />
          {props.children}
        </React.Fragment>
      </MuiThemeProvider>
    </ThemeProvider>
  </JssProvider>
);

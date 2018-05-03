import * as React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Theme,
} from 'material-ui';
import { ExpandMoreIcon } from '../material-ui/icon-wrapper';
import { AppTypography } from '../material-ui/wrapper';
import { decorate } from '../../../lib/shared/style-helper';

namespace InnerScope {
  export interface Props {
    defaultExpanded?: boolean;
    title: string;
  }
  const styles = (theme: Theme) => ({
    root: {},
    'summary-root': {
      'min-height': 'inherit',
    },
    'summary-content': {
      margin: [8, 0],
    },
    details: {
      'flex-direction': 'column',
    },
    header: {
      background: theme.palette.secondary[theme.palette.type],
      '& p': {
        color: theme.palette.secondary.contrastText,
      },
    },
  });
  export const component = decorate(styles)<Props>(props => {
    return (
      <ExpansionPanel
        defaultExpanded={props.defaultExpanded}
        className={props.classes.root}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          className={props.classes.header}
          classes={{
            root: props.classes['summary-root'],
            content: props.classes['summary-content'],
          }}
        >
          <AppTypography>{props.title}</AppTypography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={props.classes.details} classes={{}}>
          {props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  });
  component.defaultProps = {
    defaultExpanded: true,
  };
}
export type FieldSetProps = InnerScope.Props;
export const FieldSet = InnerScope.component;

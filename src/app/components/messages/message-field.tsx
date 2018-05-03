import * as React from 'react';
import {
  getWarningColor,
  getInfoColor,
  getErrorColor,
} from '../../models/shared/color';
import { AppTypography } from '../material-ui/wrapper';
import { InfoIcon, WarningIcon, ErrorIcon } from '../material-ui/icon-wrapper';
import { Message } from '../../actions/shared/messages-action';
import { decorate } from '../../../lib/shared/style-helper';
import { Theme } from 'material-ui';

namespace InnerScope {
  interface Style {
    root;
    text;
    'info-icon';
    'warning-icon';
    'error-icon';
  }
  const style = (theme: Theme): Style => ({
    root: {},
    text: {
      'word-wrap': 'break-word;',
      overflow: 'hidden',
    },
    'info-icon': { color: getInfoColor(theme) },
    'warning-icon': { color: getWarningColor(theme) },
    'error-icon': { color: getErrorColor(theme) },
  });
  export interface Props {
    message: Message;
  }
  export const component = decorate(style)<Props>(props => {
    return (
      <div className={props.classes.root}>
        <AppTypography className={props.classes[props.message.level + '-icon']}>
          {(() => {
            switch (props.message.level) {
              case 'info':
                return <InfoIcon />;
              case 'warning':
                return <WarningIcon />;
              case 'error':
                return <ErrorIcon />;
            }
            return '';
          })()}
        </AppTypography>
        <AppTypography variant="caption" className={props.classes.text}>
          {props.message.text}
        </AppTypography>
      </div>
    );
  });
}
export const MessageField = InnerScope.component;

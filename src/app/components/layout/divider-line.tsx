import * as React from 'react';
import { Positioning, DivProps } from '../../../lib/models/types';
import { decorate } from '../../../lib/shared/style-helper';

namespace InnerScope {
  export const lineWidth = 5;
  const styles = {
    line: {
      position: 'absolute',
    },
    'line-top': {
      height: lineWidth * 2,
      cursor: 'n-resize',
      top: 0,
      right: 0,
      left: 0,
    },
    'line-right': {
      width: lineWidth * 2,
      cursor: 'e-resize',
      top: 0,
      right: 0,
      bottom: 0,
    },
    'line-bottom': {
      height: lineWidth * 2,
      cursor: 's-resize',
      right: 0,
      bottom: 0,
      left: 0,
    },
    'line-left': {
      width: lineWidth * 2,
      cursor: 'w-resize',
      top: 0,
      bottom: 0,
      left: 0,
    },
  };
  export interface Props {
    positioning: Positioning;
  }
  export const component = decorate(styles)<Props & DivProps>(props => {
    const key = `line-${props.positioning.toLowerCase()}`;
    let className = `${props.classes.line} ${props.classes[key]}`;
    if (props.className) {
      className += ' ' + props.className;
    }
    return <div {...props} className={className} />;
  });
}
export const getDividerLineWidth = () => InnerScope.lineWidth;
export type DividerLineProps = InnerScope.Props;
export const DividerLine = InnerScope.component;

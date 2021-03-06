import * as React from 'react';
import { Vertical, Horizontal, DivProps } from '../../../lib/models/types';
import { decorate } from '../../../lib/shared/style-helper';

namespace InnerScope {
  const size = 5;
  export const styles = {
    cornor: {
      position: 'absolute',
      width: size * 2,
      height: size * 2,
      'border-radius': size * 2,
      'border-style': 'solid',
      'border-width': 1,
      'border-color': '#808080',
      background: '#FFF',
      opacity: 0,
    },
    'cornor-top-right': {
      top: -size,
      right: -size,
      cursor: 'ne-resize',
    },
    'cornor-top-left': {
      top: -size,
      left: -size,
      cursor: 'nw-resize',
    },
    'cornor-bottom-right': {
      bottom: -size,
      right: -size,
      cursor: 'se-resize',
    },
    'cornor-bottom-left': {
      bottom: -size,
      left: -size,
      cursor: 'sw-resize',
    },
  };
  export interface Props {
    vertical: Vertical;
    horizontal: Horizontal;
  }
  export const component = decorate(styles)<Props & DivProps>(props => {
    const key = `cornor-${props.vertical.toLowerCase()}-${props.horizontal.toLowerCase()}`;
    let className = `${props.classes.cornor} ${props.classes[key]}`;
    if (props.className) {
      className += ' ' + props.className;
    }
    return <div {...props} className={className} />;
  });
}
export type CornorProps = InnerScope.Props;
export const Cornor = InnerScope.component;

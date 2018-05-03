import injectSheet from 'react-jss';
import { StyleFactory, StyledComponentType } from '../models/types';

export const decorate = <T extends object>(style: T | StyleFactory<T>) => <
  Props = {}
>(
  component: StyledComponentType<T, Props>,
): React.ComponentType<Props> => injectSheet(style)(component);
export const mergeClassNeme = (
  props: { className?: string },
  ...classNames: string[]
) => {
  if (props && props.className) {
    return Object.assign({}, props, {
      className: [props.className, ...classNames].filter(x => x).join(' '),
    });
  }
  return {
    className: [...classNames].filter(x => x).join(' '),
  };
};
export const mergeClasses = <Style>(
  ...classesList: Array<Partial<Record<keyof Style, string>>>
) => {
  const copy = {} as Record<keyof Style, string>;
  classesList.filter(c => c).forEach(c => {
    Object.keys(c)
      .filter(key => c[key])
      .forEach(key => {
        if (copy[key]) {
          copy[key] += ' ' + c[key];
        } else {
          copy[key] = c[key];
        }
      });
  });
  return copy;
};

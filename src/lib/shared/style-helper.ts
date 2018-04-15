import injectSheet from 'react-jss';
import { StyleFactory } from '../models/types';
import { RenderObservable } from './react-frxp';

export type StyledProps<Style> = { classes: Record<keyof Style, string> };
export const decorate = <T extends object>(style: T | StyleFactory<T>) => <
    Props = {}
>(
    component: React.ComponentType<Props & StyledProps<T>>
): React.ComponentType<Props> => injectSheet(style)(component);
export const mergeClassNeme = (
    props: { className?: string },
    ...classNames: string[]
) => {
    if (props && props.className) {
        return Object.assign({}, props, {
            className: [props.className, ...classNames].filter(x => x).join(' ')
        });
    }
    return {
        className: [...classNames].filter(x => x).join(' ')
    };
};
export const mergeClasses = <Style>(
    ...classesList: Partial<Record<keyof Style, string>>[]
) => {
    let copy = {} as Record<keyof Style, string>;
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

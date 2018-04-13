import { Color as MuiColor, Theme } from 'material-ui';
import * as colors from 'material-ui/colors';
import { indigo, yellow, red } from 'material-ui/colors';
export enum Color {
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    grey,
    blueGrey
}
export const getColors = () => {
    return Object.keys(Color)
        .map(key => {
            let name = Color[key];
            let color = convertInner(name);
            return { key, name, color };
        })
        .filter(x => x.color);
};

const convertInner = (color: Color): MuiColor => {
    return colors[color.toString()];
};
export const convertToMuiColor = (color: Color): MuiColor => {
    let mui = convertInner(color);
    if (mui) {
        return mui;
    }
    return convertInner(Color[color.toString()]);
};
export const getInfoColor = (theme: Theme) => {
    return theme.palette.type === 'light' ? indigo['700'] : indigo['300'];
};
export const getWarningColor = (theme: Theme) => {
    return theme.palette.type === 'light' ? yellow['800'] : yellow['500'];
};
export const getErrorColor = (theme: Theme) => {
    return theme.palette.type === 'light' ? red['700'] : red['500'];
};

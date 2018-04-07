import { Color as MuiColor } from 'material-ui';
import * as colors from 'material-ui/colors';
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
            let color = convertToMuiColor(name);
            return { key, name, color };
        })
        .filter(x => x.color);
};
export const convertToMuiColor = (color: Color): MuiColor => {
    return colors[color.toString()];
};

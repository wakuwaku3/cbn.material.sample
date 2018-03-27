import jss from 'jss';
import preset from 'jss-preset-default';
export namespace AppStyleHelper {
    let isSetuped = false;
    export function attachStyles<T>(
        styles: T
    ): { [K in keyof T]: string } & { [key: string]: string } {
        if (!isSetuped) {
            jss.setup(preset());
        }
        let styleSheets = jss.createStyleSheet(styles).attach();
        return styleSheets.classes;
    }
}

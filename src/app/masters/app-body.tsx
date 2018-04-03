import * as React from 'react';
import { Cbn } from '../../lib/shared/cbn';
import { AppRouter } from './app-router';
import { AppFotter } from './app-footer';
import { App } from '../shared/app';

export namespace AppBody {
    interface Event extends Cbn.Event {
        resize: void;
    }
    const createStyles = () => {
        let styles = {
            body: {
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
                overflow: 'auto'
            }
        };
        styles.body['height'] = Cbn.Observable.fromEvent(
            Cbn.Window.emitter,
            'resize'
        ).map(
            () =>
                window.innerHeight -
                AppFotter.styles.footer.height -
                App.getTheme().appBar.height -
                styles.body.paddingTop -
                styles.body.paddingBottom
        );
        return styles;
    };
    const styles = createStyles();
    const classes = Cbn.Jss.attachStyles(styles);
    export const component: React.SFC = () => {
        Cbn.Window.emitter.emit('resize');
        return (
            <div className={classes.body}>
                <AppRouter.component />
            </div>
        );
    };
}

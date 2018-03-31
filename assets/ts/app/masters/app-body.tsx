import * as React from 'react';
import { Cbn } from '../../lib/shared/cbn';
import { AppRouter } from './app-router';
import { AppFotter } from './app-footer';
import { App } from '../shared/app';

export namespace AppBody {
    interface Event extends Cbn.Event {
        resize: void;
    }
    const emitter = new Cbn.EventEmitter<Event>();
    const padding = 10;
    const styles = {
        body: {
            paddingTop: padding,
            paddingBottom: padding,
            paddingLeft: padding,
            paddingRight: padding,
            height: Cbn.Observable.fromEvent(emitter, 'resize').map(
                () =>
                    window.innerHeight -
                    AppFotter.styles.footer.height -
                    App.theme.appBar.height -
                    padding * 2
            )
        }
    };
    window.addEventListener('resize', () => {
        emitter.emit('resize');
    });
    const classes = Cbn.Jss.attachStyles(styles);
    export const component: React.SFC = () => {
        emitter.emit('resize');
        return (
            <div className={classes.body}>
                <AppRouter.component />
            </div>
        );
    };
}

import * as React from 'react';
import { MouseEvent } from 'react';
import { App } from '../shared/app';
import { Cbn } from '../../lib/shared/cbn';

export namespace Test {
    export interface Model {
        name: string;
        count: number;
    }
    export interface Event extends Cbn.Event {
        onClick: MouseEvent<HTMLButtonElement>;
    }
    class Action extends Cbn.ComponentAction<Model, Event> {
        onClick(e: MouseEvent<HTMLButtonElement>) {
            this.model.count += 1;
            this.emitter.emit('reflesh');
            this.emitter.emit('onClick', e);
        }
    }
    export const component: Cbn.React.SFC<Model, Event> = props => {
        const action = new Action(props);
        return (
            <div>
                <h2>{action.model.name}</h2>
                <div>{action.model.count}</div>
                <button onClick={e => action.onClick(e)}>Add +1</button>
            </div>
        );
    };
}

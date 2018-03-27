import * as React from 'react';
import { MouseEvent } from 'react';

export namespace TestComponent {
    export interface Props {
        name: string;
        count: number;
        onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    }
    export const Component: React.SFC<Props> = props => {
        return (
            <div>
                <h2>{props.name}</h2>
                <div>{props.count}</div>
                <button onClick={props.onClick}>Add +1</button>
            </div>
        );
    };
}

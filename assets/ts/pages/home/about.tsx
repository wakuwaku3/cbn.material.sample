import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AppState } from "../../shared/app-factory";


export class HomeAboutService {
    public getInitialState(): HomeAbout.State {
        return { counter: 0 };
    }

    public addCounter(oldState: HomeAbout.State, payload: number): HomeAbout.State {
        let newState = Object.assign({}, oldState);
        newState.counter += payload;
        return newState;
    }
}

export namespace HomeAbout {
    export interface State extends DispatchProp<any> {
        counter: number;
    }
    const initialState: State = {
        counter: 0,
    }

    namespace actionCreator {
        const factory = actionCreatorFactory();
        export const addCounter = factory<number>('addCounter');
    }

    const service = new HomeAboutService();
    export const Reducer = reducerWithInitialState(service.getInitialState())
        .case(actionCreator.addCounter, service.addCounter);

    class Component extends React.Component<State> {
        render() {
            return (
                <div>
                    <h1>About</h1>
                    <p>現在の数値：{this.props.counter}</p>
                    <button onClick={() => { this.props.dispatch(actionCreator.addCounter(1)) }} >加算</button>
                </div>
            );
        }
    }
    export const Page = connect((state: AppState) => Object.assign({}, state.HomeAboutReducer))(Component);
}

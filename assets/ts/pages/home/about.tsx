import * as React from "react";
import { connect, DispatchProp, Dispatch } from "react-redux";
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { AppState } from "../../shared/app-factory";

export class HomeAboutService {
    async getInitializeAsync(): Promise<string> {
        let res = await fetch('/test/get');
        let text = await res.text();
        return text;
    }
    async getStepAsync(): Promise<number> {
        let res = await fetch('/test/getStep');
        let json = await res.json();
        return json;
    }
}

export namespace HomeAboutActionCreator {
    const factory = actionCreatorFactory();
    export const initialize = factory<string>('initialize');
    export const addCounter = factory<number>('addCounter');
}

export namespace HomeAboutReducerService {
    export const initializeState: HomeAbout.State = {
        counter: 0,
        header: '',
    };
    export function initialize(oldState: HomeAbout.State, payload: string): HomeAbout.State {
        let newState = Object.assign({}, oldState);
        newState.header = payload;
        return newState;
    }
    export function addCounter(oldState: HomeAbout.State, payload: number): HomeAbout.State {
        let newState = Object.assign({}, oldState);
        newState.counter += payload;
        return newState;
    }
}

export namespace HomeAboutContainer {
    const service = new HomeAboutService();
    export function mapDispatchToProps(dispatch: Dispatch<void>) {
        service.getInitializeAsync()
            .then(res => {
                return dispatch(HomeAboutActionCreator.initialize(res));
            });
        return {
            addCounter: async (v: number) => {
                let res = await service.getStepAsync();
                return dispatch(HomeAboutActionCreator.addCounter(res + v));
            },
        };
    }

    export function mapStateToProps(appState: AppState) {
        return Object.assign({}, appState.HomeAboutReducer);
    }
}

export namespace HomeAbout {
    export interface State {
        counter: number;
        header: string;
    }
    export interface Actions {
        addCounter: (v: number) => Promise<Action<number>>;
    }
    export interface Props extends State, Actions { }

    export const Reducer = reducerWithInitialState(HomeAboutReducerService.initializeState)
        .case(HomeAboutActionCreator.initialize, (oldState: HomeAbout.State, payload: string) => HomeAboutReducerService.initialize(oldState, payload))
        .case(HomeAboutActionCreator.addCounter, (oldState: HomeAbout.State, payload: number) => HomeAboutReducerService.addCounter(oldState, payload));

    const Component: React.SFC<Props> = (props: Props) => {
        return (
            <div>
                <h1>About</h1>
                <h3>{props.header}</h3>
                <p>現在の数値：{props.counter}</p>
                <button onClick={() => { props.addCounter(1) }} >加算</button>
            </div>
        );
    }
    function createPage() {
        return connect((appState: AppState) => HomeAboutContainer.mapStateToProps(appState), x => HomeAboutContainer.mapDispatchToProps(x))(Component);
    }
    export const Page = createPage();
}

import * as React from 'react';
import { combineReducers, createStore } from "redux";
import { HomeAbout } from "../pages/home/about";
import { Provider } from 'react-redux'
import { App } from './app';

export interface AppState {
  HomeAboutReducer: HomeAbout.State,
}
export namespace appFactory {
  function createAppStore() {
    let reducers = createAppReducers();
    return createStore(reducers);
  }

  function createAppReducers() {
    return combineReducers<AppState>({ HomeAboutReducer: HomeAbout.Reducer });
  }

  export function createApp() {
    let store = createAppStore();
    return (
      <Provider store={store} >
        <App />
      </Provider>
    );
  }
}

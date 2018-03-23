import * as React from 'react';
import { HomeAboutPage } from '../pages/home/about';
import { App } from './app';
import { connect, createStore } from 'undux';

export namespace AppFactory {
    export function createApp() {
        return <App />;
    }
}

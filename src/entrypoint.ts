import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppMain } from './app/masters/app-main';

namespace EntryPoint {
    export const render = () => {
        const rootComponent = React.createElement(AppMain.component);
        const target = document.getElementById('app');
        ReactDOM.render(rootComponent, target);
    };
    render();
}

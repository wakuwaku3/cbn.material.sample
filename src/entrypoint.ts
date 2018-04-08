import 'babel-polyfill';
import 'babel-plugin-transform-object-assign';
import 'whatwg-fetch';
import 'typeface-roboto'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppMain } from './app/masters/app-main';

namespace EntryPoint {
    export const render = () => {
        const rootComponent = React.createElement(AppMain);
        const target = document.getElementById('app');
        ReactDOM.render(rootComponent, target);
    };
    render();
}

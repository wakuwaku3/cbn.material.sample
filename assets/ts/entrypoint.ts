import 'babel-polyfill';
import 'bootstrap';
import '../scss/entrypoint.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './shared/components/app';

namespace EntryPoint {
    export function render() {
        const rootComponent = React.createElement(App.Component);
        const target = document.getElementById('app');
        ReactDOM.render(rootComponent, target);
    }
    render();
}

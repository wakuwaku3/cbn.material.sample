import 'bootstrap';
import * as $ from 'jquery';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { App } from './shared/app';

$(() => {
    ReactDOM.render(React.createElement(App), document.getElementById('app'));
});

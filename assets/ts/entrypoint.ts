import 'babel-polyfill';
import 'bootstrap';
import '../scss/entrypoint.scss';
import * as $ from 'jquery';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AppFactory } from './shared/app-factory';

let component = AppFactory.createApp();
$(() => {
    ReactDOM.render(component, document.getElementById('app'));
});

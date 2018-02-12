import 'bootstrap';
import * as $ from 'jquery';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { appFactory } from './shared/app-factory';

let component = appFactory.createApp();
$(() => {
    ReactDOM.render(component, document.getElementById('app'));
});

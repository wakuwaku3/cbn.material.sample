import { BrowserRouter, Link } from 'react-router-dom';
import { Route } from 'react-router';
import { AppRouter } from './app-router';
import { TopNav } from './top-nav';
import { Component } from 'react';
import * as React from 'react';

export class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <TopNav />
                    <div className="container body-content">
                        <AppRouter />
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <span className="text-muted">&copy; 2018 - cbn.es2017.sample</span>
                        </div>
                    </footer>
                </div>
            </BrowserRouter>
        );
    }
}

import { Component } from "react";
import * as React from "react";
import { SubComponent } from "../../components/sub-component";

export class HomeIndex extends Component {

    render() {
        return (
            <div>
                <h1>Home</h1>
                <SubComponent name="My Counter for TypeScript" />
            </div>
        );
    }

}
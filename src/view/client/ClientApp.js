import React, {Component} from 'react';
import CliHeader from "./CliHeader";
import CliMain from "./CliMain";
import CliFooter from "./CliFooter";

export default class ClientApp extends Component {


    render() {
        return (
            <div>
                <CliHeader />
                <CliMain />
                <CliFooter user = {this.props.user}/>
            </div>
        );
    }
}

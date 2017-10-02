import React, { Component } from 'react';
import EmpHeader from './EmpHeader';
import EmpMain from './EmpMain';

export default class EmployeeApp extends Component {
    render() {
        return (
            <div>
                <EmpHeader/>
                <EmpMain/>
            </div>
        );
    }
}

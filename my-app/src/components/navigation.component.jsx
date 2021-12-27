import React, { Component } from "react";
import *  as ReactBoostrap from 'react-bootstrap';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactBoostrap.Navbar collapseOnSelect expand="lg" variant="light" style = {{
                backgroundColor: 'grey',
                height: '70px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '30px'
            }}>
                <ReactBoostrap.Container>
                    <ReactBoostrap.Navbar.Brand style = {{marginRight: '50px', fontSize: '23px', color: 'white', fontWeight: 'bold'}}>Capscoin</ReactBoostrap.Navbar.Brand>
                </ReactBoostrap.Container>
            </ReactBoostrap.Navbar>
        );
    }
}

export default NavigationBar;
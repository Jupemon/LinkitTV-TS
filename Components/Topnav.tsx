import React, { Component } from 'react';
import Link from 'next/link';

class TopNav extends Component { // Renders the top navigation bar
    state = {  }
    render() { 
        return ( 
        <div className="Topnav" >
            <h1 style={{marginTop:"0px"}}>Linkit TV</h1>
        </div> );
    }
}
 
export default TopNav;
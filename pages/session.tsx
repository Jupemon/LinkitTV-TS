import Link from 'next/link'
import Session from '../Components/ActiveSession'
import { Component } from 'react';
import CreateSession from '../Components/CreateSession'
import TopNav from '../Components/TopNav'



export default class extends Component { // Shows create session page if one has not been created
  state={
    sessionCreated : false,
    sessionName : ""
  }

  render() {
    return (
     
    <div>
      <TopNav /> 
      <div className="PurpleBox"><h1>Create new session</h1></div>
        {this.state.sessionCreated ? 
          <Session sessionName={this.state.sessionName}/>
        :
        <div>
          <CreateSession sessionCreated={this.sessionCreated}/>
        </div>
        }
      </div>)
  }
}
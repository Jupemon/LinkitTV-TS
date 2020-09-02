import Link from 'next/link'
import ActiveSession from '../Components/ActiveSession'
import { Component } from 'react';
import CreateSession from '../Components/CreateSession'
import TopNav from '../Components/Topnav'



class Session extends Component { // Shows create session page if one has not been created
  state={
    sessionCreated : false,
    sessionName : ""
  }

  sessionCreated = (name) => {
    this.setState({sessionCreated : true, sessionName : name})
  }

  render() {
    return (<div>

      <TopNav /> 
      {this.state.sessionCreated ? <ActiveSession/> : <CreateSession sessionCreated={this.sessionCreated}/>}
        
    </div>)
  }
}

export default Session;
// Allows user to create the watching session on the server

import { Component } from 'react';



class CreateSession extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            errorMessage : "",
            loading : false
         }
    }


    creationFailed = (error) => { // session creation unsuccessfull in the server
        this.setState({errorMessage : error})
    }

    creationSuccess = () => { // called after session was succesfully created in the server
        this.props.sessionCreated(name)
    }


    sendPostRequest = (sessionName) => { // send the post request to the server
        this.setState({loading : true})
        fetch('/createsession', {
            method:"POST",
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : name,
            })
        }).then(d => {

            this.setState({loading : false})

            if (d.status === 201) {
                
            }

            if (d.status === 409) {
                this.creationFailed("Session name is already taken")
            }
            else {
                this.creationFailed("Something went wrong")
            }
        })
    }
    

    createSession = () => { // called by create session button
        const sessionName = this.refs.input.value;
        console.log(sessionName)
        if (sessionName.length <= 0) {
            this.setState({errorMessage : "Enter a name"})
        }
        else {
            this.sendPostRequest(sessionName) // Sends fetch request creating a new session
        }
        
    }


    render() { 
        return ( 
        <div className="PurpleBox">
            <p style={{color : "red"}}>{this.state.errorMessage}</p>
            <p>Session Name :</p>
            <input disabled={this.state.loading} ref="input" type="text"/>
            {this.state.loading ?
                <p>Loading...</p>
                :
                <div onClick={() => {this.createSession()}} className="PurpleBox-btn">Create Session</div>
            }
            
            <div>
                
            </div>
        </div> );
    }
}
 
export default CreateSession;
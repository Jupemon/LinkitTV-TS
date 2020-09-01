// Allows user to create the watching session on the server

import { Component } from 'react';
import { timingSafeEqual } from 'crypto';
import { error } from 'console';

 
interface State {
    errorMessage : string,
    loading : boolean
}


class CreateSession extends Component<State> {

        state = { 
            errorMessage : "",
            loading : false
         }



    creationFailed = (error) => { // session creation unsuccessfull in the server
        this.setState({errorMessage : error})
    }

    creationSuccess = () => { // called after session was succesfully created in the server

    }

    sendPostRequest = async (sessionName: string)  => { // send the post request to the server
        this.setState({loading : true})
        return fetch('/createsession', {
            method:"POST",
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : name,
            })
        }).then(d => {
            this.setState({loading : false})

            if (d.status === 200) {
                //this.props.sessionCreated(sessionName)
                return true
            }

            else if (d.status === 409) {
                //this.creationFailed("Session name is already taken")
                return false
            }
            else {
                //this.creationFailed("Something went wrong")
                throw console.error("not work no")
            }
        })
    }
    

    createSession =  async function() { // called by create session button
        let sessionName : string = this.refs.input.value;
        console.log(sessionName)
        if (sessionName.length <= 0) {
            this.setState({errorMessage : "Enter a name"})
        }
        else {
            await this.sendPostRequest(sessionName)
            console.log("i should work yet")
        }
        
    }

    render() { 
        const loading = this.state.loading;
        return ( 
        <div>

            <div className="PurpleBox">
                <h1>Create new session</h1>
            </div>

            <div className="PurpleBox">
                <p style={{color : "red"}}>{this.state.errorMessage}</p>
                <p>Session Name :</p>
                <input disabled={loading} ref="input" type="text"/>
                {loading ?
                    <p>Loading...</p>
                    :
                    <p onClick={() => {this.createSession()}} className="PurpleBox-btn">Create Session</p>
                }
                
            </div> 
        </div>
        );
    }
}
 
export default CreateSession;
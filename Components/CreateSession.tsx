import { Component } from 'react';


interface Props {
    sessionCreated : boolean /////////////////////3535
}

interface State {
    errorMessage : string,
    loading : boolean,

}


class CreateSession extends Component<Props, State> {

    constructor(props) {
        super(props)
        this.state = { 
            errorMessage : "",
            loading : false
        }
    
     }


    showError = (error : string) => { // Show error message
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
                name : sessionName,
            })
        }).then(d => {
            this.setState({loading : false})

            if (d.status === 201) {
                return sessionName
            }

            else if (d.status === 409) {
                throw "Name already exists"

            }
            
            else {
                throw "Something went wrong"
            }

        })
    }
    

    createSession =  function() { // called by create session button
        let sessionName : string = this.refs.input.value;
        console.log(sessionName)
        if (sessionName.length <= 0) {
            this.setState({errorMessage : "Enter a name"})
        }
        else {
            this.sendPostRequest(sessionName)
            .then(d => this.props.sessionCreated)
            .catch((e) => this.showError(e))
        }
        
    }

    render() { 
        const loading: boolean = this.state.loading;
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
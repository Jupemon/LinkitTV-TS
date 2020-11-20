import { Component } from 'react';


interface Props {
    sessionCreated : (sessionName : string) => void // 
}

interface State {
    errorMessage : string, // shown to user in case of failure
    loading : boolean,
    sessionName : string // User input

}


class CreateSession extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = { 
            sessionName : "",
            errorMessage : "",
            loading : false
        }
    
     }


    showError = (error : string) => { // Show error message
        this.setState({errorMessage : error})
    }

    sendPostRequest = async (sessionName: string)  => { // Create session on the server
        this.setState({loading : true})
        return fetch('/createsession', {
            method:"POST",
            headers : {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : sessionName
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
    

    createSession =  (): void =>  { // called by create session button
        
        let sessionName : string = this.state.sessionName;

        if (sessionName.length <= 0) {
            this.setState({errorMessage : "Enter a name"})
        }
        else {
            this.sendPostRequest(sessionName)
            .then(d => this.props.sessionCreated(d)) // Session successfully created
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
                <input disabled={loading} value={this.state.sessionName} onChange={(e) => {this.setState({ sessionName: e.currentTarget.value })}} type="text"/>
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

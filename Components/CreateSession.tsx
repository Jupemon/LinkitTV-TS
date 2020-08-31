// Allows user to create watching session

import { Component } from 'react';

function fetcher(url) { // used for fetching
    return fetch(url).then(r => r.json());
  }

const buttonStyle = {
    color : "white",
}

const divStyle ={
    backgroundColor : "purple",
    margin : "0 auto",
    width : "50%",
    padding : "80px",
    textAlign : "center",
    marginBottom : "50px",

    borderRadius : "20px",
    boxShadow : "rgba(0,0,0,0.8) 0 0 10px"
}

const h1Style = {
    
}


class CreateSession extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            errorMessage : "",
            loading : false
         }
    }

    fetcher = url => {
        return fetch(url).then(r => r.json());
    }

    createTheSession = () => {
        const name = document.querySelector('input').value.toLowerCase()
        fetch(`/api/test?name=${name}`).then(r => {
            if (r.status === 200) {
                console.log("everything went well")
            }
            else if (r.status === 404) {
                console.log("not found")
            }
            else {
                console.log(r.status)
                console.log("something horrible went wrong")
            }
        })
        //const {data, error} = this.fetcher(`/api/test?${"name"}`)

    }

    sendRequest = () => {
        const name = document.querySelector('input').value.toLowerCase()
        if (name.length > 0) {

            fetch('/createsession', {
                method:"POST",
                headers : {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name : name,
                })
            }).then(d => {
                if (d.status === 200) {
                    d.json()
                    this.props.sessionCreated(name)
                }
                else {
                    this.setState({errorMessage : "Session name is already taken"})
                }
            })
        }
        else {
            this.setState({errorMessage : "Please enter a session name"})
        }

    }
    render() { 

        return ( 
        <div className="PurpleBox">
            <p>Session Name :</p>
            <input type="text"/>
            <div className="PurpleBox-btn">Create Session</div>
            <div>
                
            </div>
        </div> );
    }
}
 
export default CreateSession;
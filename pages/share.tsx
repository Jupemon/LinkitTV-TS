import { useRouter } from 'next/router'
import React, { Component, Props } from 'react'
import TopNav from '../Components/Topnav'



interface State {
  loading : boolean,
  videoUrl : string,
  videoName : string
}



export default class extends Component<State>{
  
  // get props passed by custom nextJS server
  static async getInitialProps ({ query: { id } }) {
    return { postId: id }
  }

  state = {
    infoMessage : "",
    loading : false,
    videoUrl : "",
    videoName : ""
  }


  clearInput = () : void =>  { // Clears the user input
    this.setState({ videoName : "", videoUrl : "" })
    this.showMessage("Video sent")
  }


  showMessage = (infoMessage: string): void => { // Show the given info message to user
    this.setState({ infoMessage })
  }


  sendRequest =  async ( requestData : object ) => { // sends the user input to server
    this.setState({ loading : true })
    return await fetch(`/suggestvideo`,
    {
      method:"POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }
    ).then(d => {
      if (d.status === 200) {
        return "Video sent"
      }

      else if (d.status === 404) {
        throw "Session doesn't exist"
      }

      else if (d.status === 400) {
        throw "Something went wrong"
      }
    })
  }


/*.then(d => d.json()).then(d => {
      console.log("this was received :", d)
      return true
    }) */


  validateYoutubeUrl = (Url : string): boolean => { // validate Youtube URL link

    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match: any = Url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];

    } 

    else {
      return false
    }

  }

  validateInput = (videoUrl : string, videoName : string): boolean => { // Validate user input

    if (videoUrl.length > 0 && videoName.length > 0 && this.validateYoutubeUrl(videoUrl)) {
      return true
    }

    else {
      return false
    }

  }

  handleClick = () => { // Called after user clicks share video button
    const { videoUrl, videoName } = this.state
    const { postId } = this.props
    if (this.validateInput(videoUrl, videoName)) {

      const requestData : object = { // create data which is sent to server 
        videoName,
        videoUrl,
        postId
      }

      this.sendRequest(requestData) // send data
      .then(d => {this.showMessage(d)})
      .catch(e => {this.showMessage(e)}) 
    }
    
    else {
      this.showMessage('Invalid input')
    }
  }

  render() {
    return (
      <div>
        <TopNav />

        <div className="PurpleBox">
          <h1>Share videos with {this.props.postId}</h1>
        </div>

        <div className="PurpleBox">
          <div>
            Video name : <input value={this.state.videoName} onChange={(e) => {this.setState({videoName : e.target.value})}} placeholder="name" type="text"/>
          </div>
          <div>
            Video URL : <input value={this.state.videoUrl} onChange={(e) => {this.setState({videoUrl : e.target.value})}} placeholder="watch?v=8zH2JP4LgaE" type="text"/>
          </div>
          <p>{this.state.infoMessage}</p>
          <p onClick={() => this.handleClick()} className="PurpleBox-btn">Share Video</p>
        </div>
      </div>
    )
  }
}

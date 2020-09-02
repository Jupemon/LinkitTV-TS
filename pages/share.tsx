import { useRouter } from 'next/router'
import React, { Component, Props } from 'react'
import TopNav from '../Components/Topnav'



interface State {
  suggestionSent : boolean,
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


  clearInput = () =>  { // clears user input after successfully sent data
    this.setState({videoName : "", videoUrl : "", loading : false, infoMessage : "Video Sent"})
  }


  sendRequest = ( requestData : object ): void => { // sends the user input to server
    this.setState({ loading : true })
    fetch(`/suggestvideo`,
    {
      method:"POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    }
    ).then(d => d.json()).then(d => {
      console.log("this was received :", d)
      this.setState({suggestionSent : true})
    })
  }

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

  validateInput = (videoUrl : string, videoName : string): boolean => { // Validate input data

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

      const requestData : object = { // data sent to server 
        videoName,
        videoUrl,
        postId
      }
      this.sendRequest(requestData)
    }
    else {
      this.clearInput()
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
            Video name : <input value={this.state.videoName} onChange={(e) => {this.setState({videoName : e.target.value})}} placeholder="name here" type="text"/>
          </div>
          <div>
            Youtube Video URL : <input value={this.state.videoUrl} onChange={(e) => {this.setState({videoUrl : e.target.value})}} placeholder="www.youtube.com/watch?v=l6TgVsgTW7I" type="text"/>
          </div>
          <p>{this.state.infoMessage}</p>
          <p onClick={() => this.handleClick()} className="PurpleBox-btn">Share Video</p>
        </div>
      </div>
    )
  }
}

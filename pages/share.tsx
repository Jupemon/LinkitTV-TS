import React, { Component } from 'react'
import TopNav from '../Components/TopNav';


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



export default class extends Component {
  static getInitialProps({ query: { id } }) {
    return { postId: id }
  }
  constructor(props) {
    super(props);
    this.state = {
      suggestionSent : false,
      loading : false,
      videoUrl : "",
      videoName : ""
    }
  }

setVideoName = (name) => { // called on input change
  this.setState({suggestionSent : false})
  if (name.length > 0 && name.length < 18) {
    this.setState({videoName : name})
  }
  else {
    this.setState({videoName : ""})
  }
}

setUrl = (url) => { // called on input change
  this.setState({suggestionSent : false})
  const validation = this.getYoutubeVideoId(url)
  
  console.log(validation)
  if(validation) {
    this.setState({videoUrl : validation})
  }
  else {
    this.setState({videoUrl : ""})
  }
}

getYoutubeVideoId = (ytlink) => { //checks if video is valid, returns the video id
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = ytlink.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return false
  }
}

  sendSuggestion = (videoUrl, videoName) => { // sends the video suggestion to server
    this.setState({ loading : true })
    fetch(`/suggestvideo`,
    {
      method:"POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoName : this.state.videoName,
        videoUrl : this.state.videoUrl,
        postId : this.props.postId
      })
    }
    ).then(d => d.json()).then(d => {
      console.log("data gotten here it is :", d)
      this.setState({loading : false, suggestionSent : true})
  })
  console.log(this.state)
  }

  validateForm = () => { // called when button is pressed, makes sure everything is valid before sending data
    if (this.state.videoName && this.state.videoUrl && !this.state.suggestionSent) {
      document.querySelectorAll("input")[0].value = "";
      document.querySelectorAll("input")[1].value = ""
      this.sendSuggestion();
    }
  }

  render() {
    const videoName = this.state.videoname
    return (
      <div>
        <TopNav />
        <div className="PurpleBox"><h1>Share videos with {"john"}</h1></div>

        <div className="PurpleBox">
          <div>
            Video name : <input type="text"/>
          </div>
          <div>
            Video URL : <input type="text"/>
          </div>
        </div>
      </div>
    )
  }
}

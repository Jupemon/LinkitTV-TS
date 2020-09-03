import PropTypes from 'prop-types';
import React from 'react';
import VideoQueue from './VideoQueue';

interface Playlist { // List of all the videos which can be clicked & played
  videoUrl : string
  videoName : string
}

interface State {

  playlistIndex : number // Index of the playing playlist video
  playlist : Array<Playlist>  // Current youtube playlist

}

interface Props { 
  sessionName : string // used to receive socketIO messages
}


class YouTubeplayer extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props)

    this.state = {
      playlistIndex : 0,
      playlist : []
    }
  
  }




  componentDidMount = () => {
    this.loadYoutubePlayer()
    
  };


  loadPlaylist = (playlist: string[], index: number): void => { // Loads the provided youtube playlist
    this.player.loadPlaylist(playlist, index);
  }

  updatePlaylist = (videoList, playlistIndex: number): void => { // called by videoqueue when selecting a video, updates the youtube playlist
    const playlist : string[] = videoList.map(i => i.videoUrl)
    this.setState({ playlist, playlistIndex })
    this.loadPlaylist(playlist, playlistIndex)
  }


  loadYoutubePlayer = () => { // loads the required scripts for youtube player
    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    

    /*
    const tag = document.createElement('script');
    console.log("loading player")
    tag.src = 'https://www.youtube.com/iframe_api';

    
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = this.loadVideo;*/
  }

  loadVideo = () => { // loads the video once player is ready
    this.player = new window.YT.Player("youtube-player", {
      videoId: "B1lNhNHdoPI",
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      },
    });
    //this.setState({videoIndex : this.state.videoIndex ++})
  };


  onPlayerReady = event => {

    // Position the video player
    document.querySelector("iframe").style.position = "absolute";
    document.querySelector("iframe").style.height = "90%"
    document.querySelector("iframe").style.width = "90%"
    document.querySelector("iframe").style.bottom = "0"
    document.querySelector("iframe").style.right = "0"

  };

  onPlayerStateChange = event => { // Called every time user interacts with the player and automatically by youtube
  

    if (event.data === 0) { // VIDEO ENDED
      const {playlist, playlistIndex} = this.state
    }

    if (event.data === -1 ) { // PLAYER ENDED
      /*
      let videoIndex: number = this.state.videoIndex;
      
      var index = event.target.getPlaylistIndex();
      const playlist = this.state.videoList.map(v => {
        return v.videoUrl
      })
      if(event.target.getPlaylist().length != playlist.length) { // if the current playlist doesnt match the state playlist
        event.target.loadPlaylist(playlist, videoIndex + 1);      
      }

      this.setState({videoIndex : event.target.getPlaylistIndex()})*/
    }
  }

  selectVideo = v => { // called when clicking a video on video queue
    const videoIndex = this.state.videoList.indexOf(v)
    const playlist = this.state.videoList.map(i => {
      return i.videoUrl
    })
    this.setState({videoIndex})
    this.player.loadPlaylist(playlist, videoIndex);
  }
  loadNextVideo = v => {

  }

  render = () => {

    return (<div>
        {/*<div id={"youtube-player"}/>*/}
        <iframe id="existing-iframe-example"
        width="640" height="360"
        src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"
        ></iframe>
        <VideoQueue sessionName={this.props.sessionName} updatePlaylist={this.updatePlaylist}/>
        </div>); 
  };
}

export default YouTubeplayer;
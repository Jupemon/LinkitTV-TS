import PropTypes from 'prop-types';
import React from 'react';
import VideoQueue from './VideoQueue';



interface State {

  playlistIndex : number // Index of the playing playlist video
  playList : object[]  // Current youtube playlist

}



class YouTubeplayer extends React.Component<State> {

  state={
            playlistIndex : 0,
            playlist : []
        }


  componentDidMount = () => {
    this.loadYoutubePlayer()
    
  };


  loadPlaylist = (playlist: string[], index: number): void => { // Loads the provided youtube playlist
    this.player.loadPlaylist(playlist, index);
  }

  updatePlaylist = (videoList: object[], playlistIndex: number): void => { // called by videoqueue when selecting a video, updates the youtube playlist
    const playlist : string[] = videoList.map(i => i.videoUrl)
    this.setState({ playlist, playlistIndex })
    this.loadPlaylist(playlist, playlistIndex + 1)
  }


  loadYoutubePlayer = () => { // loads the required scripts for youtube player
    const tag = document.createElement('script');
    console.log("loading player")
    tag.src = 'https://www.youtube.com/iframe_api';

    
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = this.loadVideo;
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
        <div id={"youtube-player"}/>
        <VideoQueue updatePlaylist={this.updatePlaylist}/>
        </div>); 
  };
}

export default YouTubeplayer;
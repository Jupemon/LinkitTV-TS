import PropTypes from 'prop-types';
import React from 'react'
import VideoQueue, { Video } from './VideoQueue'


declare global { // tell window that embedded Youtube player is not a fairytail, it really exists
  interface Window { onYouTubeIframeAPIReady: any, YT : any }
}

interface State { // Both values are passed to embedded player

  playlistIndex : number // Currently playing video
  playlist : string[] // Current youtube playlist

}

interface Props { 
  sessionName : string // used as an identifier to receive socketIO messages
}


class YouTubeplayer extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props)
    this.state = {
      playlistIndex : 0,
      playlist : []
    }
    
  }
  

  loadPlaylist = (playlist: string[], index: number): void => { // Loads the provided youtube playlist
    this.player.loadPlaylist(playlist, index);
  }

  updatePlaylist = (videoList: Array<Video>, playlistIndex: number): void => { // called by videoqueue when clicking a video, updates the youtube playlist

    const playlist : string[] = videoList.map(i => i.videoUrl) // Convert into youtube playlist

    this.setState({ playlist, playlistIndex })
    this.loadPlaylist(playlist, playlistIndex)
  }


  componentDidMount = () => {
    this.loadPlayerScripts()
    
  };



  loadPlayerScripts = (): void => { // loads the required scripts for player
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag : any = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    
    window.onYouTubeIframeAPIReady = this.loadVideo // Call this after player has been loaded
  }


  player: any // declared for TS

  loadVideo = (): void => { // loads the video once player is ready
    this.player = new window.YT.Player("youtube-player", {
      videoId: "o_XaJdDqQA0",
      events: {
        onStateChange: this.onPlayerStateChange
      },
    });
  };
  
  onPlayerStateChange = (event: any): void => { //  Events called by Youtube
  
    // For future features
    if (event.data === -1) { // Called every time user interacts with the player
      
    }

    if (event.data === 0) { // ENDED
      
    }

    if (event.data === 1) { // PLAYING
      
    }

    if (event.data === 2) { // PAUSED
      
    }
  }

  render() {

    return (<div>
        <div id="youtube-player"/>
        <VideoQueue sessionName={this.props.sessionName} updatePlaylist={this.updatePlaylist}/>
        </div>); 
  };
}

export default YouTubeplayer;


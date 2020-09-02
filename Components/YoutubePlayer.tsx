import PropTypes from 'prop-types';
import React from 'react';
import VideoQueue from './VideoQueue';


interface Props {
    sessionName : string,
    id : string
}
 
interface State {
    showPlaceHolder : boolean, // currently playing video from the list
    sessionName? : string,
    firstVideoPlayed : boolean,
    videoIndex : number,
    videoList : object[]
}



class YouTubeplayer extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state={
            showPlaceHolder : true,
            firstVideoPlayed : false,
            videoIndex : 0,
            videoList : 
                [
                    { videoUrl : "p7-QZ2O-Bz0", videoName: "johnosn video 1"},
                    { videoUrl : "p7-QZ2O-Bz0", videoName: "johnosn video 2"},
                    { videoUrl : "p7-QZ2O-Bz0", videoName: "johnosn video 3"}
                ]
        }
    }


  componentDidMount = () => {
    this.loadYoutubePlayer()
    
  };

  loadYoutubePlayer = () => { // loads the required scripts to use youtube player
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';

    
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = this.loadVideo;
  }

  loadVideo = () => { // loads the video once player is ready
    
    const { id } = this.props;
    const {videoIndex, videoList} = this.state

    // the Player object is created uniquely based on the id in props
    this.player = new window.YT.Player(`youtube-player-${id}`, {
      videoId: id,
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

  onPlayerStateChange = event => {

    // Variables

    if (event.data == -1 ) { // update playlist if they dont match
      let videoIndex = this.state.videoIndex;
      var index = event.target.getPlaylistIndex();
      const playlist = this.state.videoList.map(v => {
        return v.videoUrl
      })
      if(event.target.getPlaylist().length != playlist.length) { // if the current playlist doesnt match the state playlist
        event.target.loadPlaylist(playlist, videoIndex + 1);      
      }

      this.setState({videoIndex : event.target.getPlaylistIndex()})
    }
    if (event.data == YT.PlayerState.ENDED) { // starts playlist over if it ends

      if (event.target.getPlaylistIndex() == event.target.getPlaylist().length-1) {
        const playlist = this.state.videoList.map(v => {
          return v.videoUrl
        })
        console.log("playlist has ended")
        this.player.loadPlaylist({playlist : playlist}, event.target.getPlaylistIndex())
      }
    }  
  }

  updateVideoList = (vid) => {
    let videoList = this.state.videoList
    console.log(vid, "VID TO BE ADDED")
    console.log(this.state.videoList, "VIDEOLIST")
    
    if (videoList.length <= 0) { // if list is empty play the first video
      const playlist = []
      playlist.push(vid.videoUrl)
      this.player.loadPlaylist({playlist: playlist})
    }
    videoList.push(vid)
    if (videoList.length > 40) { // keep the max videolist lenght at this num
      videoList = videoList.slice(1)
    }
    this.setState({videoList : videoList, showPlaceHolder : false})
    
    
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
    
    const { id } = this.props;
    return (<div>
        <div id={`youtube-player-${id}`} />
        <VideoQueue videoIndex={this.state.videoIndex} selectVideo={this.selectVideo} videoList={this.state.videoList} updateVideoList={this.updateVideoList} sessionName={this.state.sessionName}/>
        </div>);
  };
}

export default YouTubeplayer;
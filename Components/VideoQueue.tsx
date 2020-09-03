import { Component } from 'react'
import io from 'socket.io-client'
import { runInThisContext } from 'vm'

interface Props {
    updatePlaylist : (playlist : Array<Videolist>, playlistIndex : number) => void // update youtube playlist
    sessionName : string
}

interface Videolist { // List of all the videos which can be clicked & played
    videoUrl : string
    videoName : string
}

interface Message { // messages received via socketIO
    videoUrl : string
    videoName : string
}

interface State {
    videoList : Array<Videolist>
    videoIndex : number // index of the currently playing video
    socket : any    // socket IO Config
}

class VideoQueue extends Component<Props, State> {

    constructor(props : Props) {
        super(props)
        this.state = {
            socket : io(),
            videoIndex : 0,
            videoList : []
        }
    }
    
    updateVideoIndex = (videoIndex : number) => { 
        
    }

    updateVideoList = ( msg ): void => { // Updates the videolist

        let videoList = this.state.videoList
        videoList.push(msg)
        this.setState({ videoList })
       
    }

    handleClick = (videoList : Array<Videolist>, videoIndex : number): void => { // Called when list element is clicked, update videoindex & youtubeplaylist
        this.setState({ videoIndex }, () => {this.props.updatePlaylist(videoList, videoIndex)})
        
    }


    componentDidMount() { 
        this.state.socket.on(`${this.props.sessionName} video`, (msg : Message) => { // called every time socket io receives a message 
            console.log("data received")
            this.updateVideoList(msg)
        })
    }
    render() { 
        const {videoIndex, videoList} = this.state

        return ( 
        <div className="VideoQueue">
            <ul>
                <p>Video Queue</p>
                {videoList.map(v => {
                    return <li onClick={() => {this.handleClick(videoList, videoList.findIndex(e => e.videoName === v.videoName))}}>{v.videoName}</li>
                })}
            </ul>
        </div> );
    }
}
 
 
export default VideoQueue;
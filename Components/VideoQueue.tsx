import { Component } from 'react'
import io from 'socket.io-client'


interface Props {
    updatePlaylist : (playlist : Array<Video>, playlistIndex : number) => void // update youtube playlist
    sessionName : string
}

export interface Video { 
    videoUrl : string
    videoName : string
}

interface Message { // messages received via socketIO
    videoUrl : string
    videoName : string
}

interface State {
    videoList : Array<Video> // all the videos emitted through socket.IO
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


    componentDidMount() {

        this.state.socket.on(`${this.props.sessionName} video`, (msg : Message) => { // called every time socket io receives a message 
            this.updateVideoList(msg)        
        })
    }


    updateVideoList = ( msg: Message ): void => { // Updates the videolist

        let videoList: Array<Video> = this.state.videoList
        videoList.push(msg)
        this.setState({ videoList })
    }

    handleClick = (videoList : Array<Video>, videoIndex : number): void => { // Called when list element is clicked, update videoindex & youtubeplaylist
        this.setState({ videoIndex }, () => {this.props.updatePlaylist(videoList, videoIndex)})
        
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
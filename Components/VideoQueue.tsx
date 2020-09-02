import { Component } from 'react';
import io from 'socket.io-client'

interface Props {
    sessionName : string,
    videoList : object[],
    videoIndex : number,
    updateVideoList : ( msg : object ) => null
    selectVideo : ( msg : object ) => null
}


class VideoQueue extends Component<Props> {

    state = {
        video : null
    }

    componentDidMount() {
        this.socket = io();
        this.socket.on(`${this.props.sessionName} video`, (msg) => {
            this.props.updateVideoList(msg)
            this.setState({video: msg}) // used for re rendering
        } )
    }
    render() { 
        const videoIndex = this.props.videoIndex;
        return ( 
        <div className="VideoQueue">
            <ul style={{paddingLeft : "5px"}}>
                <p>Video Queue</p>
                {this.props.videoList.map(v => {
                    return <li style={{color: this.props.videoList[videoIndex] === v ? "green" : "white", cursor : "pointer" }} onClick={() => {this.props.selectVideo(v)}}>{v.videoName}</li>
                })}
            </ul>
        </div> );
    }
}
 
 
export default VideoQueue;
import { Component } from 'react';
import io from 'socket.io-client'


interface State {
    videoList : object[]
}


interface Props {
    sessionName : string,
    videoIndex : number,
    updateVideoList : ( msg : object ) => void // Called every time socket.io Emits a message
    selectVideo : ( msg : object ) => void
}


class VideoQueue extends Component<Props, State> {

    state = {
        videoList : 
                [
                    { videoUrl : "p7-QZ2O-Bz0", videoName: "johnosn video 1"},
                    { videoUrl : "p7-QZ2O-Bz0", videoName: "johnosn video 2"},
                    { videoUrl : "p7-QZ2O-Bz0", videoName: "johnosn video 3"}
                ]
    }

    updateVideoList = (msg : object): void => { // called every time socket.io emits a message
        
    }



    componentDidMount() {
        this.socket = io();
        this.socket.on(`${this.props.sessionName} video`, (msg) => {
            this.props.updateVideoList(msg)
            this.updateVideoList(msg)
        } )
    }
    render() { 
        const videoIndex = this.props.videoIndex;
        return ( 
        <div className="VideoQueue">
            <ul style={{paddingLeft : "5px"}}>
                <p>Video Queue</p>
                {this.state.videoList.map(v => {
                    return <li style={{ color: this.state.videoList[videoIndex] === v ? "green" : "white" }} onClick={() => {this.props.selectVideo(v)}}>{v.videoName}</li>
                })}
            </ul>
        </div> );
    }
}
 
 
export default VideoQueue;
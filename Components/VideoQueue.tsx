import { Component } from 'react'
import io from 'socket.io-client'
import { runInThisContext } from 'vm'

interface Props {
    updatePlaylist : (playlist : object[], playlistIndex : number) => void
}

interface Videolist { // List of all the videos
    videoUrl : string
    videoName : string
}


interface State {
    videoList : Array<Videolist> // list of all videos
    videoIndex : number // index of the currently playing video
    socket : any
}

class VideoQueue extends Component<Props, State> {

    constructor(props : Props) {
        super(props)
        this.state = {
            socket : io(),
            videoIndex : 0,
            videoList : 
                    [
                        { videoUrl : "p7-QZ2O-Bz0", videoName: "ok"},
                        { videoUrl : "p7-QZ2O-Bz0", videoName: "johnosn video 2"},
                        { videoUrl : "p7-QZ2O-Bz0", videoName: "johnosn video 3"}
                    ]
        }
    }
    
    

    updateVideoList = (msg : object): void => { // Called every time a socketIO message is received, updates the videolist

        let videoList : object[] = this.state.videoList
        videoList.push(msg)
        this.setState({ videoList })
       
    }

    handleClick = (videoList : object[], clickedVideo : any): void => {
        console.log(clickedVideo.videoName)
        console.log(videoList[0].videoName)
        console.log(videoList.findIndex(v => {v.videoName === clickedVideo.videoName}))
        /*
        const array1 = [{ videoUrl : "p7-QZ2O-Bz0", videoName: "1"},  { videoUrl : "p7-QZ2O-Bz0", videoName: "2"},  { videoUrl : "p7-QZ2O-Bz0", videoName: "3"}];
        
       
        console.log(array1.findIndex(n => n.videoName === "1"));
        console.log(videoList.findIndex(n => n.videoName === "ok"))
        console.log(videoList, "VIDEO LIST HERE")
        console.log(videoList.findIndex(v => {v.videoName == "ok"}), "i shoudl be")
        //console.log(videoList.findIndex(n => n==="1"
        //this.props.updatePlaylist( videoList, videoIndex, )
        */
    }


    componentDidMount() { 

        this.state.socket.on(`${sessionStorage.getItem("sessionName")} video`, (msg) => { // called every time socket io receives a message
            console.log("data received")
            this.updateVideoList(msg)
        } )
    }
    render() { 
        const {videoIndex, videoList} = this.state

        return ( 
        <div className="VideoQueue">
            <ul style={{paddingLeft : "5px"}}>
                <p>Video Queue</p>
                {videoList.map(v => {
                    return <li onClick={() => {this.handleClick(videoList, v)}}>{v.videoName}</li>
                })}
            </ul>
        </div> );
    }
}
 
 
export default VideoQueue;
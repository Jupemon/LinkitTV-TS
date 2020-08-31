// Renders the videoplayer once session has been created

import { Component } from 'react';
import VideoQueue from './VideoQueue';
import PlaceHolder from './Placeholder';

class Session extends Component {
    constructor(props) {
    super(props)
    this.state = { 
        videoList : []
     }
    }
    addVideo = (videoName) => {
        const videoList = this.state
        videoList.push(videoName)
        this.setState({videoList : videoList})
    }

    render() { 
        return ( 
        <div>
        </div> );
    }
}
 
export default Session;

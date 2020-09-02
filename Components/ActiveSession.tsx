import * as React from 'react';
import YouTubeplayer from './YoutubePlayer';
import VideoQueue from './VideoQueue';

interface Props {
    sessionName : string
}
 
interface State {
    playingVideo : number, // index of the current video played
}

class ActiveSession extends React.Component<Props, State> {

    constructor(props : Props) {
        super(props);
        this.state = {
            playingVideo : 0,
        };
    }


    
    selectVideo = (name:string) => {
        name
    }

    public render() { 
        return (
        <div>
        <YouTubeplayer id={"B1lNhNHdoPI"}/>
        </div> 
        );
    }
}
 
export default ActiveSession;
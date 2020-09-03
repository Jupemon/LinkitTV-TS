import * as React from 'react';
import YouTubeplayer from './YoutubePlayer';
import VideoQueue from './VideoQueue';
import SessionInfo from './SessionInfo';

interface Props { 
    sessionName : string // used to receive socketIO messages
}


class ActiveSession extends React.Component<Props> {

    constructor(props : Props) {
        super(props);
    }

    public render() { 
        return (
        <div>
        <YouTubeplayer sessionName={this.props.sessionName}/>¨
        <SessionInfo sessionName={this.props.sessionName}/>
        </div> 
        );
    }
}
 
export default ActiveSession;
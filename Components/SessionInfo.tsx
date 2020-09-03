// Shows info about the current session to user

export interface Props {
    sessionName : string
}
 
const SessionInfo: React.SFC<Props> = ({sessionName : sessionName}) => {

    const link : string = window.location.href.replace("session", "share")+ "/" + sessionName // create the shareable link


    return ( 
    <div className="SessionInfo">
        <p>Session Link : <a target="_blank" href={link}>{link}</a></p>
    </div> 
    );
}
 
export default SessionInfo;
import TopNav from '../Components/Topnav'

const NotFound = () => {
    return ( <div>
        <TopNav />
        <div className="PurpleBox" style={{color:"red"}}>Session not found</div>
    </div> );
}
 
export default NotFound;
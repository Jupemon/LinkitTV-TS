import TopNav from '../Components/Topnav'

const NotFound = () => {
    return ( <div style={{fontFamily: '"Comic Sans MS", cursive, sans-serif', color:"white", fontSize:"20px", marginTop:"150px" }}>
        <TopNav />
        <div className="PurpleBox" style={{color:"red"}}>Session not found</div>
    </div> );
}
 
export default NotFound;
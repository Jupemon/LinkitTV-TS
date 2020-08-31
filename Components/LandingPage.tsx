import Link from 'next/link'

const LandingPage = () => {
    return ( 
    <div className="LandingPage">
        <p>Watch youtube videos suggested by your viewers</p>
        <img src="/logo.png" alt="logo" width="90%"/>
        <Link href="/session">
            <div onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.color = "purple"}} onMouseOut={(e) => {e.currentTarget.style.backgroundColor = "purple"; e.currentTarget.style.color = "white"}} style={{width : "70px", marginRight :"50%", marginLeft:"50%", cursor : "pointer"}}>Start</div>
        </Link>
    </div> );
}
 
export default LandingPage;
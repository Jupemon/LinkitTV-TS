import Link from 'next/link'

const LandingPage = () => {
    return ( 
    <div className="LandingPage">
        <p>Watch youtube videos suggested by your viewers</p>
        <img src="/logo.png" alt="logo" width="90%"/>
        <Link href="/session">
            <div className="Button">Start</div>
        </Link>
    </div> );
}
 
export default LandingPage;
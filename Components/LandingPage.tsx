// Renders the landing page

import Link from 'next/link'

const LandingPage = () => {
    return ( 
    <div className="PurpleBox">
        <p>Watch youtube videos linked by anyone online</p>
        <img src="/logo.png" alt="logo" width="90%"/>
        <Link href="/session">
            <div className="PurpleBox-btn">Start</div>
        </Link>
    </div> );
}
 
export default LandingPage;
import Head from 'next/head'
import TopNav from '../Components/Topnav'
import LandingPage from '../Components/LandingPage'

export default function Home() {
  return (
    <div>
      <TopNav />     
      <div className="BottomScreen">
        <LandingPage />
      </div>
    </div>
  )
}

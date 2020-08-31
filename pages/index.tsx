import Head from 'next/head'
import styles from '../styles/Home.module.css'
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

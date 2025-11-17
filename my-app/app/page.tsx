import Link from "next/link"
import NavBar from "./components/navbar"
import "./globals.css"

export default function Home() {
  return (
    <div className = "home">
      <NavBar />

      <div className = "topHome">
        <h1>Welcome to Mia's Mini Games!</h1>
        <h2>Pick a game and start playing!</h2>
      </div>
      
      <div className = "buttonholder">
        <button><Link href="/rockpaperscissors">Rock, Paper, Scissors!</Link></button>
        <button><Link href="/hangman">Hangman!</Link></button>
        <button><Link href="/memory">Memory!</Link></button>
      </div>
    </div>
  )
}

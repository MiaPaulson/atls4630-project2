import Link from "next/link"
import "../globals.css"

export default function NavBar() {

    return (
        <div>
            <nav className = "navbar">
                <Link href="/" className = "navbarItem">Home</Link>
                <Link href="/rockpaperscissors" className = "navbarItem">Rock, Paper, Scissors</Link>
                <Link href="/hangman" className = "navbarItem">Hangman</Link>
                <Link href="/memory" className = "navbarItem">Memory</Link>
            </nav>
        </div>
    )
}
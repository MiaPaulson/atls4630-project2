import Link from "next/link"
import NavBar from "../components/navbar"
import "../globals.css"

export default function Memory() {

    return(
        <div>
            <NavBar />

            <h1>Memory Card Game</h1>
            <h2>Click on a card to flip it over! Once you find a match, they'll stay flipped over - you win once all cards are face-up!</h2>

            <div className = "grid">
                <div className = "card">1</div>
                <div className = "card">2</div>
                <div className = "card">3</div>
                <div className = "card">4</div>
                <div className = "card">5</div>
                <div className = "card">6</div>
                <div className = "card">7</div>
                <div className = "card">8</div>
                <div className = "card">9</div>
                <div className = "card">10</div>
                <div className = "card">11</div>
                <div className = "card">12</div>
            </div>

        </div>
    )
}
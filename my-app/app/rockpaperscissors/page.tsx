import Link from "next/link"
import NavBar from "../components/navbar"
import "../globals.css"

export default function RockPaperScissors() {

    return(
        <div>
            <NavBar />

            <h1>Rock, Paper, Scissors</h1>
            <h2>Choose rock, paper, or scissors and try to beat the computer!</h2>

            <div className = "RPS">
                <div className = "compRPS">Computer Response</div>

                <div className = "butRPS">
                    <button>Rock</button>
                    <button>Paper</button>
                    <button>Scissors</button>
                </div>
            </div>

        </div>
    )
}
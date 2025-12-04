// to use useEffect & useState
"use client"

import NavBar from "../components/navbar"
import "../globals.css"
import {useState} from "react"

export default function RockPaperScissors() {

    const [loading, setLoading] = useState(false);
    const [player, setPlayer] = useState("")
    const [computer, setComputer] = useState("")
    const [winner, setWinner] = useState("")


    const game = (playerButtonClicked: string) => {
        // what player chooses
        setPlayer(playerButtonClicked)

        // reset the time and winner
        setLoading(true)
        setWinner("")
        setComputer("")



        // everything delayed
        setTimeout(() => {
            // what computer chooses
            const computerPick = Math.floor(Math.random() * 3) + 1;
            // with updating the renderings and state, need to have LOCAL VARIABLES not state
            let computerChoice = ""
            if(computerPick === 1) computerChoice = "rock"
            if(computerPick === 2) computerChoice = "paper"
            if(computerPick === 3) computerChoice = "scissors"

            setComputer(computerChoice)

            // again, LOCAL VARIABLES!
            const playerChoice = playerButtonClicked
            let result = ""

            // who wins
            if(playerChoice === computerChoice) {
                result = "It's a tie!!"
            }
            else if (
                (playerChoice === "rock" && computerChoice === "scissors") ||
                (playerChoice === "paper" && computerChoice === "rock") ||
                (playerChoice === "scissors" && computerChoice === "paper")
            ) {
                result = "You win :)"
            }
            else {
                result = "You lose :("
            }
            
            // now do state & reset load
            setWinner(result)
            console.log("player:", playerChoice, "computer:", computerChoice, "result:", result)
            setLoading(false)
            
            
        }, 1000)
        
    }


    return(
        <div>
        <NavBar />

        <h1>Rock, Paper, Scissors</h1>
        <h2>Choose rock, paper, or scissors and try to beat the computer!</h2>

        <div className="RPS">

            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div className="compRPS">
                        Computer Response: {computer}
                    </div>

                    <div className="butRPS">
                        <button onClick={() => game("rock")}>Rock</button>
                        <button onClick={() => game("paper")}>Paper</button>
                        <button onClick={() => game("scissors")}>Scissors</button>
                    </div>

                    <div>You chose: {player}</div>
                    
                    <h1>{winner}</h1>
                </>
            )}

        </div>
    </div>
)
}

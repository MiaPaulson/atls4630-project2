import Link from "next/link"
import NavBar from "../components/navbar"
import "../globals.css"

export default function HangMan() {

    return(
        <div>
            <NavBar />

            <h1>Hangman</h1>
            <h2>Type in letter you want to guess and hit ENTER. Guess the phrase/word before the man is completely drawn!</h2>
            
            <div className = "hangAll">
                <div className = "hangIn">
                    <div className = "hangMan">Pic here</div>
                    <div className = "hangLetters">a, b, c</div>
                </div>

                <input
                type="text"
                placeholder="Type a letter here"
                ></input>

                <input
                type="text"
                placeholder="Guess the entire phrase/word here">
                </input>
            </div>
        </div>
    )
}
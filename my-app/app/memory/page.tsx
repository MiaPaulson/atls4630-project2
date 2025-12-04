// to use useEffect & useState
"use client"

import NavBar from "../components/navbar"
import Card from "./card"
import "../globals.css"
import {useState, useEffect} from "react"

const images = [
    "/bee.jpg",
    "/butterfly.jpg",
    "/dragonfly.jpg",
    "/grasshopper.jpg",
    "/ladybug.jpg",
    "/slug.jpg"
]

type CardType = {
    id: number,
    image: string,
    isFlipped: boolean
}

export default function Memory() {

    const [cards, setCards] = useState<CardType[]>([])
    const [flipped, setFlipped] = useState<number[]>([])
    const [matched, setMatched] = useState<number[]>([])
    const [disabled, setDisabled] = useState(false)
    const [playing, setPlaying] = useState(true)

    // couldn't figure out how to map the images correctly, went to ChatGPT for it
    // here the effect will run to initialize the game
    // doubled duplicates the images array set above so that there are two of each
    // shuffled maps the images to a random spot in the grid and initialized isFlipped to false to show the back of the card to start with
        // the sort does the shuffling, while the map adds the images to the array
    // since do it twice, make function and call in use effect on load and call itself when redo


    function setUpCards() {
        const doubled = [...images, ...images]
        const shuffled = doubled.map((image) => ({ image, id: Math.random(), isFlipped: false })).sort(() => Math.random() - 0.5)

        setCards(shuffled)
    }

    // set up original
    useEffect(() => {
        setUpCards()
    }, [])

    // when click on the card, only flip two at a time
    const flippingCard = (index: number) => {
        // when comparing two cards it disables the game
        if(disabled) return
        // can't have more than 2 at a time
        if(flipped.length === 2) return
        // already flipped this card
        if(flipped.includes(index)) return
        // if this card is already matched
        if(matched.includes(index)) return

        // spread the array to add the new flipped card's index
        const newFlipped = [...flipped, index]
        setFlipped(newFlipped)

        // have to show the image now
        // stuck, ChatGPT helped me here:
        // c is current card object, i is index of that card
        // checks if current card is what we want to update
        // spreads the object and changes isFlipped to true
        setCards((prev) => 
            prev.map((c,i) => i === index ? {...c, isFlipped: true} : c)
        )

        if(newFlipped.length === 2) {
            setDisabled(true)

            // separate into two different variables and see if the same
            const [first, second] = newFlipped

            // rendering issues again, have to separate into own variables!
            const firstCard = cards[first]
            const secondCard = cards[second]
            const isMatch = firstCard.image === secondCard.image
            

            if(isMatch) {
                // add these cards to the match array, reset the flipped, and undisable
                setMatched((prev) => [...prev, first, second])
                setFlipped([])
                setDisabled(false)
            } else {
                // delay to make sense for user
                // unflip the cards
                setTimeout(() => {
                    // spread the previous and make the indexes chosen's isFlipped back to false
                    setCards((prev) =>
                        prev.map((c,i) => i === first || i === second ? { ...c, isFlipped: false }: c)
                    )
                    setFlipped([])
                    setDisabled(false)
                }, 1000)

            }

        }

    }

    // when matched changes see the length - want to end game once all matched
    useEffect(() => {
        if (matched.length === 12) {
            setPlaying(false);
        }
    }, [matched]);

    const playAgain = () => {
        setUpCards()
        setDisabled(false)
        setPlaying(true)
        setFlipped([])
        setMatched([])
    }

    return(
        <div>
            <NavBar />

            <h1>Memory Card Game</h1>
            <h2>Click on a card to flip it over! Once you find a match, they'll stay flipped over - you win once all cards are face-up!</h2>

            {playing === true && (
                <div className = "grid">
                    {cards.map((card, index) => (
                        <Card
                            key={card.id}
                            card={card}
                            onClick={() => flippingCard(index)}
                        />
                ))}
                </div>
            )}

            {playing === false && (
                <div className="endMem">
                    <h1>Great Job! You found all the matches!</h1>
                    <button onClick={playAgain}>Play Again</button>
                </div>
            )}
            

        </div>
    )
}
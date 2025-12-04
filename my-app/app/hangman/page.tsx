"use client"

import NavBar from "../components/navbar"
import "../globals.css"
import {useState, useEffect} from "react"

export default function HangMan() {

    // to ChatGPT for the below list:
    //please give me an array of 100 strings with random words. The words should be 4 letters minimum and 8 letters should be the maximum. They all have to be guessable for English speakers but they don't have to be too common (most should be pretty common). Give a good mix of the shorter, medium, and longer words
    // then also said: let's do 500
    const WORDS = [
        "anchor","animal","answer","apples","artist","aspect","atlas","atomic","attach","autumn",
        "backed","badge","bagels","baking","balcon","banana","banner","barren","basket","beacon",
        "beachy","beetle","belief","binder","bishop","bitten","blazer","blends","blight","blonde",
        "bloomy","border","bottle","bounce","branch","braver","breeze","bridge","bright","broken",
        "bronze","browser","bubble","budget","buffer","buggy","builder","bullet","bundle","bunker",
        "cactus","camera","candle","canine","cannon","canvas","carpet","carrot","castle","casual",
        "cereal","charge","chase","cheese","cheers","cherry","chorus","chosen","circle","clarity",
        "clause","clever","client","climate","clinic","closed","clover","clutch","cobalt","coffee",
        "collar","colors","comedy","comic","common","comply","confer","cookie","copper","coral",
        "cosmic","cotton","couple","cowboy","coyote","credit","crisis","critic","crown","crunch",
        "cradle","crafty","crater","create","cringe","crooks","crowns","cuddle","curate","curved",
        "custom","dainty","damage","danger","daring","dashes","dealer","decade","deeper","degree",
        "deluxe","dense","desert","desire","detail","device","dialog","digest","dinner","dishes",
        "dollar","domain","dragon","driven","driver","drowsy","drying","duffel","dungeon","during",
        "eager","earned","earthy","easily","echoes","edible","effort","eighth","elder","elegant",
        "energy","enigma","enlist","enrich","enroll","escape","essays","estate","ethics","evenly",
        "fabric","fading","fallen","family","farmer","faster","father","fathom","feasts","fellow",
        "felony","fender","ferry","festival","fiesta","filter","finale","finger","finish","finite",
        "fiscal","fisher","flames","flavor","flight","floral","flower","flying","folder","forest",
        "forget","formal","format","fossil","fought","fraction","freely","freeze","friend","frozen",
        "galaxy","garden","garlic","gather","gentle","geyser","giggle","ginger","glance","glider",
        "global","glossy","golden","goose","gossip","govern","grains","gravel","greedy","greens",
        "gridle","grower","grumpy","guided","guitar","habits","hammer","handle","harbor","harsh",
        "hatred","hazard","health","hearts","heater","height","helmet","herbal","hidden","highly",
        "hiking","hollow","honest","horror","huddle","humble","humane","hunter","hunger","hybrid",
        "iconic","ignite","ignore","immune","impact","import","impose","income","indeed","inform",
        "injury","inland","insist","invent","invest","invite","island","ivory","jacket","jargon",
        "jasper","jersey","jingle","jigsaw","jockey","jordan","jovial","joyful","judged","jungle",
        "keenly","keeper","kidney","kindle","kingly","kitten","knight","knacks","ladder","laptop",
        "larger","latino","latest","laundry","leader","legacy","legend","lender","length","lesson",
        "letter","levels","library","likely","limber","linear","linen","linger","liquid","little",
        "lively","lizard","locals","logic","lonely","longer","loosen","lovely","loyal","lunar",
        "lyrics","magnet","mammal","manage","marble","margin","marine","market","maroon","marsh",
        "master","matrix","meadow","melody","member","memory","mental","mentor","mercury","mellow",
        "merger","metal","meteor","method","middle","mighty","mirror","misfit","mixing","mobile",
        "modern","modify","moment","monkey","mount","motion","motive","movie","muffin","mumble",
        "mystic","napkin","nature","navy","nectar","needle","neglect","ninety","noodle","normal",
        "notion","novice","number","nurture","object","oblige","obsess","occupy","ocean","office",
        "offset","opaque","openly","oppose","oracle","orange","orbit","orchid","outlet","oxygen",
        "paddle","palace","pamper","parcel","pardon","parrot","pastel","pastor","patent","pattern",
        "pebble","pellet","pepper","period","permit","person","petals","phrase","pickle","pickup",
        "picture","pierce","pillar","pillow","pirate","planet","plasma","plenty","pocket","poetry",
        "polish","ponder","powder","prairie","precise","prefer","pretty","prince","prism","prized",
        "prompt","public","puddle","pulses","pumpkin","pursue","puzzle","python","quartz","quench",
        "quirky","quoted","rabbit","racing","radial","radius","ranger","rarely","rather","ration",
        "reader","reason","reboot","recall","recent","recipe","record","reduce","refine","region",
        "relate","remark","remedy","remote","renew","repair","repeat","report","rescue","reside",
        "rested","result","retail","retire","return","reveal","review","reward","rhythm","ribbon",
        "riddle","rifles","rising","rivals","rocket","roster","rotary","rough","round","router",
        "ruby","runner","rustic","saddle","safari","safety","saints","salmon","sample","sandal",
        "satire","savage","saving","scalar","scarce","scenic","scheme","school","scorch","screen",
        "script","scroll","sealed","season","second","secure","sedate","seeker","seldom","seller",
        "senior","sense","server","settle","shadow","shaken","shapes","shared","shelve","shield",
        "shiver","shower","silent","silver","simple","siren","sister","sketch","skills","skater",
        "sleeve","slight","slower","smooth","snacks","sniper","socket","sodium","soften","solar",
        "solemn","solver","sorted","sound","source","sovere","sparse","speech","sphere","spices",
        "spider","spike","spirit","splash","sponge","sports","spread","spring","sprite","stable",
        "stadium","stages","staple","static","statue","steady","stereo","sticky","stitch","stock",
        "stone","stored","strain","stream","street","strike","string","strong","studio","subtle",
        "submit","sudden","suffer","summer","summit","sunset","superb","supply","survey","switch",
        "symbol","system","tablet","tackle","talent","target","tattoo","tavern","teamed","temple",
        "tender","tenant","tension","theory","thrive","throne","thrust","ticket","timber","tinted",
        "tiring","tomato","tongue","toothy","topics","torch","torrent","tossed","toward","tracks",
        "trader","tragic","trained","travel","treaty","tribal","tricky","triple","trivia","trophy",
        "tropic","trucks","trusty","tunnel","turkey","turtle","twenty","typing","unfair","unfold",
        "unify","unique","united","unlock","update","uphold","upward","usable","vacant","vacuum",
        "valley","velvet","vendor","versed","vessel","victim","victor","vintage","violet","vision",
        "visual","volume","voyage","wander","warden","warmth","wealth","weaver","weekly","whales",
        "wheels","whisper","wicked","widely","widget","wildly","window","winner","winter","wisdom",
        "wizard","wonder","wooden","worker","worthy","writer","xenial","yellow","yogurt","yonder",
        "younger","zealot","zipped","zither","zodiac","zonked","zoster","zygote"
    ]

    // asked ChatGPT: give me a good text drawing in an array of strings with 6 stages (head, body, right arm, left arm, right leg, left leg) for the hangman
    // then: make index 0 the plain hanging thing
    const HANGMAN_STAGES = [
        // 0 - Empty gallows
        [
            "  +---+",
            "  |   |",
            "  |    ",
            "  |    ",
            "  |    ",
            "  |    ",
            "======="
        ],

        // 1 - Head
        [
            "  +---+",
            "  |   |",
            "  |   O",
            "  |    ",
            "  |    ",
            "  |    ",
            "======="
        ],

        // 2 - Body
        [
            "  +---+",
            "  |   |",
            "  |   O",
            "  |   |",
            "  |   |",
            "  |    ",
            "======="
        ],

        // 3 - Right arm
        [
            "  +---+",
            "  |   |",
            "  |   O",
            "  |  /|",
            "  |   |",
            "  |    ",
            "======="
        ],

        // 4 - Left arm
        [
            "  +---+",
            "  |   |",
            "  |   O",
            "  |  /|\\",
            "  |   |",
            "  |    ",
            "======="
        ],

        // 5 - Right leg
        [
            "  +---+",
            "  |   |",
            "  |   O",
            "  |  /|\\",
            "  |   |",
            "  |  / ",
            "======="
        ],

        // 6 - Left leg (final)
        [
            "  +---+",
            "  |   |",
            "  |   O",
            "  |  /|\\",
            "  |   |",
            "  |  / \\",
            "======="
        ]
    ]

    const [word, setWord] = useState("")
    const [correctLetters, setCorrectLetters] = useState<string[]>([])
    const [wrongLetters, setWrongLetters] = useState<string[]>([])
    const [letterGuess, setLetterGuess] = useState("")
    const [phraseGuess, setPhraseGuess] = useState("")
    const [gameStatus, setGameStatus] = useState("playing")

    // get random word on load of the page, not every re-render
    useEffect(() => {
        const newWord = WORDS[Math.floor(Math.random() * WORDS.length)]
        setWord(newWord)
    }, [])
    

    const playAgain = () => {
        setCorrectLetters([])
        setWrongLetters([])
        setLetterGuess("")
        setPhraseGuess("")
        setGameStatus("playing")
        setWord(WORDS[Math.floor(Math.random() * WORDS.length)])
    }

    //console.log(word)

    // only after enter is clicked
    const checkLetter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // make sure "enter" is clicked before runs this function
        if(event.key === "Enter") {
            const guess = letterGuess.toLowerCase()

            // was stumped on syntax here... from ChatGPT
            // prev = previous render
            // ... that's the "spread" that adds the letter guess to the array of all the previous letters
            // Set() removes duplicates
            if (word.includes(guess)) {
                setCorrectLetters(prev => [...new Set([...prev, guess])])
            } else {
                setWrongLetters(prev => [...new Set([...prev, guess])])

                // when the hangman is fully drawn, lose the game - but delay so that the player sees fully drawn man
                if(wrongLetters.length === 5) {
                    setTimeout(() => {
                        setGameStatus("lost")
                    }, 1000)
                }
            }

            setLetterGuess("")
        }
    }

    const checkPhrase = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            if(phraseGuess.toLowerCase() === word) {
                setGameStatus("won")
            }
            else {
                setGameStatus("lost")
            }
        }
    }

    // asked ChatGPT to help me display the letters where they go after they've been guessed correctly
    // split: individual characters
    // map: loops through and replaces the _ with the letters
    // join: separates all with a space
    const display = word.split("").map(letter => (correctLetters.includes(letter) ? letter : "_")).join(" ")
    

    return (
        <div>
            <NavBar />

            <h1>Hangman</h1>
            <h2> Type in a letter you want to guess and hit ENTER. Guess the phrase/word before the man is completely drawn!</h2>

            {/* show while playing */}
            {gameStatus === "playing" && (
            <div>
                <div className="hangAll">
                    <div className="hangIn">
                        <div className="hangMan">
                            {/* came with the drawings from ChatGPT */}
                            <pre>{HANGMAN_STAGES[wrongLetters.length].join("\n")}</pre>
                        </div>

                        <div className="hangLetters">{wrongLetters.join(" ")}</div>
                    </div>

                    <h1>{display}</h1>

                    <input
                        type="text"
                        placeholder="Type a letter here"
                        maxLength={1}
                        value={letterGuess}
                        onChange={(e) => setLetterGuess(e.target.value)}
                        onKeyDown={checkLetter}
                    ></input>

                    <input
                        type="text"
                        placeholder="Guess the entire phrase/word here"
                        maxLength={8}
                        value={phraseGuess}
                        onChange={(e) => setPhraseGuess(e.target.value)}
                        onKeyDown={checkPhrase}
                    ></input>
                </div>
            </div>
            )}

            <div className="endHang"> 
                {/* display win/lose messages and play again */}
                {gameStatus === "won" && <h1>You won!</h1>}
                {gameStatus === "lost" && <h1>You lose! The word was: {word}</h1>}

                {(gameStatus === "won" || gameStatus === "lost") && (
                <button onClick={playAgain}>Play Again</button>
                )}
            </div>
        </div>
    
    )
}
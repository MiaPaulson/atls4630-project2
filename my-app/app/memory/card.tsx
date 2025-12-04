import Image from "next/image"



export default function Card({card, onClick}: any) {

    return(
        <div
        // the onClick that happens in page.tsx
        onClick = {onClick}
        >
            {card.isFlipped ? (<Image src={card.image} alt="card" width={200} height={200} border-radius={12}/>) : (<div className="card"></div>)}
        </div>
)}

import React from "react";

function Card({cardNumber, deck, flip, flipped, next, side}){
    return (
        <div>
            <h1>{deck.name}: Study</h1>
            <h2>Card {deck.cards[cardNumber]} of {deck.cards.length}</h2>
            <p>{deck.cards[cardNumber][side]}</p>
            <button onClick={flip}>Flip</button>
            {flipped &&
                <button onClick={next}>Next</button>
            }
        </div>
    );
}

export default Card;
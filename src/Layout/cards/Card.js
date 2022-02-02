import React from "react";

function Card({cardNumber, deck, flip, flipped, next, side}){
    return (
        <div>
            <h1>{deck.name}: Study</h1>
            <h3>Card {cardNumber + 1} of {deck.cards.length}</h3>
            <p className="bg-light border p-3 font-weight-bold">{deck.cards[cardNumber][side]}</p>
            <button className="btn btn-info p-1 mr-2" onClick={flip}>Flip</button>
            {flipped &&
                <button className="btn btn-warning p-1" onClick={next}>Next</button>
            }
        </div>
    );
}

export default Card;
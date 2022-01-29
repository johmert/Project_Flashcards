import React from "react";
import Buttons from "../buttons/Buttons";

function DeckPreview({deck, handleDelete}) {
    const theDeck = deck ? deck : {cards: []};

    return (
        <div>
            <h3>{theDeck.name}</h3>
            <h6>{theDeck.cards.length} cards</h6>
            <p>{theDeck.description}</p>
            <div>
                <Buttons names={["view", "study", "delete-deck"]} deckId={deck.id} handleDelete={handleDelete}/>
            </div>
        </div>
    );
}

export default DeckPreview;
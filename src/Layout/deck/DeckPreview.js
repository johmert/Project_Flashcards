import React from "react";
import Buttons from "../components/Buttons";

function DeckPreview({deck, handleDelete}) {
    return (
        <div class="border my-4 p-2">
            <h3>{deck.name}</h3>
            <h6>{deck.cards.length} cards</h6>
            <p>{deck.description}</p>
            <div>
                <Buttons names={["view", "study", "delete-deck"]} deckId={deck.id} handleDelete={handleDelete}/>
            </div>
        </div>
    );
}

export default DeckPreview;
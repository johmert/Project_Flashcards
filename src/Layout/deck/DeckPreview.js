import React from "react";
import Buttons from "../buttons/Buttons";

function DeckPreview({deck, handleDelete, index}) {
    return (
        <div>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <div>
                <Buttons key={index} names={["view", "study", "delete-deck"]} deckId={deck.id} handleDelete={handleDelete}/>
            </div>
        </div>
    );
}

export default DeckPreview;
import React from "react";
import DeckPreview from "./DeckPreview";

function DeckList({decks, handleDelete}) {
    const decksListed = decks.map((deck) => <DeckPreview key={deck.id} deck={deck} handleDelete={handleDelete}/>);

    return (
        <div>
            {decksListed}
        </div>
    );
}

export default DeckList;
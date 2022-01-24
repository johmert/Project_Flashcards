import React from "react";
import DeckPreview from "./DeckPreview";

function DeckList({decks}) {
    const decksListed = decks.map((deck) => <DeckPreview key={deck.id} deck={deck} />);

    return (
        <div>
            {decksListed}
        </div>
    );
}

export default DeckList;
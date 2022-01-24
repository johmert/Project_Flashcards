import React from "react";
import Deck from "./Deck";

function DeckList({decks}) {
    const decksListed = decks.map((deck) => <Deck key={deck.id} deck={deck} />);

    return (
        <div>
            {decksListed}
        </div>
    );
}

export default DeckList;
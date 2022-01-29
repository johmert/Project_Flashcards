import React from "react";
import DeckPreview from "./DeckPreview";
import CreateDeck from "../buttons/CreateDeck";

function DeckList({decks, handleDelete}) {
    const decksListed = decks.map((deck) => <DeckPreview key={deck.id} deck={deck} handleDelete={handleDelete}/>);

    return (
        <div>
            <CreateDeck />
            {decksListed}
        </div>
    );
}

export default DeckList;
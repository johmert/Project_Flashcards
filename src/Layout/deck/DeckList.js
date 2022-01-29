import React from "react";
import DeckPreview from "./DeckPreview";
import Buttons from "../components/Buttons"

function DeckList({decks, handleDelete}) {
    const decksListed = decks.map((deck) =><DeckPreview key={deck.id} deck={deck} handleDelete={handleDelete}/>);

    return (
        <div>
            <Buttons names={["create-deck"]} />
            {decksListed}
        </div>
    );
}

export default DeckList;
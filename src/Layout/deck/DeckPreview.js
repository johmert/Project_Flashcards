import React from "react";
import Delete from "../buttons/Delete";
import Study from "../buttons/Study";
import View from "../buttons/View";

function DeckPreview({deck}) {
    return (
        <div>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <div>
                <View id={deck.id}/>
                <Study id={deck.id}/>
                <Delete id={deck.id}/>
            </div>
        </div>
    );
}

export default DeckPreview;
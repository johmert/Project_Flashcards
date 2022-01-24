import React from "react";
import Delete from "../buttons/Delete";
import Study from "../buttons/Study";
import View from "../buttons/View";

function DeckPreview({deck}) {
    return (
        <div>
            <View id={deck.id}/>
            <Study id={deck.id}/>
            <Delete id={deck.id}/>
        </div>
    );
}

export default DeckPreview;
import React from "react";
import Study from "../buttons/Study";

function DeckPreview({deck}) {
    return (
        <div>
            <Study id={deck.id}/>
        </div>
    );
}

export default DeckPreview;
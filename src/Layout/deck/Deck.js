import React from "react";
import Study from "../buttons/Study";
import Breadcrumb from "../Breadcrumb";

function Deck({deck}) {
    return (
        <div id={`deck-${deck.id}`}>
            <Breadcrumb />
            <Study id={deck.id}/>
        </div>
    );
}

export default Deck;
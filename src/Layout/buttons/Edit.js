import React from "react";
import {Link} from "react-router-dom";

function Edit({mode, deckId, cardId}) {
    if(mode === "deck"){
        return <Link to={`/decks/${deckId}/edit`}>Edit</Link>
    } else if(mode === "card"){
        return <Link to={`/decks/${deckId}/cards/${cardId}/edit`}>Edit</Link>
    }
}

export default Edit;
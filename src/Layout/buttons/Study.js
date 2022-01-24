import React from "react";
import {Link, useParams} from "react-router-dom";

function Study(){
    const {deckId} = useParams();
    return <Link to={`/decks/${deckId}/study`}>Study</Link>
}

export default Study;
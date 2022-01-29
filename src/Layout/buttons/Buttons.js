import React from "react";
import {Link} from "react-router-dom";

function Buttons({names, deckId, cardId, mode, handleDelete}){
    const buttons = []
    for(let name of names){
        switch(name){
            case "add-cards": return <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
            case "create-deck": return <Link to="/decks/new">Create Deck</Link>
            case "delete":
                const button = (mode === "deck")? <button onClick={() => handleDelete(deckId)}>Delete</button> : <button onClick={() => handleDelete(cardId, deckId)}>Delete</button>;
                return button;
            case "edit":
                const edit = (mode === "deck")? <Link to={`/decks/${deckId}/edit`}>Edit</Link> : <Link to={`/decks/${deckId}/cards/${cardId}/edit`}>Edit</Link>;
                return edit;
            case "study": return <link to={`/decks/${deckId}/study`}>Study</link>;
            case "view": return <Link to={`/decks/${deckId}`}>View</Link>;
            default: return null;
        }
    }
    return buttons;
}

export default Buttons;
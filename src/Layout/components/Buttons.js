import React from "react";

function Buttons({names, deckId, cardId, handleDelete}){
    const buttons = []
    for(let name of names){
        switch(name){
            case "add-card": 
                buttons.push(
                    <a key={"add-card"} href={`/decks/${deckId}/cards/new`}>
                        <button class="btn btn-info mx-1">Add Card</button>
                    </a>
                );
                break;
            case "create-deck": 
                buttons.push(
                    <a key={"create-deck"} href="/decks/new">
                        <button class="btn btn-info mb-4">Create Deck</button>
                    </a>
                );
                break;
            case "delete-card":
                buttons.push(
                    <button
                        class="btn btn-danger mx-1" 
                        key={"delete-card"} 
                        onClick={() => handleDelete(cardId, deckId)}>
                            Delete
                    </button>
                );
                break;
            case "delete-deck":
                buttons.push(
                    <button 
                        class="btn btn-danger mx-1"
                        key={"delete-deck"} 
                        onClick={() => handleDelete(deckId)}>
                            Delete
                    </button>
                );
                break;
            case "edit-card":
                buttons.push(
                    <a key={"edit-card"} href={`/decks/${deckId}/cards/${cardId}/edit`}>
                        <button class="btn btn-warning mx-1">Edit</button>
                    </a>
                );
                break;
            case "edit-deck":
                buttons.push(
                    <a key={"edit-deck"} href={`/decks/${deckId}/edit`}>
                        <button class="btn btn-warning mx-1">Edit</button>
                    </a>
                );
                break;
            case "study": 
                buttons.push(
                    <a key={"study"} href={`/decks/${deckId}/study`}>
                        <button class="btn btn-info mx-1">Study</button>
                    </a>
                );
                break;
            case "view": 
                buttons.push(
                    <a key={"view"} href={`/decks/${deckId}`}>
                        <button class="btn btn-primary mx-1">View</button>
                    </a>
                );
                break;
            default: return null;
        }
    }
    return buttons;
}

export default Buttons;
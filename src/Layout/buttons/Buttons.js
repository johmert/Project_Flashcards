import React from "react";

function Buttons({names, deckId, cardId, handleDelete}){
    const buttons = []
    for(let name of names){
        switch(name){
            case "add-cards": 
                buttons.push(
                    <a key={"add-cards"} href={`/decks/${deckId}/cards/new`}>
                        <button>Add Cards</button>
                    </a>
                );
                break;
            case "create-deck": 
                buttons.push(
                    <a key={"create-deck"} href="/decks/new">
                        <button>Create Deck</button>
                    </a>
                );
                break;
            case "delete-card":
                buttons.push(<button key={"delete-card"} onClick={() => handleDelete(cardId, deckId)}>Delete</button>);
                break;
            case "delete-deck":
                buttons.push(<button key={"delete-deck"} onClick={() => handleDelete(deckId)}>Delete</button>);
                break;
            case "edit-card":
                buttons.push(
                    <a key={"edit-card"} href={`/decks/${deckId}/cards/${cardId}/edit`}>
                        <button>Edit</button>
                    </a>
                );
                break;
            case "edit-deck":
                buttons.push(
                    <a key={"edit-deck"} href={`/decks/${deckId}/edit`}>
                        <button>Edit</button>
                    </a>
                );
                break;
            case "study": 
                buttons.push(
                    <a key={"study"} href={`/decks/${deckId}/study`}>
                        <button>Study</button>
                    </a>
                );
                break;
            case "view": 
                buttons.push(
                    <a key={"view"} href={`/decks/${deckId}`}>
                        <button>View</button>
                    </a>
                );
                break;
            default: return null;
        }
    }
    return buttons;
}

export default Buttons;
import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard, deleteDeck } from "../../utils/api/index"

function Buttons({ names, deckId, cardId }){
    const abortController = new AbortController();
    const history = useHistory();

    async function handleDeckDelete(id){
        if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
            await deleteDeck(id, abortController.signal);
        }
        history.push("/");
        window.location.reload(false);
      }
    
      async function handleCardDelete(id){
        if(window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
          await deleteCard(id, abortController.signal);
        }
        history.go(0);
      }

    const buttons = []
    for(let name of names){
        switch(name){
            case "add-card": 
                buttons.push(
                    <a key={"add-card"} href={`/decks/${deckId}/cards/new`}>
                        <button className="btn btn-info mx-1">Add Card</button>
                    </a>
                );
                break;
            case "create-deck": 
                buttons.push(
                    <a key={"create-deck"} href="/decks/new">
                        <button className="btn btn-info mb-4">Create Deck</button>
                    </a>
                );
                break;
            case "delete-card":
                buttons.push(
                    <button
                        className="btn btn-danger mx-1" 
                        key={"delete-card"} 
                        onClick={() => handleCardDelete(cardId, deckId)}>
                            Delete
                    </button>
                );
                break;
            case "delete-deck":
                buttons.push(
                    <button 
                        className="btn btn-danger mx-1"
                        key={"delete-deck"} 
                        onClick={() => handleDeckDelete(deckId)}>
                            Delete
                    </button>
                );
                break;
            case "edit-card":
                buttons.push(
                    <a key={"edit-card"} href={`/decks/${deckId}/cards/${cardId}/edit`}>
                        <button className="btn btn-warning mx-1">Edit</button>
                    </a>
                );
                break;
            case "edit-deck":
                buttons.push(
                    <a key={"edit-deck"} href={`/decks/${deckId}/edit`}>
                        <button className="btn btn-warning mx-1">Edit</button>
                    </a>
                );
                break;
            case "study": 
                buttons.push(
                    <a key={"study"} href={`/decks/${deckId}/study`}>
                        <button className="btn btn-info mx-1">Study</button>
                    </a>
                );
                break;
            case "view": 
                buttons.push(
                    <a key={"view"} href={`/decks/${deckId}`}>
                        <button className="btn btn-primary mx-1">View</button>
                    </a>
                );
                break;
            default: return null;
        }
    }
    return buttons;
}

export default Buttons;
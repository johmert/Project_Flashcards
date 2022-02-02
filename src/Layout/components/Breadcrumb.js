import React from "react";

function Breadcrumb({page, deckName, deckId, cardId}) {
    const currentPage = () => {
        switch(page) {
            case "create-card":
                return <li className="active">Add Card</li>;
            case "create-deck":
                return <li className="active">Create Deck</li>
            case "edit-card":
                return <li className="active">Edit Card {cardId}</li>;
            case "edit-deck":
                return <li className="active">Edit Deck</li>;
            case "study":
                return <li className="active">Study</li>;
            default: return null;
        }
    };

    const deckTitle = () => {
        if(!deckName || !deckId) return null;
        return (
            <li className={`${page === "view" ? "active" : ""}`}>
                {page === "view" ? deckName : <a href={`/decks/${deckId}`} class="mr-1">{deckName} /</a>}
            </li>
        );
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrum-item"><a href="/" class="mr-1">Home /</a></li>
                    {deckTitle()}
                    {currentPage()}
                </ol>
            </nav>
        </div>
    );
}

export default Breadcrumb;
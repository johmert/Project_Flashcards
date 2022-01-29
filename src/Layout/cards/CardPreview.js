import React from "react";
import Buttons from "../components/Buttons"

function CardPreview({card, handleDelete, deckId}){    
    return (
        <div>        
            <p>{card.front}</p>
            <p>{card.back}</p>
            <Buttons names={["edit-card", "delete-card"]}deckId={deckId} cardId={card.id} handleDelete={handleDelete} />
        </div>
    );
}

export default CardPreview;
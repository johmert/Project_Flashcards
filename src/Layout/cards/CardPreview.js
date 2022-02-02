import React from "react";
import Buttons from "../components/Buttons"

function CardPreview({card, handleDelete, deckId}){    
    return (
        <div class="bg-light border-bottom my-1 p-2">        
            <p>{card.front}</p>
            <p>{card.back}</p>
            <Buttons names={["edit-card", "delete-card"]}deckId={deckId} cardId={card.id} handleDelete={handleDelete} />
        </div>
    );
}

export default CardPreview;
import React from "react";
import Delete from "../buttons/Delete";
import Edit from "../buttons/Edit";

function CardPreview({card, handleDelete, deckId}){    
    return (
        <div>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <div>
                <Edit mode="card" deckId={card.deckId} cardId={card.id}/>
                <Delete mode="card" id={card.id} handleDelete={handleDelete} deckId={deckId}/>
            </div>
        </div>
    );
}

export default CardPreview;
import React from "react";

function Delete({handleDelete, id, mode, deckId}){
    if(mode === "deck"){
        return (
            <div>
                <button onClick={() => handleDelete(id)}>Delete</button>
            </div>  
        );
    } else if(mode === "card"){
        return (
            <div>
                <button onClick={() => handleDelete(id, deckId)}>Delete</button>
            </div>  
        );
    }
    return <p>something went wrong!</p>
}

export default Delete;
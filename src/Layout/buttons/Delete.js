import React from "react";

function Delete({id}){
    const handleDelete = () => {
        if(window.confirm("Delete this deck?")){
            // handle delete
            console.log(`Deck ${id} deleted`);
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>  
    );
}

export default Delete;
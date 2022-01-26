import React from "react";

function Delete({handleDelete, id}){
    return (
        <div>
            <button onClick={() => handleDelete(id)}>Delete</button>
        </div>  
    );
}

export default Delete;
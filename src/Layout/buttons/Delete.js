import React from "react";

function Delete({handleDelete}){
    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>  
    );
}

export default Delete;
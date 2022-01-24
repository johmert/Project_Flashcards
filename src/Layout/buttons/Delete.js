import React from "react";
import {Link} from "react-router-dom";

function Delete({id}){
    return <Link to={`/decks/${id}/study`}>Delete</Link>
}

export default Delete;
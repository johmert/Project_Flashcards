import React from "react";
import {Link} from "react-router-dom";

function Study({id}){
    return <Link to={`/decks/${id}/study`}>Study</Link>
}

export default Study;
import React from "react";
import {Link} from "react-router-dom";

function View({id}){
    return <Link to={`/decks/${id}`}>View</Link>
}

export default View;
import React from "react";
import {Link} from "react-router-dom";

function AddCards({id}) {
    return <Link to={`/decks/${id}/cards/new`}>Add Cards</Link>
}

export default AddCards;
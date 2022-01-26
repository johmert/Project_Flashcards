import React from "react";
import {useHistory} from "react-router-dom";

function NewDeck({addDeck}) {
    const history = useHistory();

    function handleSubmit(event) {
        event.preventDefault();
        addDeck();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name"/>
                </label>
                <label>
                    Description:
                    <textarea name="description"/>
                </label>
                <button onClick={() => history.push("/")}>Cancel</button>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default NewDeck;
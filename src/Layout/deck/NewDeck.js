import React from "react";

function NewDeck({submit}) {
    return (
        <div>
            <form onSubmit={submit}>
                <label for="name">
                    Name:
                    <input type="text" name="name"/>
                </label>
                <label for="description">
                    Description:
                    <textarea name="description"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default NewDeck;
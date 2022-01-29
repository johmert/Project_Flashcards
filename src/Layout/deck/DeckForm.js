import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {updateDeck} from "../../utils/api/index";

function DeckForm({mode, addDeck, deck}) {
    let initialFormState = {}
    const [formData, setFormData] = useState(initialFormState);
    const history = useHistory();
    const abortController = new AbortController();
    const signal = abortController.signal;

    useEffect(() => {
        setFormData(initialFormState);
    }, [deck])

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    function handleSubmit(event) {
        event.preventDefault();
        addDeck(formData.name, formData.description);
    }

    function handleEditSubmit(event){
        event.preventDefault();
        const updatedDeck = deck;
        updatedDeck.name = formData.name;
        updatedDeck.description = formData.description;
        updateDeck(updatedDeck, signal);
        history.push("/");
        window.location.reload(false);
    }

    if(mode === "edit"){
        initialFormState = {name: deck.name, description: deck.description}
        return (
            <div>
                <h1>Edit Deck</h1>
                <form onSubmit={handleEditSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={handleChange} value={formData.name}/>
                    </label>
                    <label>
                        Description:
                        <textarea name="description" onChange={handleChange} value={formData.description}/>
                    </label>
                    <button onClick={() => history.push("/")}>Cancel</button>
                    <input type="submit" value="Submit"/>                
                </form>
            </div>
        );

    } else if(mode === "add"){
        return (
            <div>
                <h1>Create Deck</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={handleChange}/>
                    </label>
                    <label>
                        Description:
                        <textarea name="description" onChange={handleChange}/>
                    </label>
                    <button onClick={() => history.push("/")}>Cancel</button>
                    <input type="submit" value="Submit"/>                
                </form>
            </div>
        );
    }
    <p>Something went wrong!</p>
}

export default DeckForm;
import React, {useState} from "react";
import {useHistory} from "react-router-dom";


function AddCard({deck, deckId, newCard}){
    const [formData, setFormData] = useState({});
    const history = useHistory();

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    function handleSubmit(event){
        event.preventDefault();
        const card = {"id": deck.cards.length, "front": formData.front, "back": formData.back, "deckId": deckId};
        newCard(deckId, card);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Front:
                    <textarea name="front" onChange={handleChange}/>
                </label>
                <label>
                    Back:
                    <textarea name="back" onChange={handleChange}/>
                </label>
                <button onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                <input type="submit" value="Save"/>
            </form>
        </div>
    );
}

export default AddCard;
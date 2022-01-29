import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function AddCard({deckId, newCard, cardId}){
    const initialFormState = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState(initialFormState);
    const history = useHistory();

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    function handleSubmit(event){
        event.preventDefault();
        const id = cardId + 1;
        const card = {id: id, front: formData.front, back: formData.back, deckId: deckId};
        newCard(deckId, card);
        setFormData(initialFormState)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Front:
                    <textarea name="front" onChange={handleChange} value={formData.name}/>
                </label>
                <label>
                    Back:
                    <textarea name="back" onChange={handleChange} value={formData.description}/>
                </label>
                <button onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                <input type="submit" value="Save"/>
            </form>
        </div>
    );
}

export default AddCard;
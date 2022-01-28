import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateCard } from "../../utils/api";

function EditCard({deckId, card}){
    const initialFormState = {
        front: card.front,
        back: card.back
    }
    const [formData, setFormData] = useState(initialFormState);
    const history = useHistory();
    const abortController = new AbortController();
    const signal = abortController.signal;

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    function handleSubmit(event){
        event.preventDefault();
        const updatedCard = {"id": card.id, "front": formData.front, "back": formData.back, "deckId": parseInt(deckId)};
        updateCard(updatedCard, signal);
        history.push(`/decks/${deckId}`);
        window.location.reload(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Front:
                    <textarea name="front" onChange={handleChange} value={formData.front} placeholder={card.front}/>
                </label>
                <label>
                    Back:
                    <textarea name="back" onChange={handleChange} value={formData.back} placeholder={card.back}/>
                </label>
                <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default EditCard;
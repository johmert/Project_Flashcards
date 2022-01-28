import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updateCard } from "../../utils/api";
import NotFound from "../NotFound";

function EditCard({deckId, card}){
    const initialFormState = {
        front: card.front,
        back: card.back
    }
    const [formData, setFormData] = useState(initialFormState);
    const history = useHistory();
    const abortController = new AbortController();
    const signal = abortController.signal;

    useEffect(() => {
        setFormData(initialFormState);
    }, [card])

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    async function handleSubmit(event){
        event.preventDefault();
        const updatedCard = {"id": card.id, "front": formData.front, "back": formData.back, "deckId": parseInt(deckId)};
        await updateCard(updatedCard, signal);
        history.push(`/decks/${deckId}`);
        window.location.reload(false);
    }

    if(formData.front === undefined){
        return <NotFound/>
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Front:
                    <textarea name="front" onChange={handleChange} value={formData.front}/>
                </label>
                <label>
                    Back:
                    <textarea name="back" onChange={handleChange} value={formData.back}/>
                </label>
                <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default EditCard;
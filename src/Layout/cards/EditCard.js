import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {updateCard} from "../../utils/api";

function EditCard({card}){
    const [formData, setFormData] = useState({});
    const history = useHistory();
    const cardId = useParams().cardId;
    const deckId = useParams().deckId;

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    function handleSubmit(event){
        event.preventDefault();
        const updatedCard = {"id": cardId, "front": formData.front, "back": formData.back, "deckId": deckId};
        updateCard(updatedCard)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Front:
                    <textarea name="front" onChange={handleChange} value={card.front}/>
                </label>
                <label>
                    Back:
                    <textarea name="back" onChange={handleChange} value={card.back}/>
                </label>
                <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default EditCard;
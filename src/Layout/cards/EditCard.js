import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {readCard, updateCard} from "../../utils/api";

function EditCard({deckId}){
    const [card, setCard] = useState({});
    const history = useHistory();
    const cardId = useParams().cardId;
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getCard(){
        try {
            const response = await readCard(cardId, signal);
            setCard(response);
        } catch(error){
            if(error.name !== "AbortError") {
                throw error;
            }
        }
    }

    useEffect(() => {
        getCard();
        return () => {
            abortController.abort();
        }
    }, []);

    const initialFormState = {
        front: card.front,
        back: card.back
    }
    const [formData, setFormData] = useState(initialFormState);

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    function handleSubmit(event){
        event.preventDefault();
        const updatedCard = {"id": card.id, "front": formData.front, "back": formData.back, "deckId": parseInt(deckId)};
        updateCard(updatedCard, signal);
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Front:
                    <textarea name="front" onChange={handleChange} />
                </label>
                <label>
                    Back:
                    <textarea name="back" onChange={handleChange} />
                </label>
                <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default EditCard;
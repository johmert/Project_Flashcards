import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readCard, readDeck, updateCard } from "../../utils/api";
import Breadcrumb from "../components/Breadcrumb";

function CardForm({mode}){
    const initialState = {
        front: "",
        back: "",
    };
    const [deck, setDeck] = useState({});
    const [formData, setFormData] = useState({...initialState});
    const { cardId, deckId } = useParams();
    const history = useHistory();
    const abortController = new AbortController();

    useEffect(() => {
        async function getDeck(){
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
                if(mode === "edit"){
                    const card = await readCard(cardId, abortController.signal);
                    if(card){
                        initialState["front"] = card["front"];
                        initialState["back"] = card["back"];
                    }
                }
                setFormData({...initialState});
            } catch (error) {
                if(error.name !== "AbortError"){
                    throw error;
                }
            }   
        }
        getDeck();
        return () => {
            abortController.abort();
        };
        // eslint-disable-next-line
    }, [deckId]);

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    async function handleSubmit(event){
        event.preventDefault();
        let newCard = {
            front: formData.front,
            back: formData.back,
        };

        if(mode === "edit") {
            newCard["id"] = parseInt(cardId);
            newCard["deckId"] = parseInt(deckId);
        }   

        (mode === "edit")? 
            await updateCard(newCard) : 
            await createCard(deckId, newCard);
        
        if (mode === "create") setFormData({ front: "", back: ""});
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <Breadcrumb 
                page={`${mode}-card`} 
                deckName={deck ? deck.name : null} 
                cardId={parseInt(cardId)} 
                deckId={parseInt(deckId)}  
            />
            <h1>
                {`${deck.name}: `}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                {" Card"}
            </h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Front:
                    <textarea name="front" onChange={handleChange} value={formData["front"]}/> 
                </label>
                <label>
                    Back:
                    <textarea name="back" onChange={handleChange} value={formData["back"]}/> 
                </label>
                <a href="/"><button className="btn btn-danger" type="button">Cancel</button></a>
                <button className="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    );
}

export default CardForm;
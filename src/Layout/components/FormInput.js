import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import CardForm from "../cards/CardForm";
import Breadcrumb from "./Breadcrumb";

function FormInput({mode, addCard, editCard}){
    const initForm = {
        front: "",
        back: "",
    };
    const [deck, setDeck] = useState({});
    const [formData, setFormData] = useState({...initForm});
    let { cardId, deckId } = useParams();
    cardId = parseInt(cardId);
    deckId = parseInt(deckId);
    const history = useHistory();
    const abortController = new AbortController();
    const signal = abortController.signal;

    useEffect(() => {
        getDeck();
        return () => {
            abortController.abort();
        };
    }, []);

    async function getDeck(){
        try {
            const response = await readDeck(deckId, signal);
            setDeck(response);
            if(mode === "edit"){
                const card = await readCard(cardId, signal);
                if(card){
                    initForm["front"] = card["front"];
                    initForm["back"] = card["back"];
                }
            }
            setFormData({...initForm});
        } catch (error) {
            if(error.name !== "AbortError"){
                throw error;
            }
        }   
    }

    function handleChange({target}){
        setFormData({...formData, [target.name]: target.value});
    }

    async function handleSubmit(event){
        event.preventDefault();
        let newCard = {
            front: formData.front,
            back: formData.back,
        };

        if(mode === "edit") newCard["deckId"] = deckId;

        (mode === "edit")? 
            await editCard(newCard) : 
            await addCard(deckId, newCard);
        
        (mode === "create")? 
            setFormData({ front: "", back: ""}) : 
            history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <Breadcrumb 
                page={`${mode}-card`} 
                deckName={deck ? deck.name : null} 
                cardId={cardId} 
                deckId={deckId}  
            />
            <h1>
                {`${deck.name}: `}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                {" Card"}
            </h1>
            <form onSubmit={handleSubmit}>
                <CardForm handleChange={handleChange} formData={formData}/>
                <a href="/"><button className="btn btn-danger" type="button">Cancel</button></a>
                <button className="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    );
}

export default FormInput;
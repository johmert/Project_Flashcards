import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import CardForm from "../cards/CardForm";
import AddDeck from "../deck/AddDeck";
import Breadcrumb from "./Breadcrumb";

function FormInput({mode, type, addDeck, addCard, editCard}){
    const keys = (type === "deck")? ["name", "description"] : ["front", "back"];
    const initForm = {
        [keys[0]]: "",
        [keys[1]]: "",
    };
    const [deck, setDeck] = useState({});
    const [formData, setFormData] = useState({...initForm});
    let { cardId, deckId } = useParams();
    cardId = parseInt(cardId);
    deckId = parseInt(deckId);
    const history = useHistory();
    const abortController = new AbortController();
    const signal = abortController.signal;
    const submitButton = (type === "card")? "Save" : "Submit";

    useEffect(() => {
        getDeck();
        console.log(formData)
        return () => {
            abortController.abort();
        };
    }, []);

    async function getDeck(){
        if(type === "deck" && mode === "create") return;
        try {
            const response = await readDeck(deckId, signal);
            setDeck(response);
            if(mode === "edit"){
                if (type === "card") {
                    const card = await readCard(cardId, signal);
                    if(card){
                        initForm[keys[0]] = card["front"];
                        initForm[keys[1]] = card["back"];
                    }
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
        let newItem = {
            [keys[0]]: formData[keys[0]],
            [keys[1]]: formData[keys[1]],
        };

        if(mode === "edit" && type === "card"){
                newItem["deckId"] = deckId;
        }

        const index = (type === "card")?
            ((mode === "edit")? await editCard(newItem) : await addCard(deckId, newItem)) :
            await addDeck(newItem);
        
        if(mode === "create" && type === "deck") deckId = index;
        if(mode === "create" && type === "card") setFormData({ front: "", back: ""}); 
        if(mode !== "create" && type !== "card") history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <Breadcrumb 
                page={`${mode}-${type}`} 
                deckName={deck ? deck.name : null} 
                cardId={cardId ? cardId : null} 
                deckId={deckId}  
            />
            <h1>
                {type === "card" && `${deck.name}: `}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}&nbsp;
                {type.charAt(0).toUpperCase() + type.slice(1)}&nbsp;
            </h1>
            <form onSubmit={handleSubmit}>
                {
                    type === "deck" ?
                    <AddDeck handleChange={handleChange}/> :
                    <CardForm handleChange={handleChange} formData={formData}/>
                }
                <a href="/"><button type="button">Cancel</button></a>
                <button type="submit">{submitButton}</button>
            </form>
        </div>
    );
}

export default FormInput;
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";
import DeckForm from "./DeckForm";
import Breadcrumb from "./Breadcrumb";

function FormInput({abortController, mode, type, addDeck, editDeck, addCard, editCard}){
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
                if(deck && type === "deck"){
                    initForm[keys[0]] = deck.name;
                    initForm[keys[1]] = deck.description;
                } else if (type === "card") {
                    const card = await readCard(cardId, signal);
                    if(card){
                        initForm[keys[0]] = card.front;
                        initForm[keys[1]] = card.back;
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

        if(mode === "edit"){
            newItem["id"] = (type === "deck")? deckId : cardId;
            if(type === "card"){
                newItem["deckId"] = deckId;
            }
        }

        const index = (type === "deck")?
            ((mode === "edit")? await editDeck(newItem) : await addDeck(newItem)) :
            ((mode === "edit")? await editCard(newItem) : await addCard(newItem, deckId));
        
        if(mode === "create" && type === "deck") deckId = index;
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <Breadcrumb page={`${mode}-${type}`} deckName={deck ? deck.name : null} cardId={cardId ? cardId : null} deckId={deckId}  />
            <h1>
                {type === "card" && `${deck.name}: `}
                {mode.charAt(0).toUpperCase() + mode.slice(1)}&nbsp;
                {type.charAt(0).toUpperCase() + type.slice(1)}&nbsp;
            </h1>
            <form onSubmit={handleSubmit}>
                {
                    type === "deck" ?
                    <DeckForm handleChange={handleChange} formData={formData}/> :
                    <CardForm handleChange={handleChange} formData={formData}/>
                }
                <a href="/"><button type="button">Cancel</button></a>
                <button type="submit">{submitButton}</button>
            </form>
        </div>
    );
}

export default FormInput;
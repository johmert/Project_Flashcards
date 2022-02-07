import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {createDeck, readDeck, updateDeck} from "../../utils/api/index";
import Breadcrumb from "../components/Breadcrumb";

function DeckForm({mode}){
    const initialState = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState(initialState);
    const { deckId } = useParams();
    const [deck, setDeck] = useState(initialState);
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
        if(mode === "create") return;
        try {
            const response = await readDeck(deckId, signal);
            setDeck(response);
            setFormData({name: response.name, description: response.description});
        } catch(error){
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
        const newDeck = {name: formData.name, description: formData.description, id: deckId} 
        if(mode === "edit"){
            await updateDeck(newDeck, signal);
            history.push(`/decks/${deckId}`);
        } else {
            await createDeck(newDeck, signal);
            history.push("/");
        }
    }

    return (
        <div>
            <Breadcrumb 
                page={`${mode}-deck`} 
                deckName={deck.name}
                deckId={deck.id}  
            />
            <h1>{mode.charAt(0).toUpperCase() + mode.slice(1)} Deck</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: 
                </label>
                <input name="name" type="text" onChange={handleChange} value={formData.name}/>
            
                <label>
                    Description:
                </label> 
                <textarea name="description" onChange={handleChange} value={formData.description}/>
                <button className="btn btn-danger" onClick={() => history.goBack()}>Cancel</button>
                <button className="btn btn-success" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DeckForm;
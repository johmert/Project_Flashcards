import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {readDeck} from "../../utils/api/index";
import Breadcrumb from "../components/Breadcrumb";

function EditDeck({editDeck}){
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

    function handleSubmit(event){
        event.preventDefault();
        const updatedDeck = {name: formData.name, description: formData.description, id: deckId}
        editDeck(updatedDeck);
        history.push(`/decks/${deckId}`);
        window.location.reload(false);
    }

    return (
        <div>
            <Breadcrumb 
                page="edit-deck" 
                deckName={deck.name}
                deckId={deck.id}  
            />
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: 
                </label>
                <input name="name" type="text" onChange={handleChange} value={formData.name}/>
            
                <label>
                    Description:
                </label> 
                <textarea name="description" onChange={handleChange} value={formData.description}/>
                <button onClick={() => history.goBack()}>Cancel</button>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default EditDeck;
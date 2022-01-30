import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../components/Breadcrumb";
import Buttons from "../components/Buttons";
import CardPreview from "../cards/CardPreview";

function DeckView({ abortController, handleCardDelete, handleDeckDelete}){
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const signal = abortController.signal;

    async function getDeck() {
        try{
            const response = await readDeck(deckId, signal);
            setDeck(response);
        } catch(error){
            if(error.name !== "AbortError"){
                throw error;
            }
        }
    }
    
    useEffect(() => {   
        getDeck();
        return () => {
          abortController.abort();
        }
      }, []);
    
    if(Object.keys(deck).length === 0) return null;
    const cardsListed = deck.cards.map((card) => <CardPreview key={card.id} card={card} handleDelete={handleCardDelete} deckId={deck.id} />)

    return (
        <div>
            <Breadcrumb deckName={deck.name} deckId={deck.id} page="view"/>
            <h1>{deck.name}</h1>
            <h6>{deck.cards.length} cards</h6>
            <h6>{deck.description}</h6>
            <Buttons deckId={deck.id} names={["edit-deck", "study", "add-card", "delete-deck"]} handleDelete={handleDeckDelete}/>
            <h3>Cards:</h3>
            {cardsListed}
        </div>
    );
}

export default DeckView;
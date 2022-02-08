import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../components/Breadcrumb";
import Buttons from "../components/Buttons";
import CardPreview from "../cards/CardPreview";

function DeckView(){
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const abortController = new AbortController();
    
    useEffect(() => { 
        async function getDeck() {
            try{
                const response = await readDeck(deckId, abortController.signal);
                setDeck(() => response);
            } catch(error){
                if(error.name !== "AbortError"){
                    throw error;
                }
            }
        }  
        getDeck();
        return () => {
          abortController.abort();
        }
        // eslint-disable-next-line
    }, [deckId]);
    
    if(Object.keys(deck).length === 0) return null;
    const cardsListed = deck.cards.map((card) => <CardPreview key={card.id} card={card} deckId={deck.id} />)

    return (
        <div>
            <Breadcrumb deckName={deck.name} deckId={deck.id} page="view"/>
            <h1>{deck.name}</h1>
            <h6>{deck.cards.length} cards</h6>
            <h6>{deck.description}</h6>
            <Buttons deckId={deck.id} names={["edit-deck", "study", "add-card", "delete-deck"]}/>
            <div className="bg-light border mt-3 p-2">
                <h3>Cards:</h3>
                {cardsListed}
            </div>
        </div>
    );
}

export default DeckView;
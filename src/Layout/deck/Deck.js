import React, {useEffect, useState} from "react";
import {Route, Switch, useParams} from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import {readDeck} from "../../utils/api/index";
import Edit from "../buttons/Edit";
import Study from "../buttons/Study";
import AddCards from "../buttons/AddCards";
import Delete from "../buttons/Delete";
import DeckStudy from "./DeckStudy";
import AddCard from "../cards/AddCard";
import CardPreview from "../cards/CardPreview";

function Deck({handleCardDelete, handleDeckDelete, newCard}) {
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const abortController = new AbortController();
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
    
    const cards = deck.cards;
    let cardsListed;
    if(cards){
        cardsListed = cards.map((card) => <CardPreview key={card.id} card={card} handleDelete={handleCardDelete}/>)
    }

    return (
        <div id={`deck-${deckId}`}>
            <Breadcrumb deck={deck}/>
            <Switch>
                <Route exact path={`/decks/${deckId}`}>
                    <h1>{deck.name}</h1>
                    <h6>{deck.description}</h6>
                    <div>
                        <Edit mode="deck" deckId={deckId}/>
                        <Study id={deckId}/>
                        <AddCards id={deckId}/>
                        <Delete id={deckId} handleDelete={handleDeckDelete}/>
                    </div>
                    <div>
                        {cardsListed}
                    </div>
                </Route>
                <Route path={`/decks/${deckId}/study`}>
                    <DeckStudy />
                </Route>
                <Route path={`/decks/${deckId}/edit`}>
                    <h1>This is the deck edit page!</h1>
                </Route>
                <Route path={`/decks/${deckId}/cards/new`}>
                    <AddCard deck={deck} deckId={deckId} newCard={newCard}/>
                </Route>
            </Switch>
            
        </div>
    );
}

export default Deck;
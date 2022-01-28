import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, useParams} from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import {createCard, readDeck} from "../../utils/api/index";
import Edit from "../buttons/Edit";
import Study from "../buttons/Study";
import AddCards from "../buttons/AddCards";
import Delete from "../buttons/Delete";
import DeckStudy from "./DeckStudy";
import AddCard from "../cards/AddCard";
import CardPreview from "../cards/CardPreview";
import Card from "../cards/Card";

function Deck({handleCardDelete, handleDeckDelete}) {
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const abortController = new AbortController();
    const history = useHistory();
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

    async function newCard(deckId, card){
        await createCard(deckId, card, signal);
        history.push(`/decks/${deckId}`);
        getDeck();
    }
    
    useEffect(() => {   
        getDeck();
        return () => {
          abortController.abort();
        }
      }, [deck]);
    
    const cards = deck.cards;
    let cardsListed;
    if(cards){
        cardsListed = cards.map((card) => <CardPreview key={card.id} card={card} handleDelete={handleCardDelete}/>)
    }

    return (
        <div id={`deck-${deckId}`}>
            <Switch>
                <Route exact path={`/decks/${deckId}`}>
                    <Breadcrumb deck={deck}/>
                    <h1>{deck.name}</h1>
                    <h6>{deck.description}</h6>
                    <div>
                        <Edit mode="deck" deckId={deckId}/>
                        <Study id={deckId}/>
                        <AddCards id={deckId} newCard={newCard}/>
                        <Delete id={deckId} handleDelete={handleDeckDelete}/>
                    </div>
                    <div>
                        {cardsListed}
                    </div>
                </Route>
                <Route path={`/decks/${deckId}/study`}>
                    <Breadcrumb deck={deck}/>
                    <DeckStudy />
                </Route>
                <Route path={`/decks/${deckId}/edit`}>
                    <Breadcrumb deck={deck}/>
                    <h1>This is the deck edit page!</h1>
                </Route>
                <Route path={`/decks/${deckId}/cards/new`}>
                    <Breadcrumb deck={deck}/>
                    <AddCard deck={deck} deckId={deckId} newCard={newCard}/>
                </Route>
                <Route path={`/decks/${deckId}/cards/:cardId/edit`}>
                    <Card deck={deck} deckId={deckId}/>
                </Route>
            </Switch>
            
        </div>
    );
}

export default Deck;
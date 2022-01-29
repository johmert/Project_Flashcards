import React, {useEffect, useState} from "react";
import {Route, Switch, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import {createCard, createDeck, readDeck, updateCard, updateDeck} from "../../utils/api/index";
import Buttons from "../components/Buttons";
import DeckStudy from "./DeckStudy";
import FormInput from "../components/FormInput";
import CardPreview from "../cards/CardPreview";
import Card from "../cards/Card";
import NotFound from "../NotFound";

function Deck({handleCardDelete, handleDeckDelete, cardId, addCard, editCard, editDeck}) {
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
    
    const cards = deck.cards ? deck.cards : [];
    const cardsListed = cards.map((card) => <CardPreview key={card.id} card={card} handleDelete={handleCardDelete} deckId={deckId} />)

    return (
        <div id={`deck-${deckId}`}>
            <Breadcrumb deck={deck}/>
            <Switch>
                <Route exact path={`/decks/${deckId}`}>
                    <h1>{deck.name}</h1>
                    <h6>{cards.length} cards</h6>
                    <h6>{deck.description}</h6>
                    <Buttons cardId={cardId} deckId={deckId} names={["edit-deck", "study", "add-card", "delete-deck"]} handleDelete={handleDeckDelete}/>
                    {cardsListed}
                </Route>
                <Route path={`/decks/:deckId/study`}>
                    <DeckStudy />
                </Route>
                <Route path={`/decks/${deckId}/edit`}>
                    <FormInput mode="edit" type="deck" deck={deck} editDeck={editDeck}/>
                </Route>
                <Route path={`/decks/${deckId}/cards/new`}>
                    <FormInput mode="add" type="cards" deckId={deckId} addCard={addCard}/>
                </Route>
                <Route path={`/decks/${deckId}/cards/:cardId/edit`}>
                    <Card deck={deck} deckId={deckId}/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            
        </div>
    );
}

export default Deck;
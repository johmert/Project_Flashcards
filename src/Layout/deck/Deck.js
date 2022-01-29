import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory, useParams} from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import {createCard, readDeck} from "../../utils/api/index";
import Buttons from "../buttons/Buttons";
import DeckStudy from "./DeckStudy";
import AddCard from "../cards/AddCard";
import CardPreview from "../cards/CardPreview";
import Card from "../cards/Card";
import DeckForm from "./DeckForm";
import NotFound from "../NotFound";

function Deck({handleCardDelete, handleDeckDelete, cardId}) {
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
                    <DeckForm mode="edit" deck={deck}/>
                </Route>
                <Route path={`/decks/${deckId}/cards/new`}>
                    <AddCard deck={deck} deckId={deckId} newCard={newCard}/>
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
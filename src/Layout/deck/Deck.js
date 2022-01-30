import React from "react";
import {Route, Switch, useParams } from "react-router-dom";
import DeckStudy from "./DeckStudy";
import FormInput from "../components/FormInput";
import NotFound from "../NotFound";
import DeckView from "./DeckView";

function Deck({abortController, handleCardDelete, handleDeckDelete, addCard, editCard, editDeck}) {
    const {deckId} = useParams();    
    return (
        <div id={`deck-${deckId}`}>
            <Switch>
                <Route exact path="/decks/:deckId">
                    <DeckView abortController={abortController} handleCardDelete={handleCardDelete} handleDeckDelete={handleDeckDelete}/>
                </Route>
                <Route path="/decks/:deckId/study">
                    <DeckStudy abortController={abortController}/>
                </Route>
                <Route path="/decks/:deckId/edit">
                    <FormInput abortController={abortController} mode="edit" type="deck" editDeck={editDeck}/>
                </Route>
                <Route path="/decks/:deckId/cards/new">
                    <FormInput abortController={abortController} mode="add" type="card" addCard={addCard}/>
                </Route>
                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <FormInput abortController={abortController} mode="edit" type="card" editCard={editCard}/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            
        </div>
    );
}

export default Deck;
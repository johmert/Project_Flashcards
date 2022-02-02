import React from "react";
import {Route, Switch, useParams } from "react-router-dom";
import DeckStudy from "./DeckStudy";
import FormInput from "../components/FormInput";
import NotFound from "../NotFound";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";

function Deck({handleCardDelete, handleDeckDelete, addCard, editCard, editDeck}) {
    const {deckId} = useParams();    
    return (
        <div id={`deck-${deckId}`}>
            <Switch>
                <Route exact path="/decks/:deckId">
                    <DeckView handleCardDelete={handleCardDelete} handleDeckDelete={handleDeckDelete}/>
                </Route>
                <Route path="/decks/:deckId/study">
                    <DeckStudy/>
                </Route>
                <Route path="/decks/:deckId/edit">
                    <EditDeck editDeck={editDeck}/>
                </Route>
                <Route path="/decks/:deckId/cards/new">
                    <FormInput mode="create" type="card" addCard={addCard}/>
                </Route>
                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <FormInput mode="edit" type="card" editCard={editCard}/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            
        </div>
    );
}

export default Deck;
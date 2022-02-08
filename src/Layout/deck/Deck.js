import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import DeckStudy from "./DeckStudy";
import NotFound from "../NotFound";
import DeckView from "./DeckView";
import DeckForm from "./DeckForm";
import CardForm from "../cards/CardForm";

function Deck() {
    const { deckId } = useParams();
    
    return (
        <div id={`deck-${deckId}`}>
            <Switch>
                <Route exact path="/decks/:deckId">
                    <DeckView />
                </Route>
                <Route path="/decks/:deckId/study">
                    <DeckStudy/>
                </Route>
                <Route path="/decks/:deckId/edit">
                    <DeckForm mode="edit"/>
                </Route>
                <Route path="/decks/:deckId/cards/new">
                    <CardForm mode="create"/>
                </Route>
                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <CardForm mode="edit"/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            
        </div>
    );
}

export default Deck;
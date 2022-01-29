import React from "react";
import {Route, Switch, useHistory, useParams} from "react-router-dom";

function Breadcrumb({deck}) {
    const history = useHistory();
    const cardId = useParams().cardId;

    return (
        <div>
           <button onClick={() => history.push("/")}>Home</button>
           <Switch>
               <Route exact path={`/decks/${deck.id}`}>
                    <button disabled>{deck.name}</button>
               </Route>
               <Route path={`/decks/${deck.id}/study`}>
                   <button onClick={() => history.push(`/decks/${deck.id}`)}>{deck.name}</button>
                   <button disabled>Study</button>
               </Route>
               <Route path={`/decks/${deck.id}/edit`}>
                   <button onClick={() => history.push(`/decks/${deck.id}`)}>{deck.name}</button>
                   <button disabled>Edit</button>
               </Route>
               <Route path={`/decks/${deck.id}/cards/new`}>
                   <button onClick={() => history.push(`/decks/${deck.id}`)}>{deck.name}</button>
                   <button disabled>Add Card</button>
               </Route>
               <Route path={`/decks/${deck.id}/cards/${cardId}/edit`}>
                   <button onClick={() => history.push(`/decks/${deck.id}`)}>{deck.name}</button>
                   <button disabled>Edit Card {cardId}</button>
               </Route>
           </Switch>
        </div>
    );
}

export default Breadcrumb;
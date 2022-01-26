import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";

function Breadcrumb({deck}) {
    const history = useHistory();
    return (
        <div>
           <button onClick={() => history.push("/")}>Home</button>
           <button onClick={() => history.push(`/decks/${deck.id}`)}>{deck.name}</button>
           <Switch>
               <Route path={`/decks/${deck.id}/study`}>
                   <button disabled>Study</button>
               </Route>
               <Route path={`/decks/${deck.id}/edit`}>
                   <button disabled>Edit</button>
               </Route>
           </Switch>
        </div>
    );
}

export default Breadcrumb;
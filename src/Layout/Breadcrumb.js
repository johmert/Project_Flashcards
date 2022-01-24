import React from "react";
import {Route, Switch, useHistory} from "react-router-dom";

function Breadcrumb({deck}) {
    const history = useHistory();
    return (
        <div>
           <button onClick={() => history.push("/")}>Home</button>
           <Switch>
               <Route>
                   <button onClick={() => history.goBack()}>{deck.name}</button>
               </Route>
           </Switch>
        </div>
    );
}

export default Breadcrumb;
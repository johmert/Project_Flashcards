import React from "react";
import {Route, Switch} from "react-router-dom";
import Breadcrumb from "../Breadcrumb";

function Deck({deck}) {
    return (
        <div id={`deck-${deck.id}`}>
            <Switch>
                <Route>
                    <Breadcrumb deck={deck}/>
                </Route>
            </Switch>
        </div>
    );
}

export default Deck;
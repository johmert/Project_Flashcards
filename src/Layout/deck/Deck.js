import React, {useEffect, useState} from "react";
import {Route, Switch, useParams} from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import {readDeck} from "../../utils/api/index";

function Deck() {
    const [deck, setDeck] = useState({}); 
    const {deckId} = useParams();
    const abortController = new AbortController();
    const signal = abortController.signal;

    useEffect(() => {
        async function getDeck() {
          const response = await readDeck(deckId, signal);
          setDeck(response);
        }
        getDeck();
        return () => {
          abortController.abort();
        }
      }, {});
    
    return (
        <div id={`deck-${deckId}`}>
            <Switch>
                <Route>
                    <Breadcrumb deck={deck}/>
                </Route>
            </Switch>
            <h1>{deck.name}</h1>
            <h6>{deck.description}</h6>
        </div>
    );
}

export default Deck;
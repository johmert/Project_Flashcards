import React, {useEffect, useState} from "react";
import {Route, Switch, useParams} from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import {readDeck} from "../../utils/api/index";
import Edit from "../buttons/Edit";
import Study from "../buttons/Study";
import AddCards from "../buttons/AddCards";
import Delete from "../buttons/Delete";

function Deck({handleDelete}) {
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
            <div>
                <Edit mode="deck" deckId={deckId}/>
                <Study id={deckId}/>
                <AddCards id={deckId}/>
                <Delete id={deckId} handleDelete={handleDelete}/>
            </div>
        </div>
    );
}

export default Deck;
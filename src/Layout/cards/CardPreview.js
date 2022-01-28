import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import { readCard, updateCard } from "../../utils/api";
import Delete from "../buttons/Delete";
import Edit from "../buttons/Edit";
import EditCard from "./EditCard";

function CardPreview({handleDelete, deckId, id}){   
    const [card, setCard] = useState({});
    const abortController = new AbortController();
    const signal = abortController.signal;
    const history = useHistory();

    async function getCard(){
        try {
            const response = await readCard(id, signal);
            setCard(response);
        } catch(error){
            if(error.name !== "AbortError") {
                throw error;
            }
        }
    }

    useEffect(() => {
        getCard();
        return () => {
            abortController.abort();
        }
    }, []);

    
    return (
        <div>
            <Switch>
                <Route exact path={`/decks/${deckId}`}>
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <div>
                        <Edit mode="card" deckId={deckId} cardId={card.id}/>
                        <Delete mode="card" id={card.id} handleDelete={handleDelete} deckId={deckId}/>
                    </div>
                </Route>
                <Route path={`/decks/${deckId}/cards/:cardId/edit`}>
                    <EditCard card={card} deckId={deckId} />
                </Route>
            </Switch>
        </div>
    );
}

export default CardPreview;
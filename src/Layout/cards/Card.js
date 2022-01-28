import React, { useEffect, useState } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { readCard } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";
import EditCard from "./EditCard";

function Card({deck}){
    const [card, setCard] = useState({});
    const cardId = useParams().cardId;
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getCard(){
        try {
            const response = await readCard(cardId, signal);
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
            <Breadcrumb deck={deck} card={card}/>
            <Switch>
                <Route>
                    <EditCard card={card}/>
                </Route>
            </Switch>
        </div>
    );
}

export default Card;
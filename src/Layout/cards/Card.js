import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readCard } from "../../utils/api";

import EditCard from "./EditCard";

function Card({deckId}){
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
    

    return <EditCard card={card} deckId={deckId}/>
}

export default Card;
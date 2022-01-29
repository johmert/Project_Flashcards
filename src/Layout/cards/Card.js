import React from "react";
import { useParams } from "react-router-dom";
import FormInput from "../components/FormInput";

function Card({deckId}){
    const cardId = useParams().cardId;
    return <FormInput cardId={cardId} deckId={deckId} type="card" mode="edit"/>
}

export default Card;
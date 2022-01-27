import React, {useState} from "react";
import {Route, Switch, useParams} from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import EditCard from "./EditCard";

function Card({deck}){
    const [card, setCard] = useState({});
    const cardId = useParams().cardId;
    console.log(cardId);
    

    return (
        <div>
            <Breadcrumb card={card}/>
            <Switch>
                <Route>
                    <EditCard card={card}/>
                </Route>
            </Switch>
        </div>
    );
}

export default Card;
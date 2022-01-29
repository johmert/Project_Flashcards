import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {readCard, readDeck} from "../../utils/api";
import Buttons from "../components/Buttons";

function DeckStudy() {
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const [flipped, setFlipped] = useState(false);
    const intialStudyState = {
        id: 1,
        number: 1,
        total: 0
    }
    const [study, setStudy] = useState(intialStudyState);
    const deckId = useParams().deckId;
    const history = useHistory();
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getCard(){
        const response = await readCard(study.id, signal);
        setCard(response);
    }

    async function getDeck(){
        const response = await readDeck(deckId, signal);
        const cards = response.cards[0] ? response.cards : [{id: 1}];
        setDeck(response);
        setStudy({id: cards[0].id, number: 1, total: cards.length})
    }

    useEffect(() => {
        getDeck();
        getCard(); 
        return () => {
            abortController.abort();
        }
    }, []);

    function handleNext(){
        const currentId = study.id;
        const currentNumber = study.number;
        if(currentNumber === study.total){
            if(window.confirm("Restart Cards?\n\n Click 'cancel' to return to the home page.")){
                getDeck();
                getCard();
            } else {
                history.push("/");
            }
        }
        setStudy({id: currentId +1, number: currentNumber +1, total: study.total});
        getCard();
        setFlipped(false);
    }

    if(study.total < 3){
        return (
            <div>
                <h1>{deck.name}: Study</h1>
                <h2>Not Enough Cards.</h2>
                <p>You need at least 3 cards to study. There are {study.total} in this deck.</p>
                <Buttons names={["add-card"]} deckId={deck.id}/>
            </div>
        );
    }

    if(flipped){
        return (
            <div>
                <h1>{deck.name}: Study</h1>
                <h2>Card {study.number} of {study.total}</h2>
                <p>{card.back}</p>
                <button onClick={() => setFlipped(!flipped)}>Flip</button>
                <button onClick={handleNext}>Next</button>
            </div>
        );
    }
    return (
        <div>
            <h1>{deck.name}: Study</h1>
            <h2>Card {study.number} of {study.total}</h2>
            <p>{card.front}</p>
            <button onClick={() => setFlipped(!flipped)}>Flip</button>
        </div>
    );
}

export default DeckStudy;
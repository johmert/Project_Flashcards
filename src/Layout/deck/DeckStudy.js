import React, {useEffect, useState} from "react";
import {readCard} from "../../utils/api";

function DeckStudy({deck}) {
    const [card, setCard] = useState({});
    const [flipped, setFlipped] = useState(false);
    const intialStudyState = {
        id: 1,
        number: 0,
        total: 3
    }
    const [study, setStudy] = useState(intialStudyState);
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getCard(){
        const response = await readCard(study.id, signal);
        setCard(response);
    }

    useEffect(() => {
        getCard();
        return () => {
            abortController.abort();
        }
    }, []);

    function handleNext(){
        console.log(deck.cards.length)
    }

    if(study.total < 3){
        return (
            <div>
                <h1>{deck.name}</h1>
                <h2>Not Enough Cards.</h2>
                <p>You need at least 3 cards to study. There are {study.total} in this deck.</p>
            </div>
        );
    }

    if(flipped){
        return (
            <div>
                <h2>Card {study.number} of {study.total}</h2>
                <p>{card.back}</p>
                <button onClick={() => setFlipped(!flipped)}>Flip</button>
                <button onClick={handleNext}>Next</button>
            </div>
        );
    }
    return (
        <div>
            <h2>Card {study.number} of {study.total}</h2>
            <p>{card.front}</p>
            <button onClick={() => setFlipped(!flipped)}>Flip</button>
        </div>
    );
}

export default DeckStudy;
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {readDeck} from "../../utils/api";
import Buttons from "../components/Buttons";
import Card from "../cards/Card";
import Breadcrumb from "../components/Breadcrumb";

function DeckStudy() {
    const [cardNumber, setCardNumber] = useState(0);
    const [deck, setDeck] = useState({});
    const [flipped, setFlipped] = useState(false);
    const { deckId } = useParams();
    const history = useHistory();
    const abortController = new AbortController();

	useEffect(() => {
		getDeck();
		return () => {
			abortController.abort();
		};

		
	}, []);
	
	async function getDeck() {
		try {
			const response = await readDeck(deckId, abortController.signal);
			setDeck(response);
		}
		catch(error) {
			if(error.name !== "AbortError") {
				throw error;
			}
		}
	}

    if(Object.keys(deck).length === 0 || !deck) return null;

    function handleFlip(){
        setFlipped(!flipped);
    }

    function handleNext(){
        if(cardNumber+1 === deck.cards.length){
            if(window.confirm(`Restart cards?\n\nClick 'cancel' to return to the home page.`)){
                setCardNumber(0);
            } else { history.push("/") }
        } else { setCardNumber(cardNumber+1) }
        setFlipped(false);
    }

    return (deck.cards.length > 2)?
        <div>
            <Breadcrumb deckName={deck.name} deckId={deck.id} page="study"/>
            <Card cardNumber={cardNumber} deck={deck} flip={handleFlip} flipped={flipped} next={handleNext} side={flipped? "back" : "front"}/>
        </div>

        :

        <div>
            <Breadcrumb page="study" deckName={deck.name} deckId={deckId}/>
            <h1>{deck.name}: Study</h1>
            <h2>Not Enough Cards.</h2>
            <p>You need at least 3 cards to study. There are {deck.cards.length} in this deck.</p>
            <Buttons names={["add-card"]} deckId={deck.id}/>
        </div>
}

export default DeckStudy;
import React, {useEffect, useState} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import {createDeck, deleteCard, deleteDeck, listDecks} from "../utils/api/index"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./deck/DeckList";
import Deck from "./deck/Deck";
import DeckForm from "./deck/DeckForm";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [cardId, setCardId] = useState(1);
  const abortController = new AbortController();
  const signal = abortController.signal;
  const history = useHistory();
  

  async function getDecks() {
    try {
      const response = await listDecks(signal);
      setDecks(response);
      const newCardId = response[response.length] ? response[response.length-1].cards[0] : 1;
      setCardId(newCardId);
    } catch(error) {
      if(error.name !== "AbortError"){
        throw error;
      }
    }
    
  }

  useEffect(() => {
    getDecks();
    return () => {
      abortController.abort();
    }
  }, []);

  async function handleDeckDelete(id){
    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
        await deleteDeck(id, signal);
    }
    history.push("/");
    await getDecks();
  }

  async function handleCardDelete(id, deckId){
    if(window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
      await deleteCard(id, signal);
  }
    history.push(`/decks/${deckId}`);
    window.location.reload(false);
  }

  function addDeck(name, description){
    const id = decks.length + 1;
    const deck = { "id": id, "name": name, "description": description };
    createDeck(deck, signal);
    history.push("/"); 
    getDecks()
  }

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} handleDelete={handleDeckDelete}/>
          </Route>
          <Route path="/decks/new">
            <DeckForm mode="add" addDeck={addDeck}/>
          </Route>
          <Route path="/decks/:deckId">
              <Deck handleDeckDelete={handleDeckDelete} handleCardDelete={handleCardDelete} cardId={cardId}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;

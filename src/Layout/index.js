import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { createCard, createDeck, deleteCard, deleteDeck, listDecks, updateCard, updateDeck } from "../utils/api/index"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./deck/DeckList";
import Deck from "./deck/Deck";
import FormInput from "./components/FormInput";

function Layout() {
  const [decks, setDecks] = useState([]);
  const abortController = new AbortController();
  const signal = abortController.signal;
  const history = useHistory();

  useEffect(() => {
    getDecks();
    return () => {
      abortController.abort();
    }
  }, []);
  
  async function getDecks() {
    try {
      const response = await listDecks(signal);
      setDecks(response);
    } catch(error) {
      if(error.name !== "AbortError"){
        throw error;
      }
    }
    
  }

  async function addCard(id, card){
    const created = await createCard(id, card, signal);
    getDecks();
    return created.id;
  }

  async function addDeck(newDeck){
    const created = await createDeck(newDeck, signal);
    getDecks();
    return created.id;
  }

  async function editCard(card){
    const edited = await updateCard(card, signal);
    getDecks();
    return edited.id;
  }

  async function editDeck(editedDeck){
    const edited = await updateDeck(editedDeck, signal);
    getDecks();
    return edited.id;
  }

  async function handleDeckDelete(id){
    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
        await deleteDeck(id, signal);
    }
    history.push("/");
    getDecks();
  }

  async function handleCardDelete(id, deckId){
    if(window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
      await deleteCard(id, signal);
      getDecks();
    }
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
            <FormInput mode="create" type="deck" addDeck={addDeck}/>
          </Route>
          <Route path="/decks/:deckId">
              <Deck 
                handleDeckDelete={handleDeckDelete} 
                handleCardDelete={handleCardDelete}
                addCard={addCard}
                editCard={editCard}
                editDeck={editDeck}
                />
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

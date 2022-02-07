import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck, listDecks } from "../utils/api/index"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./deck/DeckList";
import Deck from "./deck/Deck";
import DeckForm from "./deck/DeckForm";

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

  async function handleDeckDelete(id){
    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
        await deleteDeck(id, signal);
    }
    history.push("/");
  }

  async function handleCardDelete(id){
    if(window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
      await deleteCard(id, signal);
      window.location.reload(false);
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
            <DeckForm mode="create"/>
          </Route>
          <Route path="/decks/:deckId">
              <Deck
                handleDeckDelete={handleDeckDelete} 
                handleCardDelete={handleCardDelete}
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

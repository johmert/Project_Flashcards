import React, {useEffect, useState} from "react";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import {createDeck, deleteDeck, listDecks} from "../utils/api/index"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./deck/DeckList";
import Deck from "./deck/Deck";
import CreateDeck from "./buttons/CreateDeck";
import NewDeck from "./deck/NewDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  const { path } = useRouteMatch();
  const abortController = new AbortController();
  const signal = abortController.signal;
  const history = useHistory();

  async function getDecks() {
    const response = await listDecks(signal);
    setDecks(response);
  }

  useEffect(() => {
    getDecks();
    return () => {
      abortController.abort();
    }
  }, []);

  function handleDeckDelete(id){
    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
        deleteDeck(id, signal);
    }
    history.push("/");
    getDecks();
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
          <Route exact path={path}>
            <CreateDeck />
            <DeckList decks={decks} handleDelete={handleDeckDelete}/>
          </Route>
          <Route path="/decks/new">
            <NewDeck addDeck={addDeck}/>
          </Route>
          <Route path="/decks/:deckId">
              <Deck />
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

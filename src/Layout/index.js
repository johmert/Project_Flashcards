import React, {useEffect, useState} from "react";
import { Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import {deleteDeck, listDecks} from "../utils/api/index"
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

  useEffect(() => {
    async function getDecks() {
      const response = await listDecks(signal);
      setDecks(response);
    }
    getDecks();
    return () => {
      abortController.abort();
    }
  }, []);

  function handleDeckDelete(id){
    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
        deleteDeck(id, signal)
    }
    window.location.reload(false);
    history.push("/");
  }

  function submit(){
    console.log('form submitted!');
  }

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path={path}>
            <CreateDeck />
            <DeckList decks={decks} handleDelete={handleDeckDelete}/>
          </Route>
          <Route path="/decks/new">
            <NewDeck submit={submit}/>
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

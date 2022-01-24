import React, {useEffect, useState} from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import {listDecks} from "../utils/api/index"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./deck/DeckList";
import Deck from "./deck/Deck";
import CreateDeck from "./buttons/CreateDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  const { path } = useRouteMatch();
  const abortController = new AbortController();
  const signal = abortController.signal;

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

  const handleDelete = () => {
    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
        // handle delete
        console.log(`Deck deleted`);
    }
};

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path={path}>
            <CreateDeck />
            <DeckList decks={decks} handleDelete={handleDelete}/>
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

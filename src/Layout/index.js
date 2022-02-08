import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api/index"
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./deck/DeckList";
import Deck from "./deck/Deck";
import DeckForm from "./deck/DeckForm";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch(error) {
        if(error.name !== "AbortError"){
          throw error;
        }
      }
    }
    getDecks();
    return () => {
      abortController.abort();
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks}/>
          </Route>
          <Route path="/decks/new">
            <DeckForm mode="create"/>
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

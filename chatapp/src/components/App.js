import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";

function App() {
  const [Id, setId] = useLocalStorage('id')
  const dashboard = (
    <SocketProvider id={Id}>
    <ContactsProvider>
      <ConversationsProvider id={Id}>
      <Dashboard id={Id}/>
      </ConversationsProvider>
    </ContactsProvider>
    </SocketProvider>
  )
  return (
    Id ? dashboard : <Login onIdSubmit={setId}/> 
  );
}

export default App;
